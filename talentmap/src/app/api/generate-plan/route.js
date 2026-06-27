import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { pathDominante, segundoPath, contextoUsuario } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 503 });
    }

    const systemPrompt = `Eres Susana De Jesús, experta en desarrollo de carrera y talento de LATAM.
Tu rol es crear planes de desarrollo personalizados, prácticos y motivadores.
Responde SOLO en JSON válido con esta estructura exacta:
{
  "mes1": { "enfoque": "string", "acciones": ["string", "string", "string"], "recurso": "string" },
  "mes2": { "enfoque": "string", "acciones": ["string", "string", "string"], "recurso": "string" },
  "mes3": { "enfoque": "string", "acciones": ["string", "string", "string"], "recurso": "string" },
  "consejo_final": "string"
}
No incluyas texto fuera del JSON. No uses markdown.`;

    const userMessage = `Path dominante: ${pathDominante}
Segundo path: ${segundoPath}
Contexto adicional del usuario: ${contextoUsuario || 'No proporcionado'}
Genera un plan de desarrollo de 90 días personalizado, práctico y motivador.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

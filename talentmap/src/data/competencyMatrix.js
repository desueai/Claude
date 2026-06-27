export const competencies = [
  { id: 'people', label: 'Orientación a personas', labelEn: 'People orientation' },
  { id: 'process', label: 'Orientación a procesos', labelEn: 'Process orientation' },
  { id: 'expertise', label: 'Expertise técnico', labelEn: 'Technical expertise' },
  { id: 'strategy', label: 'Pensamiento estratégico', labelEn: 'Strategic thinking' },
  { id: 'ambiguity', label: 'Gestión de ambigüedad', labelEn: 'Managing ambiguity' },
  { id: 'influence', label: 'Influencia sin autoridad', labelEn: 'Influence without authority' },
];

// Levels 0-3: 0=not required, 1=basic, 2=intermediate, 3=advanced
export const pathMatrix = {
  leadership: {
    people: 3,
    process: 1,
    expertise: 1,
    strategy: 3,
    ambiguity: 3,
    influence: 3,
  },
  pm: {
    people: 2,
    process: 3,
    expertise: 2,
    strategy: 2,
    ambiguity: 2,
    influence: 3,
  },
  specialist: {
    people: 1,
    process: 2,
    expertise: 3,
    strategy: 2,
    ambiguity: 1,
    influence: 2,
  },
};

// Estimated current levels by current role
export const roleCurrentLevels = {
  individual: {
    people: 1,
    process: 1,
    expertise: 2,
    strategy: 1,
    ambiguity: 1,
    influence: 1,
  },
  leader: {
    people: 2,
    process: 2,
    expertise: 1,
    strategy: 2,
    ambiguity: 2,
    influence: 2,
  },
  specialist: {
    people: 1,
    process: 2,
    expertise: 3,
    strategy: 1,
    ambiguity: 1,
    influence: 1,
  },
  other: {
    people: 1,
    process: 1,
    expertise: 1,
    strategy: 1,
    ambiguity: 1,
    influence: 1,
  },
};

export const currentRoles = [
  { id: 'individual', label: 'Profesional individual', labelEn: 'Individual contributor' },
  { id: 'leader', label: 'Líder de equipo', labelEn: 'Team leader' },
  { id: 'specialist', label: 'Especialista técnico', labelEn: 'Technical specialist' },
  { id: 'other', label: 'Otro', labelEn: 'Other' },
];

export const targetPaths = [
  { id: 'leadership', label: 'Liderazgo', labelEn: 'Leadership', color: '#6366F1', bg: '#EEF2FF' },
  { id: 'pm', label: 'Project Manager', labelEn: 'Project Manager', color: '#F59E0B', bg: '#FFFBEB' },
  { id: 'specialist', label: 'Especialista', labelEn: 'Specialist', color: '#10B981', bg: '#ECFDF5' },
];

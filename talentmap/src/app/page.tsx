'use client';

import '@/lib/i18n';
import { I18nProvider } from '@/components/I18nProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { WhatIsTalentMap } from '@/components/sections/WhatIsTalentMap';
import { CareerPaths } from '@/components/sections/CareerPaths';
import { CompetenciesComparison } from '@/components/sections/CompetenciesComparison';
import { DiagnosticTools } from '@/components/sections/DiagnosticTools';
import { ResourceLibrary } from '@/components/sections/ResourceLibrary';
import { TalentMapVisual } from '@/components/sections/TalentMapVisual';
import { DevelopmentPlan } from '@/components/sections/DevelopmentPlan';
import { GapCalculator } from '@/components/sections/GapCalculator';
import { CareerStories } from '@/components/sections/CareerStories';
import { AIPlan } from '@/components/sections/AIPlan';
import { Newsletter } from '@/components/sections/Newsletter';
import { Blog } from '@/components/sections/Blog';
import { AboutSusana } from '@/components/sections/AboutSusana';
import { ContactForm } from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <Hero />
        <WhatIsTalentMap />
        <CareerPaths />
        <CompetenciesComparison />
        <DiagnosticTools />
        <ResourceLibrary />
        <TalentMapVisual />
        <DevelopmentPlan />
        <GapCalculator />
        <CareerStories />
        <AIPlan />
        <Newsletter />
        <Blog />
        <AboutSusana />
        <ContactForm />
      </main>
      <Footer />
    </I18nProvider>
  );
}

// Long-form case-study content for the Gallery detail pages,
// transcribed from the Figma design (BOKK, Phibi, BNCT).

export type CaseFeature = {
  label: string;
  heading: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  accent: string;
  tags: string[];
  industry: string;
  core: string;
  mission: string;
  deliverables: string;
  intro: string;
  introExtra?: string;
  quote?: { text: string; author: string };
  features: CaseFeature[];
  note?: string;
};

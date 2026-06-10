import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/CaseStudyView";
import { CASE_STUDIES } from "@/lib/case-studies";

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = CASE_STUDIES[params.slug];
  if (!study) return { title: "Gallery | Cyberpro" };
  return {
    title: `${study.name} — Case Study | Cyberpro`,
    description: study.intro,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = CASE_STUDIES[params.slug];
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}

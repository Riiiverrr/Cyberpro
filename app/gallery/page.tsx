import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Gallery | Cyberpro",
  description: "Selected work from Cyberpro — products, platforms, and brands.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-shell px-6 pb-32 pt-[140px] md:px-12">
      <ScrollReveal>
        <h1 className="text-[44px] font-bold md:text-[72px]">Gallery</h1>
        <p className="mt-4 max-w-xl text-[16px] text-muted">
          A selected set of work — products, platforms, and brands we've built
          end to end.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ScrollReveal key={p.slug} index={i}>
            <ProjectCard project={p} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

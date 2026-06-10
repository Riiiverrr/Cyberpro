import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/projects";

/**
 * "Selected projects" — three folder-style cards (Bokk / BNCTHUB / Phibi),
 * each lifting with a staggered paper float on hover.
 */
export default function ProjectsSection() {
  return (
    <section className="mx-auto max-w-shell px-6 py-24 md:px-12">
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ScrollReveal key={p.slug} index={i}>
            <ProjectCard project={p} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

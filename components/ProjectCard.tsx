"use client";

import Link from "next/link";
import styles from "./ProjectCard.module.css";

export type ProjectDoc = { label: string; value?: string };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  poster: string;
  docs: ProjectDoc[];
};

/**
 * Folder-style project card (Figma `bokk`/`bnct`/`phibi`). A dark rounded
 * panel with a perforated dot border traces the top + sides; white "document"
 * papers fan out the top (each with a label + filler bars), and a folder front
 * (photo cover, left-side tab notch) sits over the lower portion carrying the
 * tag + subtitle and the title. On hover the card lifts and the papers float
 * up in a 50ms stagger.
 */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/gallery/${project.slug}`}
      className={`${styles.card} group relative block aspect-[370/346] w-full`}
      aria-label={`${project.title} — ${project.subtitle}`}
    >
      {/* perforated dot border (top edge + both sides) */}
      <div className={styles.perf} aria-hidden>
        <span className={styles.perfTop} />
        <span className={styles.perfLeft} />
        <span className={styles.perfRight} />
      </div>

      {/* white papers fanning from behind the folder */}
      <div className={styles.papers} aria-hidden>
        {project.docs.map((doc, i) => (
          <div key={doc.label} className={styles.paper} data-i={i}>
            <span className={styles.paperLabel}>{doc.label}</span>
            <div className={styles.lines}>
              <span /><span /><span /><span /><span /><span />
            </div>
          </div>
        ))}
      </div>

      {/* rounded folder silhouette (objectBoundingBox so it scales) */}
      <svg className={styles.clipDef} width="0" height="0" aria-hidden focusable="false">
        <defs>
          <clipPath id="folderClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.085 Q0,0.012 0.045,0 L0.50,0 Q0.535,0 0.55,0.065 L0.557,0.105 Q0.563,0.13 0.595,0.13 L0.957,0.13 Q1,0.13 1,0.205 L1,0.925 Q1,1 0.957,1 L0.043,1 Q0,1 0,0.915 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* folder front face (folder silhouette + photo cover) */}
      <div className={styles.front}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.poster} alt="" className={styles.cover} />
        <div className={styles.overlay} aria-hidden />
        <div className={styles.frontContent}>
          <div className={styles.frontTop}>
            <span className={styles.tag}>{project.tag}</span>
            <span className={styles.subtitle}>{project.subtitle}</span>
          </div>
          <h3 className={styles.title}>{project.title}</h3>
        </div>
      </div>
    </Link>
  );
}

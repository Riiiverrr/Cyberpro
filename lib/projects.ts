import type { Project } from "@/components/ProjectCard";

// Featured projects shown on Home + Gallery, sourced from the Figma design.
// `poster` is the photo cover behind the folder front. Each "doc" is a white
// paper peeking from the top of the folder (label only — monospace, dark).
export const PROJECTS: Project[] = [
  {
    slug: "bokk",
    title: "Bokk",
    subtitle: "Conference Booking",
    tag: "UI/UX",
    poster: "/home/projects/bokk.jpg",
    docs: [
      { label: "Calendar" },
      { label: "Keep Records" },
      { label: "Booking" },
    ],
  },
  {
    slug: "bnct",
    title: "BNCTHUB",
    subtitle: "AI Platform",
    tag: "AI Agent",
    poster: "/home/projects/bnct.jpg",
    docs: [
      { label: "Multi-audiences" },
      { label: "One-stop Design" },
      { label: "AI Conversation" },
    ],
  },
  {
    slug: "phibi",
    title: "Phibi",
    subtitle: "Student's Partner",
    tag: "Phibi",
    poster: "/home/projects/phibi.jpg",
    docs: [
      { label: "Grades Tracking" },
      { label: "Attendance Record" },
      { label: "Class Schedule" },
    ],
  },
];

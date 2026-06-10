import type { CaseStudy } from "./case-studies-types";

export const CASE_STUDIES: Record<string, CaseStudy> = {
  bokk: {
    slug: "bokk",
    name: "Bokk",
    accent: "#6CA8FF",
    tags: [
      "#Olivei Studio",
      "#UI/UX Design",
      "#User research",
      "#Code Support",
      "#Content Design",
    ],
    industry: "Industry | internal SaaS software",
    core: "Web App, Booking",
    mission: "Meeting booking Platform",
    deliverables: "Figma Link, Design Instruction",
    intro:
      "Bokk is an internal meeting room management platform built for large organizations.",
    introExtra:
      "Before Bokk, finding a free room meant walking floor by floor and hoping for the best.",
    quote: {
      text: "Before Bokk, finding a free room meant walking floor by floor and hoping for the best.",
      author: "Sarah Lin, Operations Manager",
    },
    features: [
      {
        label: "Everything in one place",
        heading: "A real-time view of your entire building's meeting activity",
        body: "Total meetings, active rooms, today's bookings, and utilization rate — all on one dashboard.",
      },
      {
        label: "Book in three steps",
        heading: "Find the right room and confirm your meeting in minutes",
        body: "Booking is condensed into three guided steps — fill in meeting details, pick a room, and confirm.",
      },
      {
        label: "Your meetings, your way",
        heading: "See every meeting across the month, week, or day",
        body: "The Schedule view gives people a clear calendar of all upcoming and past meetings.",
      },
      {
        label: "Keep records. Report issues.",
        heading: "Meeting documents and equipment reports, all in one place",
        body: "Upload, manage, and download meeting-related files — minutes, proposals, decks — and report equipment issues.",
      },
      {
        label: "Ghost Meeting",
        heading: "If no one shows up, the room doesn't go to waste",
        body: "If no one checks in within 15 minutes of a meeting's start time, the organiser is alerted and the room is released.",
      },
    ],
  },

  phibi: {
    slug: "phibi",
    name: "Phibi",
    accent: "#B69CFF",
    tags: [
      "#Olivei Studio",
      "#UI/UX Design",
      "#User research",
      "#Code Support",
      "#Content Design",
    ],
    industry: "Industry | Mobile App",
    core: "Educational, Mobile App, Intelligence",
    mission: "Student companion platform",
    deliverables: "Figma Link, Design Instruction",
    intro:
      "Phibi is a student companion app built to make academic life feel clearer and more manageable.",
    quote: {
      text: "I used to have three different apps just to get through the week — one for my schedule, one for grades, one for tasks. Phibi replaced all of them.",
      author: "Alex, Computer Science Junior",
    },
    features: [
      {
        label: "At a glance",
        heading: "Your entire semester summarized in one view",
        body: "The Dashboard gives you a clear overview of your academic life the moment you open the app — GPA, average score, completion, and progress.",
      },
      {
        label: "Never miss a class",
        heading: "Every class, deadline, etc. exactly when you need it",
        body: "Phibi's calendar gives you a clean monthly overview with subtle indicators of what's coming up.",
      },
      {
        label: "Know where you stand",
        heading: "Track grades, progress, and assignments course by course",
        body: "The Courses page gives you a complete picture of every class you're taking this semester.",
      },
      {
        label: "All You Need",
        heading: "Powerful features for campus all in one place",
        body: "College life comes with a constant flow of classes, assignments, deadlines, and exams. Phibi keeps it all in one place.",
      },
    ],
  },

  bnct: {
    slug: "bnct",
    name: "BNCTHUB",
    accent: "#7BE0A0",
    tags: [
      "#Olivei Studio",
      "#Coding",
      "#UI/UX Design",
      "#User research",
      "#Code Support",
      "#Content Design",
    ],
    industry: "Industry | AI-Powered Medical Platform",
    core: "AI Agent Conversation, Hospital Management",
    mission: "A platform for hospital / doctors / patients",
    deliverables: "Figma Link, Engineering",
    intro:
      "BNCTHUB is an integrated platform connecting patients, medical experts, and hospitals for specialized cancer care.",
    introExtra:
      "BNCT is highly specialized, and access has never been straightforward. Patients struggle to find the right experts and understand their options.",
    features: [
      {
        label: "Why BNCTHUB exists",
        heading: "Bridging the gap between patients and cutting-edge cancer care",
        body: "A PC dashboard for administrators and doctors, plus a WeChat Mini Program for patients — one connected system.",
      },
      {
        label: "Start with a conversation",
        heading: "Understand BNCT and assess your eligibility",
        body: "Patients chat with the AI to learn how BNCT works and what the treatment journey looks like. The AI proactively suggests next steps and offers preset questions based on what patients ask most.",
      },
      {
        label: "Meet your expert, digitally",
        heading: "Talk to a specialist before committing to a visit",
        body: "Patients converse with an expert's intelligent digital avatar — trained on a doctor's thorough knowledge base. Administrators manage all registered doctors and verify their credentials.",
      },
      {
        label: "The intelligence behind the platform",
        heading: "A structured knowledge system powering every consultation",
        body: "Maintained across three layers — general BNCT knowledge, a patient-facing information center, and a continuing-education hub for doctors.",
      },
      {
        label: "From consultation to recovery",
        heading: "Structured care tracked end to end",
        body: "Once matched with a physician, doctors schedule in-person and online MDT sessions, with synced management across mobile and desktop.",
      },
    ],
    note: "This showcase reflects a selected set of core features. The full platform is available on request.",
  },
};

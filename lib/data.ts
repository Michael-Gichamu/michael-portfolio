export const profile = {
  name: "Michael Gichamu",
  role: "Software Engineer & AI Automation Specialist",
  location: "Nairobi, Kenya",
  email: "michaelmatere606@gmail.com",
  github: "https://github.com/michael-gichamu",
  linkedin: "https://www.linkedin.com/in/https:/michael-gichamu-365011215",
  available: true,
};

export const stats = [
  {
    label: "Faster diagnostics",
    value: 6,
    suffix: "×",
    caption:
      "Cut fault-diagnosis time from 18 minutes to 3 with a LangGraph-based AI system for biomedical equipment technicians.",
  },
  {
    label: "Off the reporting process",
    value: 90,
    suffix: "%",
    caption:
      "Replaced a 15-minute manual spreadsheet update with a Telegram bot that syncs field data to Google Sheets in under a minute.",
  },
  {
    label: "LLM outputs graded",
    value: 800,
    suffix: "+",
    caption:
      "Evaluation work at Scale AI: reasoning, instruction-following, code quality. Taught me how models actually fail.",
  },
] as const;

export type Project = {
  slug: string;
  index: string;
  title: string;
  tag: string;
  year: string;
  description: string;
  impact: string;
  highlights: string[];
  stack?: string[];
  accent: string;
  visual: "medtech" | "ai-graph" | "automation" | "slideshow";
  slides?: { src: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "specific-talent-email",
    index: "01",
    title: "AI Email Infrastructure",
    tag: "HR & Staffing · Email AI",
    year: "2026",
    description:
      "Specific Talent Ltd is an HR and staffing company supporting brands like Quickmart, Carrefour, Decathlon, and Pharmaplus. Their team handled high email volume where genuinely urgent messages were easy to lose inside a manually-sorted inbox. I upgraded their email infrastructure so the conversations that matter surface first, and routine handling no longer drains the team's time.",
    impact:
      "The team identifies priority communications faster, handles far less manual inbox triage, and keeps response cycles tight on the conversations that move the business.",
    highlights: [
      "Priority communications surface first, so the team acts on what matters before it goes cold.",
      "Manual inbox handling cut down across high-volume daily email.",
      "Faster, more consistent response cycles on critical business conversations.",
    ],
    accent: "#7AA5FF",
    visual: "slideshow",
    slides: [
      { src: "/specific-talent/01-custom-rules.png", label: "Custom AI rules" },
      { src: "/specific-talent/02-assistant.png", label: "Assistant & settings" },
    ],
  },
  {
    slug: "ai-troubleshooting",
    index: "02",
    title: "AI-Augmented Troubleshooting System",
    tag: "Healthcare · LangGraph",
    year: "2026",
    description:
      "Biomedical equipment faults used to stall junior technicians for up to 18 minutes because the diagnostic path lived inside the heads of senior staff. This system externalises that knowledge. LangGraph structures the diagnostic flow, an LLM interprets symptoms and suggests next steps, and a small equipment ontology keeps the reasoning grounded in real fault patterns.",
    impact:
      "Average fault-diagnosis time dropped from 18 minutes to 3. Most faults no longer require a senior technician in the room.",
    highlights: [
      "LangGraph state machine routes between diagnostic stages without hallucinating paths.",
      "Equipment ontology grounds the LLM — no generic medical advice, only known fault patterns.",
      "Operator-in-the-loop at every step. The technician confirms or overrides before anything runs.",
      "Full audit trail of every decision, retained for compliance review.",
    ],
    stack: ["Python", "LangGraph", "LangChain", "OpenAI", "FastAPI", "PostgreSQL"],
    accent: "#7AA5FF",
    visual: "ai-graph",
  },
  {
    slug: "medappoint",
    index: "03",
    title: "MedAppoint",
    tag: "Healthcare · Web platform",
    year: "2024",
    description:
      "Medical appointment platform built for clinics and patients in Kenya. I owned the patient-side booking interface: the flows, the responsiveness, and the parts that break when the network does. The challenge was making a booking experience that actually works on mid-range Android phones on 3G.",
    impact:
      "Booking flow held up on 2G. Page load time dropped by cutting unnecessary re-renders and tightening component performance.",
    highlights: [
      "Eliminated redundant re-renders with careful state isolation and memoisation.",
      "Loading states and skeletons tuned for slow connections, not fast ones.",
      "Simplified the booking flow so patients could confirm appointments in fewer steps.",
      "Keyboard navigation and screen-reader labels throughout.",
    ],
    stack: ["React", "TypeScript", "REST", "Tailwind", "Vite"],
    accent: "#5B8CFF",
    visual: "medtech",
  },
  {
    slug: "financial-automation",
    index: "04",
    title: "Field Reporting Automation",
    tag: "Climate-tech · Automation",
    year: "2025",
    description:
      "At an electric mobility startup, field operators sent financial data over WhatsApp and the COO manually copied it into a spreadsheet. Every day, 15 minutes gone. I automated the whole path (Telegram intake, validation, Google Sheets sync) and made it reliable enough that the COO stopped checking the work.",
    impact:
      "15 minutes of daily manual work replaced by a bot that runs in under a minute. Zero double-writes in the first 30 days of operation.",
    highlights: [
      "Validation on intake catches malformed entries before they reach the spreadsheet.",
      "Retries and idempotency on every external call — flaky mobile networks don't cause duplicate records.",
      "Telegram interface, because that's the tool the field team already had on their phones.",
      "Reconciliation logic keeps the spreadsheet consistent even when ops run out of order.",
    ],
    stack: ["n8n", "Node.js", "Telegram API", "Google Sheets API", "Docker"],
    accent: "#9CBEFF",
    visual: "automation",
  },
];

export type SkillCategory = {
  id: string;
  name: string;
  blurb: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    name: "AI Engineering",
    blurb:
      "Agents and LLM workflows built to hold up in production. Most of my AI work is here.",
    skills: [
      { name: "LangGraph", level: 0.92 },
      { name: "LangChain", level: 0.9 },
      { name: "OpenAI APIs", level: 0.95 },
      { name: "Claude APIs", level: 0.92 },
      { name: "Evals & Calibration", level: 0.88 },
    ],
  },
  {
    id: "automation",
    name: "Automation",
    blurb:
      "Connecting tools so teams stop copying data between them. Usually n8n, sometimes plain code.",
    skills: [
      { name: "n8n", level: 0.95 },
      { name: "Telegram Bots", level: 0.9 },
      { name: "Google Workspace APIs", level: 0.9 },
      { name: "Webhook Architectures", level: 0.88 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    blurb: "APIs, services, and the databases underneath them.",
    skills: [
      { name: "Python", level: 0.94 },
      { name: "FastAPI", level: 0.9 },
      { name: "Node.js", level: 0.88 },
      { name: "PostgreSQL", level: 0.85 },
      { name: "MongoDB", level: 0.8 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    blurb: "Interfaces that stay fast on slow networks and maintainable as teams grow.",
    skills: [
      { name: "TypeScript", level: 0.92 },
      { name: "React", level: 0.93 },
      { name: "JavaScript", level: 0.95 },
      { name: "Tailwind / Design Systems", level: 0.9 },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    blurb: "Reproducible deploys and enough observability to debug what breaks.",
    skills: [
      { name: "Docker", level: 0.88 },
      { name: "Google Cloud", level: 0.85 },
      { name: "CI/CD", level: 0.85 },
      { name: "Git", level: 0.95 },
    ],
  },
];

export const experiences = [
  {
    company: "E-MOTI",
    role: "AI Automation Engineer",
    period: "2025",
    location: "Climate-tech · Electric mobility",
    summary:
      "Built the financial reporting automation from scratch. Stack was n8n, a Telegram bot, and a few Google APIs. The constraint that mattered was reliability: finance needed to trust the output, so every call had retries, idempotency, and validation before anything hit the spreadsheet.",
    outcomes: [
      "15-minute daily manual process down to under a minute",
      "Zero duplicate records in the first 30 days of operation",
      "Field team didn't need to change tools — Telegram was already on their phones",
    ],
  },
  {
    company: "MedAppoint",
    role: "Frontend Engineer",
    period: "2024",
    location: "Healthtech",
    summary:
      "Built the patient-side booking interface in React. Most of the work was performance: making the app usable on the devices and networks Kenyan clinics actually run on. The rest was standard API integration, UX iteration with the product team, and accessibility.",
    outcomes: [
      "Booking flow stayed functional on 2G connections",
      "Keyboard navigation and screen-reader support throughout",
      "Component patterns the team adopted for the rest of the product",
    ],
  },
  {
    company: "Petshelpful",
    role: "DevOps Engineer",
    period: "2024",
    location: "Consumer web",
    summary:
      "DevOps-focused role on a small consumer product team. Owned the deployment infrastructure and release pipeline that kept the engineering team shipping reliably.",
    outcomes: [
      "Managed CI/CD pipeline and deployment workflows end-to-end",
      "Maintained environment consistency across dev, staging, and production",
      "Reduced release friction so the product team could ship faster",
    ],
  },
  {
    company: "Scale AI / Remotasks",
    role: "AI Quality Specialist",
    period: "2023",
    location: "AI data · Evaluation",
    summary:
      "Graded LLM outputs across reasoning, code, and instruction-following. The most useful background I have for building anything with LLMs. You stop expecting models to be smart and start watching how they fail.",
    outcomes: [
      "800+ outputs evaluated across reasoning, code, and instruction tasks",
      "Developed a pattern library for hallucination and reasoning failures",
      "Feedback fed directly into production model training runs",
    ],
  },
];

export const certifications = [
  {
    title: "ALX FullStack Software Engineering",
    issuer: "ALX Africa",
    year: "2023",
    blurb: "Twelve-month full-stack program. Project-heavy, end to end. Where I stopped treating software as a side interest.",
    accent: "#5B8CFF",
    href: "https://intranet.alxswe.com/certificates/pxc6FrMYCL",
  },
  {
    title: "ALX Ventures Entrepreneurship",
    issuer: "ALX Ventures",
    year: "2024",
    blurb: "Cohort on building and running early-stage products. Sharpened how I translate user needs and business goals into what actually gets built.",
    accent: "#7AA5FF",
    href: "https://intranet.alxswe.com/certificates/6RZLH9J3er",
  },
  {
    title: "Google Cloud Skill Boost",
    issuer: "Google Cloud",
    year: "2025",
    blurb: "Lab-based training across GCP infrastructure and data services.",
    accent: "#9CBEFF",
    href: "https://www.skills.google/public_profiles/6db8fe96-63d8-4644-9795-1f2d782d225b?qlcampaign=5q-EDUCR-10%3A%3Ad37bHDzPWOjcgsoeQvc5gA",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

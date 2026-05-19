export const profile = {
  name: "Michael Gichamu",
  role: "Software Engineer & AI Automation Specialist",
  location: "Nairobi, Kenya",
  email: "michaelmatere606@gmail.com",
  github: "https://github.com/michaelgichamu",
  linkedin: "https://www.linkedin.com/in/michael-gichamu",
  available: true,
};

export const stats = [
  {
    label: "Faster troubleshooting workflows",
    value: 6,
    suffix: "×",
    caption:
      "Reduced average diagnostic time from 18 minutes to 3 using an AI-assisted troubleshooting system.",
  },
  {
    label: "Reduction in reporting time",
    value: 90,
    suffix: "%",
    caption:
      "Automated a manual financial reporting workflow with n8n, Telegram, and Google Sheets integrations.",
  },
  {
    label: "LLM outputs evaluated",
    value: 800,
    suffix: "+",
    caption:
      "Reasoning, instruction-following, and quality evaluation work through Scale AI / Remotasks.",
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
  stack: string[];
  accent: string;
  visual: "medtech" | "ai-graph" | "automation";
};

export const projects: Project[] = [
  {
    slug: "ai-troubleshooting",
    index: "01",
    title: "AI-Augmented Troubleshooting System",
    tag: "Healthcare · LangGraph",
    year: "2025",
    description:
      "An AI-assisted diagnostic workflow for biomedical equipment troubleshooting. The goal was to help technicians move through fault diagnosis more consistently, especially in situations where troubleshooting depended heavily on senior experience. LangGraph structures the diagnostic flow; an LLM interprets symptoms and guides the next steps; a small equipment ontology keeps its reasoning grounded.",
    impact:
      "For a set of common faults, average troubleshooting time dropped from about 18 minutes to 3.",
    highlights: [
      "LangGraph state machine that routes between diagnostic stages.",
      "Equipment ontology that grounds the LLM in real fault patterns.",
      "Operator-in-the-loop — every step is something the technician can confirm or override.",
      "Audit trail of every decision, kept for compliance review.",
    ],
    stack: ["Python", "LangGraph", "LangChain", "OpenAI", "FastAPI", "PostgreSQL"],
    accent: "#7AA5FF",
    visual: "ai-graph",
  },
  {
    slug: "medappoint",
    index: "02",
    title: "MedAppoint",
    tag: "Healthcare · Web platform",
    year: "2024",
    description:
      "A medical appointment platform designed for clinics and patients. I worked mainly on the frontend — building the booking flows, improving responsiveness, and making the interface work reliably across slower devices and unstable connections.",
    impact:
      "Pushed me deeper into frontend architecture, state management, and product thinking.",
    highlights: [
      "Reduced unnecessary re-renders and tightened component-level performance budgets.",
      "Improved loading states and interaction responsiveness on slower networks.",
      "Simplified the booking flow with product input.",
      "Accessibility-first patterns: keyboard navigation, screen reader labels, larger tap targets.",
    ],
    stack: ["React", "TypeScript", "REST", "Tailwind", "Vite"],
    accent: "#5B8CFF",
    visual: "medtech",
  },
  {
    slug: "financial-automation",
    index: "03",
    title: "Financial Automation System",
    tag: "Climate-tech · Automation",
    year: "2025",
    description:
      "An automation workflow for financial reporting at an electric mobility startup. The original process relied on manually updating a spreadsheet from messages sent by field operators. I replaced most of that flow with an n8n automation that collects submissions through a Telegram bot, validates them, and syncs the data directly into Google Sheets.",
    impact:
      "Reporting time dropped from around 15 minutes to under a minute.",
    highlights: [
      "Validation checks that prevent malformed entries.",
      "Retries and idempotency on every external call, so flaky network conditions don't double-write.",
      "Telegram interface, because that's what the field team was already using.",
      "Reconciliation that preserves reporting consistency across systems.",
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
      "Agents and LLM workflows that hold up in production. Most of my AI work is here.",
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
      "Connecting tools so people stop copy-pasting between them. Usually n8n, sometimes plain code.",
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
    blurb: "APIs, services, and the data they sit on top of.",
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
    blurb: "Interfaces that stay fast on slow networks and stay maintainable as they grow.",
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
    blurb: "Reproducible deploys and the tooling around them. Enough to keep things observable.",
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
      "Built and maintained the financial reporting automation. Stack was n8n, a Telegram bot, and a few Google APIs. The focus was reliability — validation, retries, and reconciliation — so finance could trust the output.",
    outcomes: [
      "Reporting time dropped from ~15 minutes to under a minute",
      "Retries and idempotency on every external call",
      "Telegram interface, because that's what the field team used",
    ],
  },
  {
    company: "MedAppoint",
    role: "Frontend Engineer",
    period: "2024",
    location: "Healthtech",
    summary:
      "Built the patient-side booking interface in React. A lot of the work was performance — making the app usable on the kind of devices and networks Kenyan clinics actually run on. The rest was a fairly standard frontend role: API integration, UX iteration with product, accessibility.",
    outcomes: [
      "Booking flow stayed usable on 2G",
      "Accessible scheduling for older devices",
      "Shared component patterns the rest of the team picked up",
    ],
  },
  {
    company: "Petshelpful",
    role: "Software Engineer",
    period: "2024",
    location: "Consumer web",
    summary:
      "General software work on a small consumer team — features, fixes, and some performance cleanup. The kind of role where you touch everything and learn how the product fits together.",
    outcomes: [
      "Shipped customer-facing features end-to-end",
      "Fewer page-level regressions after improving tests",
      "Maintainable component patterns the team adopted",
    ],
  },
  {
    company: "Scale AI / Remotasks",
    role: "AI Quality Specialist",
    period: "2023",
    location: "AI data · Evaluation",
    summary:
      "Evaluation work on LLM outputs across reasoning, code, and instruction-following tasks. Did this for about 3 months. It's still the most useful background I have for building anything with LLMs in production — you stop expecting them to be smart and start watching how they fail.",
    outcomes: [
      "800+ LLM outputs evaluated",
      "Pattern recognition for hallucination and reasoning failure",
      "Feedback that fed back into production model behavior",
    ],
  },
];

export const certifications = [
  {
    title: "ALX FullStack Software Engineering",
    issuer: "ALX Africa",
    year: "2023",
    blurb: "Twelve-month full-stack program. Mostly project work, end to end.",
    accent: "#5B8CFF",
    href: "https://intranet.alxswe.com/certificates/pxc6FrMYCL",
  },
  {
    title: "ALX Ventures Entrepreneurship",
    issuer: "ALX Ventures",
    year: "2024",
    blurb: "Cohort on building and running early-stage products.",
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

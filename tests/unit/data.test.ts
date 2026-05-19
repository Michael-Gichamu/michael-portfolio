import { describe, it, expect } from "vitest";
import {
  profile,
  projects,
  stats,
  experiences,
  certifications,
  skillCategories,
} from "@/lib/data";

describe("profile — identity block must stay accurate", () => {
  it("has the right name and role", () => {
    expect(profile.name).toBe("Michael Gichamu");
    expect(profile.role).toMatch(/Software Engineer/);
    expect(profile.role).toMatch(/AI Automation/);
  });

  it("has a valid-looking email", () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("has https github + linkedin links", () => {
    expect(profile.github).toMatch(/^https:\/\/github\.com\//);
    expect(profile.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\//);
  });
});

describe("projects — order, integrity, and required fields", () => {
  it("has exactly three projects", () => {
    expect(projects).toHaveLength(3);
  });

  it("leads with the AI-Augmented Troubleshooting System", () => {
    expect(projects[0].slug).toBe("ai-troubleshooting");
    expect(projects[0].index).toBe("01");
  });

  it("MedAppoint is second, Financial Automation is third", () => {
    expect(projects[1].slug).toBe("medappoint");
    expect(projects[1].index).toBe("02");
    expect(projects[2].slug).toBe("financial-automation");
    expect(projects[2].index).toBe("03");
  });

  it("every project has the required shape", () => {
    for (const p of projects) {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.impact).toBeTruthy();
      expect(p.highlights.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
      expect(["medtech", "ai-graph", "automation"]).toContain(p.visual);
    }
  });
});

describe("stats — three measurable highlights, no banned phrasing", () => {
  it("has three entries", () => {
    expect(stats).toHaveLength(3);
  });

  it("never references 'calibration' in any field", () => {
    for (const s of stats) {
      expect(s.label.toLowerCase()).not.toContain("calibration");
      expect(s.caption.toLowerCase()).not.toContain("calibration");
    }
  });
});

describe("experiences — four roles, in order", () => {
  it("has four entries", () => {
    expect(experiences).toHaveLength(4);
  });

  it("includes E-MOTI, MedAppoint, Petshelpful, Scale AI", () => {
    const companies = experiences.map((e) => e.company);
    expect(companies).toEqual([
      "E-MOTI",
      "MedAppoint",
      "Petshelpful",
      "Scale AI / Remotasks",
    ]);
  });
});

describe("certifications — three with verifiable links", () => {
  it("has three entries with hrefs", () => {
    expect(certifications).toHaveLength(3);
    for (const c of certifications) {
      expect(c.href).toMatch(/^https?:\/\//);
    }
  });
});

describe("skillCategories — five categories", () => {
  it("has five categories with non-empty skills", () => {
    expect(skillCategories).toHaveLength(5);
    for (const c of skillCategories) {
      expect(c.skills.length).toBeGreaterThan(0);
    }
  });
});

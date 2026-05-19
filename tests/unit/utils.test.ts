import { describe, it, expect } from "vitest";
import { cn, sectionIds } from "@/lib/utils";

describe("cn — class merger", () => {
  it("merges plain class strings", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("collapses tailwind conflicts (later wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("filters out falsy values", () => {
    expect(cn("a", undefined, null, false, "b")).toBe("a b");
  });

  it("handles conditional objects", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});

describe("sectionIds — single source of truth for section anchors", () => {
  it("exposes every required section anchor", () => {
    expect(sectionIds).toMatchObject({
      hero: "top",
      about: "about",
      projects: "work",
      skills: "skills",
      experience: "experience",
      certifications: "credentials",
      contact: "contact",
    });
  });
});

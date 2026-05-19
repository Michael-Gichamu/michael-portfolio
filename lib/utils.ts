import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sectionIds = {
  hero: "top",
  about: "about",
  projects: "work",
  skills: "skills",
  experience: "experience",
  certifications: "credentials",
  contact: "contact",
} as const;

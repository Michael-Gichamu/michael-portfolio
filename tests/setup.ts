import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't implement matchMedia — many of our client components use it.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// jsdom doesn't implement IntersectionObserver — ScrollProgress uses it.
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds: number[] = [];
}
// @ts-expect-error — assigning a polyfill to global
global.IntersectionObserver = MockIntersectionObserver;

// requestAnimationFrame fallback
global.requestAnimationFrame ||= ((cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 16)) as typeof requestAnimationFrame;
global.cancelAnimationFrame ||= ((id: number) => clearTimeout(id)) as typeof cancelAnimationFrame;

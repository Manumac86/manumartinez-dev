import "@testing-library/jest-dom/vitest"

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
Object.defineProperty(globalThis, "IntersectionObserver", { value: IntersectionObserverStub, writable: true })

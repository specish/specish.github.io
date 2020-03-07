import { describe, it, expect } from "../src/Specish.js";
import DomConsole from "../src/DomConsole.js";

describe("DomConsole", () => {
  it("should create an instance", () => {
    const mockDocument = {
      getElementById: id => ({
        appendChild: child => {}
      }),
      createElement: tagName => null
    };
    expect(new DomConsole("", mockDocument)).toBeDefined();
  });
});

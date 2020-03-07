import { describe, it, expect } from "../src/Specish.js";
import RootSuite from "../src/RootSuite.js";

describe("RootSuite", () => {
  it("should create an instance", () => {
    expect(new RootSuite()).toBeDefined();
  });

  describe("run", () => {
    it("should not throw if empty", () => {
      const rootSuite = new RootSuite();
      expect(() => rootSuite.run()).not.toThrowSomething();
    });
  });
});

import { describe, it, expect } from "../src/Specish.js";
import Suite from "../src/Suite.js";

describe("Suite", () => {
  it("should create an instance", () => {
    expect(new Suite()).toBeDefined();
  });

  describe("run", () => {
    it("should not throw if empty", () => {
      const suite = new Suite();
      const suiteStart = description => {};
      const suiteEnd = () => {};
      expect(() => suite.run({ suiteStart, suiteEnd })).not.toThrowSomething();
    });
  });
});

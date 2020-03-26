import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Mock from "../src/Mock.js";
import RootSuite from "../src/RootSuite.js";

describe("RootSuite", () => {
  describe("specs", () => {
    it("should be empty initially", () => {
      expect(new RootSuite().specs.length).toBe(0);
    });
  });

  describe("innerSuites", () => {
    it("should be empty initially", () => {
      expect(new RootSuite().innerSuites.length).toBe(0);
    });
  });

  describe("run", () => {
    let rootSuite;
    let mockSpec;
    let mockInnerSuite;

    beforeEach(() => {
      rootSuite = new RootSuite();
      mockSpec = { run: Mock.fn().mockName("run") };
      mockInnerSuite = { run: Mock.fn().mockName("run") };
    });

    it("should run the spec once with handler", () => {
      const handler = {};
      rootSuite.specs.push(mockSpec);
      rootSuite.run(handler);
      expect(mockSpec.run).toHaveBeenCalledTimes(1);
      expect(mockSpec.run).toHaveBeenCalledWithShallow(handler);
    });

    it("should run the inner suite once with handler", () => {
      const handler = {};
      rootSuite.innerSuites.push(mockInnerSuite);
      rootSuite.run(handler);
      expect(mockInnerSuite.run).toHaveBeenCalledTimes(1);
      expect(mockInnerSuite.run).toHaveBeenCalledWithShallow(handler);
    });
  });
});

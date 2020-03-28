import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Mock from "../src/Mock.js";
import Suite from "../src/Suite.js";

describe("Suite", () => {
  describe("constructor", () => {
    describe("specs", () => {
      it("should be empty initially", () => {
        expect(new Suite().specs.length).toBe(0);
      });
    });

    describe("innerSuites", () => {
      it("should be empty initially", () => {
        expect(new Suite().innerSuites.length).toBe(0);
      });
    });

    describe("preSpecs", () => {
      it("should be empty initially", () => {
        expect(new Suite().preSpecs.length).toBe(0);
      });
    });

    describe("postSpecs", () => {
      it("should be empty initially", () => {
        expect(new Suite().postSpecs.length).toBe(0);
      });
    });
  });

  describe("run", () => {
    const description = {};
    let mockHandler;
    let mockSpec;
    let mockInnerSuite;

    beforeEach(() => {
      mockHandler = {
        suiteStart: Mock.fn().mockName("suiteStart"),
        suiteEnd: Mock.fn().mockName("suiteEnd")
      };
      mockSpec = { run: Mock.fn().mockName("run") };
      mockInnerSuite = { run: Mock.fn().mockName("run") };

      const suite = new Suite(null, description);
      suite.specs.push(mockSpec);
      suite.innerSuites.push(mockInnerSuite);
      suite.run(mockHandler);
    });

    it("should invoke suiteStart once with description", () => {
      expect(mockHandler.suiteStart).toHaveBeenCalledTimes(1);
      expect(mockHandler.suiteStart).toHaveBeenCalledWithShallow(description);
    });

    it("should invoke suiteEnd once with no arguments", () => {
      expect(mockHandler.suiteEnd).toHaveBeenCalledTimes(1);
      expect(mockHandler.suiteEnd).toHaveBeenCalledWithShallow();
    });

    it("should run the spec once with handler", () => {
      expect(mockSpec.run).toHaveBeenCalledTimes(1);
      expect(mockSpec.run).toHaveBeenCalledWithShallow(mockHandler);
    });

    it("should run the inner suite once with handler", () => {
      expect(mockInnerSuite.run).toHaveBeenCalledTimes(1);
      expect(mockInnerSuite.run).toHaveBeenCalledWithShallow(mockHandler);
    });
  });
});

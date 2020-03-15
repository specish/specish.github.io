import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Mock from "../src/Mock.js";
import RootSuite from "../src/RootSuite.js";

describe("RootSuite", () => {
  describe("preSpecs", () => {
    it("should be empty initially", () => {
      expect(new RootSuite().preSpecs.length).toBe(0);
    });
  });

  describe("specs", () => {
    it("should be empty initially", () => {
      expect(new RootSuite().specs.length).toBe(0);
    });
  });

  describe("postSpecs", () => {
    it("should be empty initially", () => {
      expect(new RootSuite().postSpecs.length).toBe(0);
    });
  });

  describe("innerSuites", () => {
    it("should be empty initially", () => {
      expect(new RootSuite().innerSuites.length).toBe(0);
    });
  });

  describe("run", () => {
    let rootSuite;
    let mockPreSpec;
    let mockSpec;
    let mockPostSpec;
    let mockInnerSuite;

    beforeEach(() => {
      rootSuite = new RootSuite();

      mockPreSpec = Mock.fn();
      mockPreSpec.mock.name = "pre-spec";

      mockSpec = { run: Mock.fn() };
      mockSpec.run.mock.name = "spec";

      mockPostSpec = Mock.fn();
      mockPostSpec.mock.name = "post-spec";

      mockInnerSuite = { run: Mock.fn() };
      mockInnerSuite.run.mock.name = "inner suite";
    });

    it("should run the spec once", () => {
      rootSuite.specs.push(mockSpec);
      rootSuite.run();
      expect(mockSpec.run).toHaveBeenCalledTimes(1);
    });

    it("should run the inner suite once", () => {
      rootSuite.innerSuites.push(mockInnerSuite);
      rootSuite.run();
      expect(mockInnerSuite.run).toHaveBeenCalledTimes(1);
    });

    it("should call the pre-spec once for each spec", () => {
      rootSuite.preSpecs.push(mockPreSpec);
      rootSuite.run();
      expect(mockPreSpec).not.toHaveBeenCalled();

      rootSuite.specs.push(mockSpec);
      rootSuite.run();
      expect(mockPreSpec).toHaveBeenCalledTimes(1);
    });

    it("should call the post-spec once for each spec", () => {
      rootSuite.postSpecs.push(mockPostSpec);
      rootSuite.run();
      expect(mockPostSpec).not.toHaveBeenCalled();

      rootSuite.specs.push(mockSpec);
      rootSuite.run();
      expect(mockPostSpec).toHaveBeenCalledTimes(1);
    });

    it("should call the pre-spec once for each inner suite", () => {
      rootSuite.preSpecs.push(mockPreSpec);
      rootSuite.run();
      expect(mockPreSpec).not.toHaveBeenCalled();

      rootSuite.innerSuites.push(mockInnerSuite);
      rootSuite.run();
      expect(mockPreSpec).toHaveBeenCalledTimes(1);
    });

    it("should call the post-spec once for each inner suite", () => {
      rootSuite.postSpecs.push(mockPostSpec);
      rootSuite.run();
      expect(mockPostSpec).not.toHaveBeenCalled();

      rootSuite.innerSuites.push(mockInnerSuite);
      rootSuite.run();
      expect(mockPostSpec).toHaveBeenCalledTimes(1);
    });
  });
});

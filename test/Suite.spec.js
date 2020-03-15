import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Mock from "../src/Mock.js";
import Suite from "../src/Suite.js";

describe("Suite", () => {
  describe("run", () => {
    let suite;
    let mockHandler;

    beforeEach(() => {
      suite = new Suite();
      mockHandler = {
        suiteStart: Mock.fn(),
        suiteEnd: Mock.fn()
      };
    });

    it("should call handler to start suite", () => {
      suite.run(mockHandler);
      expect(mockHandler.suiteStart).toHaveBeenCalled();
    });

    it("should call handler to end suite", () => {
      suite.run(mockHandler);
      expect(mockHandler.suiteEnd).toHaveBeenCalled();
    });
  });
});

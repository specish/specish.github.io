import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Mock from "../src/Mock.js";
import Suite from "../src/Suite.js";

describe("Suite", () => {
  describe("run", () => {
    const description = {};
    let mockCallback;
    let mockHandler;

    beforeEach(() => {
      mockCallback = Mock.fn().mockName("mockCallback");
      mockHandler = {
        suiteStart: Mock.fn().mockName("suiteStart"),
        suiteEnd: Mock.fn().mockName("suiteEnd")
      };

      const suite = new Suite(description, mockCallback);
      suite.run(mockHandler);
    });

    it("should invoke callback once with no arguments", () => {
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWithShallow();
    });

    it("should invoke suiteStart once with description", () => {
      expect(mockHandler.suiteStart).toHaveBeenCalledTimes(1);
      expect(mockHandler.suiteStart).toHaveBeenCalledWithShallow(description);
    });

    it("should invoke suiteEnd once with no arguments", () => {
      expect(mockHandler.suiteEnd).toHaveBeenCalledTimes(1);
      expect(mockHandler.suiteEnd).toHaveBeenCalledWithShallow();
    });
  });
});

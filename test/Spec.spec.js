import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Mock from "../src/Mock.js";
import Spec from "../src/Spec.js";

describe("Spec", () => {
  describe("run", () => {
    let mockHandler;

    beforeEach(() => {
      mockHandler = { specPass: Mock.fn(), specFail: Mock.fn() };
    });

    it("should call handler to pass spec for a callback that returns normally", () => {
      const spec = new Spec(null, () => {});
      spec.run(mockHandler);
      expect(mockHandler.specPass).toHaveBeenCalled();
    });

    it("should call handler to fail spec for a callback that throws", () => {
      const spec = new Spec(null, () => {
        throw "foo";
      });
      spec.run(mockHandler);
      expect(mockHandler.specFail).toHaveBeenCalled();
    });
  });
});

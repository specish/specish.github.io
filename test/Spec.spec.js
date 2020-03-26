import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Mock from "../src/Mock.js";
import Spec from "../src/Spec.js";

describe("Spec", () => {
  describe("run", () => {
    let mockHandler;

    beforeEach(() => {
      mockHandler = {
        specStart: Mock.fn().mockName("specStart"),
        specEnd: Mock.fn().mockName("specEnd"),
        specPass: Mock.fn().mockName("specPass"),
        specFail: Mock.fn().mockName("specFail")
      };
    });

    it("should invoke specStart and specEnd once each for a callback that returns normally", () => {
      const spec = new Spec(null, () => {});

      spec.run(mockHandler);

      expect(mockHandler.specStart).toHaveBeenCalledTimes(1);
      expect(mockHandler.specStart).toHaveBeenCalledWithShallow();
      expect(mockHandler.specEnd).toHaveBeenCalledTimes(1);
      expect(mockHandler.specEnd).toHaveBeenCalledWithShallow();
    });

    it("should invoke specStart and specEnd once each for a callback that throws", () => {
      const spec = new Spec(null, () => {
        throw { message: null };
      });

      spec.run(mockHandler);

      expect(mockHandler.specStart).toHaveBeenCalledTimes(1);
      expect(mockHandler.specStart).toHaveBeenCalledWithShallow();
      expect(mockHandler.specEnd).toHaveBeenCalledTimes(1);
      expect(mockHandler.specEnd).toHaveBeenCalledWithShallow();
    });

    it("should invoke specPass once for a callback that returns normally", () => {
      const description = {};
      const spec = new Spec(description, () => {});

      spec.run(mockHandler);

      expect(mockHandler.specPass).toHaveBeenCalledTimes(1);
      expect(mockHandler.specPass).toHaveBeenCalledWithShallow(description);
    });

    it("should invoke specFail once for a callback that throws", () => {
      const description = {};
      const message = {};
      const spec = new Spec(description, () => {
        throw { message };
      });

      spec.run(mockHandler);

      expect(mockHandler.specFail).toHaveBeenCalledTimes(1);
      expect(mockHandler.specFail).toHaveBeenCalledWithShallow(
        description,
        message
      );
    });
  });
});

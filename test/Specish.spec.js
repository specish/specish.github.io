import { describe, it, beforeEach, afterEach, expect } from "../src/Specish.js";
import Mock from "../src/Mock.js";

describe("Specish", () => {
  let mockPreSpec;
  let mockPostSpec;
  let mockSpec;

  beforeEach(() => {
    mockPreSpec = Mock.fn().mockName("mockPreSpec");
    mockPostSpec = Mock.fn().mockName("mockPostSpec");
    mockSpec = Mock.fn().mockName("mockSpec");
  });

  beforeEach(() => mockPreSpec());

  afterEach(() => mockPostSpec());

  describe("Pre-spec callback", () => {
    it("should be invoked once before the first spec", () => {
      expect(mockPreSpec).toHaveBeenCalledTimes(1);
      expect(mockPreSpec).toHaveBeenCalledWithShallow();
    });

    it("(mock pre-spec)", () => mockPreSpec());

    it("should be invoked once before any subsequent spec", () => {
      expect(mockPreSpec).toHaveBeenCalledTimes(1);
      expect(mockPreSpec).toHaveBeenCalledWithShallow();
    });
  });

  describe("Post-spec callback", () => {
    it("should not be invoked before the first spec", () => {
      expect(mockPostSpec).not.toHaveBeenCalled();
    });

    it("(mock post-spec)", () => mockPostSpec());

    it("should not be invoked before any subsequent spec", () => {
      expect(mockPostSpec).not.toHaveBeenCalled();
    });
  });

  describe("Spec callback", () => {
    it("should not be invoked before the first spec", () => {
      expect(mockSpec).not.toHaveBeenCalled();
    });

    it("(mock spec)", () => mockSpec());

    it("should not be invoked before any subsequent spec", () => {
      expect(mockSpec).not.toHaveBeenCalled();
    });
  });

  describe("Inner suite callback", () => {
    const mockInnerSuite = Mock.fn().mockName("mockInnerSuite");

    // Arrow function not needed since mockInnerSuite is a const function
    describe("(mock inner suite)", mockInnerSuite);

    it("should be invoked once before any spec", () => {
      expect(mockInnerSuite).toHaveBeenCalledTimes(1);
      expect(mockInnerSuite).toHaveBeenCalledWithShallow();
    });
  });
});

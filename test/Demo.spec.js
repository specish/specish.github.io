import { describe, it, expect } from "../src/Specish.js";
import Demo from "../demo/Demo.js";

describe("Demo", () => {
  it("should return the value x as the minimum of x and x", () => {
    const x = 3.14;
    expect(Demo.min(x, x)).toBe(x);
  });

  it("should return EPSILON as the minimum of 4 and EPSILON", () => {
    expect(Demo.min(4, Number.EPSILON)).toBe(Number.EPSILON);
  });

  describe("Number.EPSILON", () => {
    it("should be insignificant compared to 4", () => {
      expect(4 + Number.EPSILON).toBe(4);
    });
  });
});

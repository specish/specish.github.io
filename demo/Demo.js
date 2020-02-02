import { SpecConfiguration } from "../src/SpecConfiguration.js";

export class Demo {
  static min(a, b) {
    return (a + b - Math.abs(a - b)) / 2;
  }
}

const { describe, it, expect, beforeEach } = SpecConfiguration.platform;
describe("Demo", () => {
  it("should return the value x as the minimum of x and x", () => {
    const x = 3.14;
    expect(Demo.min(x, x)).toEqual(x);
  });

  it("should return EPSILON as the minimum of 4 and EPSILON", () => {
    expect(Demo.min(4, Number.EPSILON)).toEqual(Number.EPSILON);
  });
});

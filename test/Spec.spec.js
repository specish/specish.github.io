import { describe, it, expect } from "../src/Specish.js";
import Spec from "../src/Spec.js";

describe("Spec", () => {
  it("should create an instance", () => {
    expect(new Spec()).toBeDefined();
  });
});

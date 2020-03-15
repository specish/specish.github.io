import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Matcher from "../src/Matcher.js";

describe("Matcher", () => {
  it("should not throw for a positive match", () => {
    expect(() => new Matcher(true).toBe(true)).not.toThrowSomething();
  });

  it("should throw for a positive mismatch", () => {
    expect(() => new Matcher(undefined).toBeDefined()).toThrowSomething();
  });

  describe("not", () => {
    it("should not throw for a negative mismatch", () => {
      expect(() =>
        new Matcher(undefined).not.toBeDefined()
      ).not.toThrowSomething();
    });

    it("should throw for a negative match", () => {
      expect(() => new Matcher(true).not.toBe(true)).toThrowSomething();
    });
  });

  describe("toBe", () => {
    it("should not throw for a matching boolean", () => {
      expect(() => new Matcher(true).toBe(true)).not.toThrowSomething();
    });

    it("should throw for a non-matching boolean", () => {
      expect(() => new Matcher(true).toBe(false)).toThrowSomething();
    });

    it("should not throw for a matching number", () => {
      expect(() => new Matcher(7).toBe(7)).not.toThrowSomething();
    });

    it("should throw for a non-matching number", () => {
      expect(() => new Matcher(7).toBe(13)).toThrowSomething();
    });

    it("should not throw for a matching string", () => {
      expect(() => new Matcher("foo").toBe("foo")).not.toThrowSomething();
    });

    it("should throw for a non-matching string", () => {
      expect(() => new Matcher("foo").toBe("bar")).toThrowSomething();
    });

    it("should not throw for a matching reference", () => {
      const obj = {};
      expect(() =>
        new Matcher(undefined).toBe(undefined)
      ).not.toThrowSomething();
      expect(() => new Matcher(null).toBe(null)).not.toThrowSomething();
      expect(() => new Matcher(obj).toBe(obj)).not.toThrowSomething();
    });

    it("should throw for a non-matching reference", () => {
      const obj = {};
      expect(() => new Matcher(undefined).toBe(null)).toThrowSomething();
      expect(() => new Matcher(null).toBe(obj)).toThrowSomething();
      expect(() => new Matcher(obj).toBe({})).toThrowSomething();
    });
  });

  describe("toBeDefined", () => {
    it("should not throw for matching comparisons", () => {
      expect(() => new Matcher(null).toBeDefined()).not.toThrowSomething();
      expect(() => new Matcher(true).toBeDefined()).not.toThrowSomething();
      expect(() => new Matcher(7).toBeDefined()).not.toThrowSomething();
      expect(() => new Matcher("foo").toBeDefined()).not.toThrowSomething();
    });

    it("should throw for non-matching comparisons", () => {
      expect(() => new Matcher(undefined).toBeDefined()).toThrowSomething();
    });
  });

  describe("toContain", () => {
    it("should not throw for a matching string", () => {
      expect(() =>
        new Matcher("this is a test").toContain("is")
      ).not.toThrowSomething();
    });

    it("should throw for a non-matching string", () => {
      expect(() =>
        new Matcher("this is a test").toContain("foo")
      ).toThrowSomething();
    });

    it("should not throw for a matching array", () => {
      expect(() => new Matcher([7, 13]).toContain(13)).not.toThrowSomething();
    });

    it("should throw for a non-matching array", () => {
      expect(() => new Matcher([1, 2, 3]).toContain(0)).toThrowSomething();
    });
  });

  describe("toThrowSomething", () => {
    it("should not throw for an expected throw", () => {
      expect(() =>
        new Matcher(() => {
          throw "foo";
        }).toThrowSomething()
      ).not.toThrowSomething();
    });

    it("should throw for an unexpected normal return", () => {
      expect(() => new Matcher(() => {}).toThrowSomething()).toThrowSomething();
    });
  });
});

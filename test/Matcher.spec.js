import { describe, it, expect, beforeEach } from "../src/Specish.js";
import Matcher from "../src/Matcher.js";

describe("Matcher", () => {
  it("should create an instance", () => {
    expect(new Matcher()).toBeDefined();
  });

  describe("toBe", () => {
    const firstNumber = 7;
    const secondNumber = 13;
    let expectFirstNumber;

    beforeEach(() => {
      expectFirstNumber = new Matcher(firstNumber);
    });

    it("should not throw for expected number comparisons", () => {
      expectFirstNumber.toBe(firstNumber);
      expectFirstNumber.not.toBe(secondNumber);
      expectFirstNumber.not.not.toBe(firstNumber);
    });

    it("should throw for unexpected number comparisons", () => {
      expect(() => expectFirstNumber.toBe(secondNumber)).toThrowSomething();
      expect(() => expectFirstNumber.not.toBe(firstNumber)).toThrowSomething();
      expect(() =>
        expectFirstNumber.not.not.toBe(secondNumber)
      ).toThrowSomething();
    });
  });

  describe("toBeDefined", () => {
    let expectUndefined;
    let expectNull;
    let expectString;

    beforeEach(() => {
      expectUndefined = new Matcher(undefined);
      expectNull = new Matcher(null);
      expectString = new Matcher("foo");
    });

    it("should not throw for expected comparisons", () => {
      expectUndefined.not.toBeDefined();
      expectNull.toBeDefined();
      expectString.toBeDefined();
    });

    it("should throw for unexpected comparisons", () => {
      expect(() => expectUndefined.toBeDefined()).toThrowSomething();
      expect(() => expectNull.not.toBeDefined()).toThrowSomething();
      expect(() => expectString.not.toBeDefined()).toThrowSomething();
    });
  });

  describe("toThrowSomething", () => {
    let expectNoException;
    let expectException;

    beforeEach(() => {
      expectNoException = new Matcher("foo");
      expectException = new Matcher(() => {
        throw new Error();
      });
    });

    it("should not throw for expected flow", () => {
      expectNoException.not.toThrowSomething();
      expectException.toThrowSomething();
      expectException.not.not.toThrowSomething();
    });

    it("should throw for unexpected flow", () => {
      expect(() => expectNoException.toThrowSomething()).toThrowSomething();
      expect(() => expectException.not.toThrowSomething()).toThrowSomething();
    });
  });
});

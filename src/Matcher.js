export default class Matcher {
  constructor(actual, inverse) {
    this.actual = actual;
    this.sense = !inverse;
    this.not = inverse || new Matcher(actual, this);
  }

  throwIf(condition, messageCallback) {
    if (!condition === !this.sense) {
      throw new Error(messageCallback(this.sense ? "" : "not "));
    }
  }

  toBe(expected) {
    this.throwIf(
      this.actual !== expected,
      not => `expected ${this.actual} ${not}to be ${expected}`
    );
  }

  toBeDefined() {
    this.throwIf(
      this.actual === undefined,
      not => `expected ${this.actual} ${not}to be defined`
    );
  }

  toThrowSomething() {
    let isSomethingThrown;

    if (typeof this.actual !== "function") {
      isSomethingThrown = false;
    } else {
      try {
        this.actual();
        isSomethingThrown = false;
      } catch (e) {
        isSomethingThrown = true;
      }
    }

    this.throwIf(
      !isSomethingThrown,
      not => `expected ${this.actual} ${not}to throw something`
    );
  }
}

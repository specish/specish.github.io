export default class Matcher {
  constructor(actual) {
    this.actual = actual;
  }

  toBe(expected) {
    if (this.actual !== expected) {
      throw new Error(`expected ${this.actual} to be ${expected}`);
    }
  }

  toBeDefined() {
    if (this.actual === undefined) {
      throw new Error(`expected ${this.actual} to be defined`);
    }
  }
}

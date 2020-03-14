export default class Matcher {
  constructor(actual, positiveMatcher) {
    this.actual = actual;
    this.sense = !positiveMatcher;
    this.not = positiveMatcher || new Matcher(actual, this);
  }

  throwIf({ condition, message }) {
    if (!condition === !this.sense) {
      const possibly = s => (this.sense ? s : `not ${s}`);
      throw new Error(message(possibly));
    }
  }

  toBe(expected) {
    this.throwIf({
      condition: this.actual !== expected,
      message: possibly =>
        `expected ${this.actual} ${possibly(`to be ${expected}`)}`
    });
  }

  toBeDefined() {
    this.throwIf({
      condition: this.actual === undefined,
      message: possibly =>
        `expected ${this.actual} ${possibly(`to be defined`)}`
    });
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

    this.throwIf({
      condition: !isSomethingThrown,
      message: possibly =>
        `expected ${this.actual} ${possibly(`to throw something`)}`
    });
  }
}

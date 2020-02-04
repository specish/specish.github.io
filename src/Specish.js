class DefaultSpecRunner {
  constructor(mockConsole) {
    this.console = mockConsole || window.console;
  }

  describe(description, callback) {
    // TODO
  }

  it(description, callback) {
    // TODO
  }

  expect(actualValue) {
    // TODO
    return null;
  }

  beforeEach(callback) {
    // TODO
  }

  static testSelf({ describe, it, expect, beforeEach }) {
    describe("DefaultSpecRunner", () => {
      // TODO: write tests for DefaultSpecRunner
    });
  }
}

export class Specish {
  static createDefaultContext() {
    const runner = new DefaultSpecRunner();

    return {
      describe: (...args) => runner.describe(...args),
      it: (...args) => runner.it(...args),
      expect: (...args) => runner.expect(...args),
      beforeEach: (...args) => runner.beforeEach(...args)
    };
  }

  static testSelf({ describe, it, expect, beforeEach }) {
    DefaultSpecRunner.testSelf({ describe, it, expect, beforeEach });

    describe("Specish", () => {
      // TODO: write tests for Specish
    });
  }
}

Specish.context = Specish.createDefaultContext();

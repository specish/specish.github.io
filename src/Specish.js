class DefaultSpecRunner {
  constructor(mockConsole) {
    this.console = mockConsole || window.console;
    this.preSpec = [];
    this.postSpec = [];
  }

  describe(description, callback) {
    // TODO
    this.preSpec.push([]);
    this.postSpec.push([]);

    callback();

    this.preSpec.pop();
    this.postSpec.pop();
  }

  it(description, callback) {
    // TODO
    const preSpecs = this.preSpec[this.preSpec.length - 1];
    for (preSpec of preSpecs) {
      preSpec();
    }

    callback();
  }

  expect(actualValue) {
    // TODO
    return null;
  }

  beforeEach(callback) {
    // TODO
    this.preSpec[this.preSpec.length - 1].push(callback);
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

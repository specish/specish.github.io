function peek(arr) {
  return arr[arr.length - 1];
}

class DefaultSpecRunner {
  constructor(mockConsole) {
    this.console = mockConsole || window.console;
    this.suiteStack = [];
  }

  describe(suiteDescription, suiteCallback) {
    this.suiteStack.push({
      preSpecs: [],
      specs: [],
      postSpecs: []
    });

    // TODO: suiteDescription
    suiteCallback();

    const { preSpecs, specs, postSpecs } = this.suiteStack.pop();
    specs.forEach(({ description, callback }) => {
      preSpecs.forEach(preSpec => preSpec());
      // TODO: description
      callback();
      postSpecs.forEach(postSpec => postSpec());
    });
  }

  it(description, callback) {
    const { specs } = peek(this.suiteStack);
    specs.push({ description, callback });
  }

  expect(actualValue) {
    // TODO
    return null;
  }

  beforeEach(callback) {
    const { preSpecs } = peek(this.suiteStack);
    preSpecs.push(callback);
  }

  afterEach(callback) {
    const { postSpecs } = peek(this.suiteStack);
    postSpecs.push(callback);
  }

  static testSelf({ describe, it, expect, beforeEach }) {
    describe("DefaultSpecRunner", () => {
      // TODO: write tests for DefaultSpecRunner
    });
  }
}

export default class Specish {
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

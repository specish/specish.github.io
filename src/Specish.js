class DefaultSpecRunner {
  constructor(mockConsole) {
    this.console = mockConsole || window.console;
    this.suiteStack = [];
  }

  getCurrentSuite() {
    const len = this.suiteStack.length;
    if (len > 0) {
      return this.suiteStack[len - 1];
    } else {
      throw new Error("No current test suite. Please use describe().");
    }
  }

  runSuite({ preSpecs, specs, postSpecs, innerSuites }) {
    let passing = 0,
      failing = 0;

    specs.forEach(({ description, callback }) => {
      preSpecs.forEach(preSpec => preSpec());
      try {
        callback();
        passing++;
        this.console.info(`\u2713 ${description}`);
      } catch (err) {
        failing++;
        this.console.error(`${failing}) ${description}\n---> ${err.message}`);
      }
      postSpecs.forEach(postSpec => postSpec());
    });

    this.console.info(`Passing: ${passing}`);
    if (failing) {
      this.console.info(`Failing: ${failing} <---`);
    }

    innerSuites.forEach(innerSuite => innerSuite());
  }

  describe(description, callback) {
    const innerSuite = () => {
      this.console.group(description);

      this.suiteStack.push({
        preSpecs: [],
        specs: [],
        postSpecs: [],
        innerSuites: []
      });

      callback();

      this.runSuite(this.suiteStack.pop());

      this.console.groupEnd();
    };

    if (this.suiteStack.length > 0) {
      const { innerSuites } = this.getCurrentSuite();
      innerSuites.push(innerSuite);
    } else {
      innerSuite();
    }
  }

  it(description, callback) {
    const { specs } = this.getCurrentSuite();
    specs.push({ description, callback });
  }

  beforeEach(callback) {
    const { preSpecs } = this.getCurrentSuite();
    preSpecs.push(callback);
  }

  afterEach(callback) {
    const { postSpecs } = this.getCurrentSuite();
    postSpecs.push(callback);
  }

  expect(actual) {
    return {
      toEqual: expected => {
        if (expected !== actual) {
          throw new Error(`expected ${actual} to equal ${expected}`);
        }
      }
    };
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
      beforeEach: (...args) => runner.beforeEach(...args),
      afterEach: (...args) => runner.afterEach(...args)
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

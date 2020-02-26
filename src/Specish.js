class DefaultSpecRunner {
  constructor(mockConsole) {
    this.console = mockConsole || console;
    this.suiteStack = [];
    this.passing = 0;
    this.failing = 0;
  }

  getCurrentSuite() {
    const len = this.suiteStack.length;
    if (!len) {
      throw new Error("No current test suite. Please use describe().");
    }

    return this.suiteStack[len - 1];
  }

  runSuite({ preSpecs, specs, postSpecs, innerSuites }) {
    specs.forEach(({ description, callback }) => {
      preSpecs.forEach(preSpec => preSpec());
      try {
        callback();
        this.passing++;
        this.console.info(`\u2713 ${description}`);
      } catch (err) {
        this.failing++;
        this.console.error(
          `${this.failing}) ${description}\n---> ${err.message}`
        );
      }
      postSpecs.forEach(postSpec => postSpec());
    });

    innerSuites.forEach(innerSuite => {
      preSpecs.forEach(preSpec => preSpec());
      innerSuite();
      postSpecs.forEach(postSpec => postSpec());
    });
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

    if (this.suiteStack.length) {
      const { innerSuites } = this.getCurrentSuite();
      innerSuites.push(innerSuite);
    } else {
      const label = "Elapsed";
      this.console.time(label);

      innerSuite();

      this.console.timeEnd(label);
      this.console.info(`Passing: ${this.passing}`);
      if (this.failing) {
        this.console.info(`Failing: ${this.failing} <---`);
      }
      this.console.info();
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

class Specish {
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

export default Specish;

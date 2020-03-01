const ELAPSED_LABEL = "Elapsed";

export default class Specish {
  constructor(mockConsole) {
    this.console = mockConsole || console;
    this.suiteStack = [];
    this.passing = 0;
    this.failing = 0;
  }

  logStats() {
    this.console.log(`Passing: ${this.passing}`);
    if (this.failing) {
      this.console.log(`Failing: ${this.failing} <---`);
    }
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
        this.console.log(`\u2713 ${description}`);
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
      this.console.time(ELAPSED_LABEL);
      innerSuite();
      this.console.timeEnd(ELAPSED_LABEL);
    }
  }

  it(description, callback) {
    const { specs } = this.getCurrentSuite();
    specs.push({ description, callback });
  }

  expect(actual) {
    return {
      toBe: expected => {
        if (expected !== actual) {
          throw new Error(`expected ${actual} to be ${expected}`);
        }
      },
      toBeDefined: () => {
        if (actual === undefined) {
          throw new Error(`expected ${actual} to be defined`);
        }
      }
    };
  }

  beforeEach(callback) {
    const { preSpecs } = this.getCurrentSuite();
    preSpecs.push(callback);
  }

  afterEach(callback) {
    const { postSpecs } = this.getCurrentSuite();
    postSpecs.push(callback);
  }
}

Specish.defaultInstance = new Specish();

export const logStats = (...args) => Specish.defaultInstance.logStats(...args);
export const describe = (...args) => Specish.defaultInstance.describe(...args);
export const it = (...args) => Specish.defaultInstance.it(...args);
export const expect = (...args) => Specish.defaultInstance.expect(...args);
export const beforeEach = (...args) =>
  Specish.defaultInstance.beforeEach(...args);
export const afterEach = (...args) =>
  Specish.defaultInstance.afterEach(...args);

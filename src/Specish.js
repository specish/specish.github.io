import Matcher from "./Matcher.js";
import RootSuite from "./RootSuite.js";
import Spec from "./Spec.js";
import Suite from "./Suite.js";

class Specish {
  constructor() {
    this.currentSuite = new RootSuite();
    this.preSpecs = [];
    this.postSpecs = [];
  }

  runSuite(mockConsole) {
    const localConsole = mockConsole || console;
    let passing = 0;
    let failing = 0;

    this.currentSuite.run({
      suiteStart: description => {
        localConsole.group(description);
      },
      suiteEnd: () => {
        localConsole.groupEnd();
      },
      specStart: () => this.preSpecs.forEach(preSpec => preSpec()),
      specEnd: () => this.postSpecs.forEach(postSpec => postSpec()),
      specPass: description => {
        passing++;
        localConsole.log(description);
      },
      specFail: (description, message) => {
        failing++;
        localConsole.error(`${description} ---> ${message}`);
      }
    });

    localConsole.log(`Passing: ${passing}`);
    if (failing) {
      localConsole.log(`Failing: ${failing} <---`);
    }
  }

  describe(description, callback) {
    const innerSuite = new Suite(description, () => {
      const previousSuite = this.currentSuite;
      this.currentSuite = innerSuite;
      callback();
      this.currentSuite = previousSuite;
    });
    this.currentSuite.innerSuites.push(innerSuite);
  }

  it(description, callback) {
    const spec = new Spec(description, callback);
    this.currentSuite.specs.push(spec);
  }

  beforeEach(callback) {
    this.preSpecs.push(callback);
  }

  afterEach(callback) {
    this.postSpecs.push(callback);
  }

  expect(actual) {
    return new Matcher(actual);
  }
}

Specish.defaultInstance = new Specish();

export const runSuite = (...args) => Specish.defaultInstance.runSuite(...args);
export const describe = (...args) => Specish.defaultInstance.describe(...args);
export const it = (...args) => Specish.defaultInstance.it(...args);
export const beforeEach = (...args) =>
  Specish.defaultInstance.beforeEach(...args);
export const afterEach = (...args) =>
  Specish.defaultInstance.afterEach(...args);
export const expect = (...args) => Specish.defaultInstance.expect(...args);

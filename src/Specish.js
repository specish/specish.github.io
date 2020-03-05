import Matcher from "./Matcher.js";
import RootSuite from "./RootSuite.js";
import Spec from "./Spec.js";
import Suite from "./Suite.js";

export default class Specish {
  constructor() {
    this.currentSuite = new RootSuite();
  }

  logStats(mockConsole) {
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
      specPass: description => {
        passing++;
        localConsole.log(`\u2713 ${description}`);
      },
      specFail: (description, message) => {
        failing++;
        localConsole.error(`${failing}) ${description}\n---> ${message}`);
      }
    });

    localConsole.log(`Passing: ${passing}`);
    if (failing) {
      localConsole.log(`Failing: ${failing} <---`);
    }
  }

  describe(description, callback) {
    const innerSuite = new Suite(description);
    this.currentSuite.addInnerSuite(innerSuite);

    const previousSuite = this.currentSuite;
    this.currentSuite = innerSuite;
    callback();
    this.currentSuite = previousSuite;
  }

  it(description, callback) {
    const spec = new Spec(description, callback);
    this.currentSuite.addSpec(spec);
  }

  beforeEach(callback) {
    this.currentSuite.addPreSpec(callback);
  }

  afterEach(callback) {
    this.currentSuite.addPostSpec(callback);
  }

  expect(actual) {
    return new Matcher(actual);
  }
}

Specish.defaultInstance = new Specish();

export const logStats = (...args) => Specish.defaultInstance.logStats(...args);
export const describe = (...args) => Specish.defaultInstance.describe(...args);
export const it = (...args) => Specish.defaultInstance.it(...args);
export const beforeEach = (...args) =>
  Specish.defaultInstance.beforeEach(...args);
export const afterEach = (...args) =>
  Specish.defaultInstance.afterEach(...args);
export const expect = (...args) => Specish.defaultInstance.expect(...args);

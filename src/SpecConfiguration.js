class BrowserConsoleSpecRunner {
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

  createPlatform() {
    return {
      describe: (...args) => this.describe(...args),
      it: (...args) => this.it(...args),
      expect: (...args) => this.expect(...args),
      beforeEach: (...args) => this.beforeEach(...args)
    };
  }

  static testSelf({ describe, it, expect, beforeEach }) {
    describe("BrowserConsoleSpecRunner", () => {
      // TODO: write tests for BrowserConsoleSpecRunner
    });
  }
}

export class SpecConfiguration {
  static testSelf({ describe, it, expect, beforeEach }) {
    BrowserConsoleSpecRunner.testSelf({ describe, it, expect, beforeEach });

    describe("SpecConfiguration", () => {
      // TODO: write tests for SpecConfiguration
    });
  }
}

SpecConfiguration.platform = new BrowserConsoleSpecRunner().createPlatform();

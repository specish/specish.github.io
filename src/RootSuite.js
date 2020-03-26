export default class RootSuite {
  constructor() {
    this.specs = [];
    this.innerSuites = [];
  }

  run(handler) {
    this.specs.forEach(spec => spec.run(handler));
    this.innerSuites.forEach(innerSuite => innerSuite.run(handler));
  }
}

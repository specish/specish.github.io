export default class RootSuite {
  constructor() {
    this.preSpecs = [];
    this.specs = [];
    this.postSpecs = [];
    this.innerSuites = [];
  }

  run(handler) {
    this.specs.forEach(spec => {
      this.preSpecs.forEach(preSpec => preSpec());
      spec.run(handler);
      this.postSpecs.forEach(postSpec => postSpec());
    });

    this.innerSuites.forEach(innerSuite => {
      this.preSpecs.forEach(preSpec => preSpec());
      innerSuite.run(handler);
      this.postSpecs.forEach(postSpec => postSpec());
    });
  }
}

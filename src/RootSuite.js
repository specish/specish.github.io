export default class RootSuite {
  constructor() {
    this.preSpecs = [];
    this.specs = [];
    this.postSpecs = [];
    this.innerSuites = [];
  }

  addPreSpec(callback) {
    this.preSpecs.push(callback);
  }

  addSpec(spec) {
    this.specs.push(spec);
  }

  addPostSpec(callback) {
    this.postSpecs.push(callback);
  }

  addInnerSuite(suite) {
    this.innerSuites.push(suite);
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

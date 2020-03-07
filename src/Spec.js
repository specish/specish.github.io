export default class Spec {
  constructor(description, callback) {
    this.description = description;
    this.callback = callback;
  }

  run({ specPass, specFail }) {
    try {
      this.callback();
      specPass(this.description);
    } catch (err) {
      specFail(this.description, err.message);
    }
  }
}

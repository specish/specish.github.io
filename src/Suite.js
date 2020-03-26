import RootSuite from "./RootSuite.js";

export default class Suite extends RootSuite {
  constructor(description, callback) {
    super();
    this.description = description;
    this.callback = callback;
  }

  run(handler) {
    handler.suiteStart(this.description);

    this.callback();

    super.run(handler);

    handler.suiteEnd();
  }
}

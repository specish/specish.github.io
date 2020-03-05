import RootSuite from "./RootSuite.js";

export default class Suite extends RootSuite {
  constructor(description) {
    super();
    this.description = description;
  }

  run(handler) {
    handler.suiteStart(this.description);

    super.run(handler);

    handler.suiteEnd();
  }
}

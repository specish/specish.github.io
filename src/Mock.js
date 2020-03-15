const resultType = {
  RETURN: "return",
  THROW: "throw",
  INCOMPLETE: "incomplete"
};

export default class Mock {
  constructor(implementation) {
    this.implementation = implementation;
    this.name = null;
    this.calls = [];
    this.results = [];
  }

  start(...args) {
    this.calls.push([...args]);
    this.results.push({ type: resultType.INCOMPLETE });
  }

  end(type, value) {
    const result = this.results[this.results.length - 1];
    result.type = type;
    result.value = value;
  }

  static fn(mockImplementation) {
    const f = (...args) => {
      f.mock.start(...args);
      try {
        const returnValue = f.mock.implementation(...args);
        f.mock.end(resultType.RETURN, returnValue);
        return returnValue;
      } catch (err) {
        f.mock.end(resultType.THROW, err);
        throw err;
      }
    };

    f.toString = () => (f.mock.name ? `mock ${f.mock.name}` : `mock`);

    f.mock = new Mock(mockImplementation || (() => {}));

    return f;
  }
}

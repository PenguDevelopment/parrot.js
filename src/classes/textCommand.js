class TextCommand {
  constructor(options) {
    this.name = options.name;
    this.description = options.description;
    this.args = options.args;
    this.execute = options.execute;
  }
}

export { TextCommand };

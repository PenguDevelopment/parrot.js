class ContextMenuCommand  {
    constructor(options) {
        this.name = options.name;
        this.permission = options.permission;
        this.name_localizations = options.name_localizations;
        this.description = options.description;
        this.description_localizations = options.description_localizations;
        this.execute = options.execute;
        this.args = options.args;
        this.type = options.type;
    }
}

export { ContextMenuCommand };
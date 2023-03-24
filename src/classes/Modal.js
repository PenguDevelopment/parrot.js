import { ModalBuilder, ActionRowBuilder, TextInputBuilder } from 'discord.js';

class Modal extends ModalBuilder {
    constructor() {
        super();
        this.fields = {};
    }

    async addFields(fields) {
        await fields.forEach(async (field) => {
            let id = field.id;
            let label = field.title;
            let placeholder = field.placeholder;
            let minLength = field.minLength;
            let maxLength = field.maxLength;
            let required = field.required;
            let style = field.style;

            let input = new TextInputBuilder();

            if (id) input.setCustomId(id);
            if (label) input.setLabel(label);
            if (placeholder) input.setPlaceholder(placeholder);
            if (minLength) input.setMinLength(minLength);
            if (maxLength) input.setMaxLength(maxLength);
            if (required) input.setRequired(required);
            if (style) input.setStyle(style);
            
            for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                    const element = fields[key];
                    this.fields[element.id] = element;
                }
            }

            let row = new ActionRowBuilder().addComponents(input);
            this.addComponents(row);
        })
    }

}

export { Modal };

import { ModalBuilder, ActionRowBuilder, TextInputBuilder } from "discord.js";

class Modal extends ModalBuilder {
  constructor() {
    super();
    this.fields = {};
  }

  async addFields(fields) {
    await fields.forEach(async (field) => {
      const id = field.id;
      const label = field.title;
      const placeholder = field.placeholder;
      const minLength = field.minLength;
      const maxLength = field.maxLength;
      const required = field.required;
      const style = field.style;

      const input = new TextInputBuilder();

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

      const row = new ActionRowBuilder().addComponents(input);
      this.addComponents(row);
    });
  }
}

export { Modal };

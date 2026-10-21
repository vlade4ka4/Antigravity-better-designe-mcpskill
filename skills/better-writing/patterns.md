# UX Writing Patterns
- **Destructive Confirmations**: `Delete '<Item Name>'?` + `This will permanently remove the item and all associated data. This action cannot be undone.` Buttons: `Cancel` (secondary), `Delete <Item>` (danger).
- **Empty States**: Explain what the section is for, and offer one clear primary action button to get started.
- **i18n & Pluralization**: Never concatenate strings with `+`. Use ICU plural syntax: `{count, plural, one {# item} other {# items}}`.

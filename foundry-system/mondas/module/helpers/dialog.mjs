/**
 * Extract form data from a DialogV2 callback.
 * Foundry v13 DialogV2 passes (event, button, dialog) — the form lives
 * inside the dialog element, not as a parent of the button.
 */
export function getDialogForm(event, button) {
  return button.form;
}

export function registerHandlebarsHelpers() {
  // Repeat a block N times
  Handlebars.registerHelper("times", function (n, block) {
    let result = "";
    for (let i = 0; i < n; i++) {
      result += block.fn(i);
    }
    return result;
  });

  // Check equality
  Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
  });

  // Less than
  Handlebars.registerHelper("lt", function (a, b) {
    return a < b;
  });

  // Check if array includes value
  Handlebars.registerHelper("includes", function (arr, val) {
    return Array.isArray(arr) && arr.includes(val);
  });

  // Localize an edge effect
  Handlebars.registerHelper("effectLabel", function (key) {
    return game.i18n.localize(`MONDAS.Edge.effect.${key}`);
  });

  // Localize a weapon die
  Handlebars.registerHelper("dieLabel", function (key) {
    return game.i18n.localize(`MONDAS.Weapon.die.${key}`);
  });

  // Localize a weapon property
  Handlebars.registerHelper("propertyLabel", function (key) {
    return game.i18n.localize(`MONDAS.Weapon.property.${key}`);
  });

  // Subtract
  Handlebars.registerHelper("subtract", function (a, b) {
    return a - b;
  });

  // Return "checked" attribute string if value is truthy
  Handlebars.registerHelper("checked", function (val) {
    return val ? "checked" : "";
  });

}

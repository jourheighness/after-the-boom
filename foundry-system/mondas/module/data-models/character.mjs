const fields = foundry.data.fields;

function harmSlot() {
  return new fields.SchemaField({
    filled: new fields.BooleanField({ initial: false }),
    text: new fields.StringField({ initial: "" }),
  });
}

export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      // Stats (1-4, sum = 6)
      stats: new fields.SchemaField({
        grit: new fields.NumberField({ required: true, initial: 1, min: 1, max: 4, integer: true }),
        sharp: new fields.NumberField({ required: true, initial: 1, min: 1, max: 4, integer: true }),
        nerve: new fields.NumberField({ required: true, initial: 1, min: 1, max: 4, integer: true }),
      }),

      // Guard
      guard: new fields.SchemaField({
        value: new fields.NumberField({ required: true, initial: 4, min: 0, integer: true }),
        max: new fields.NumberField({ required: true, initial: 4, min: 0, max: 10, integer: true }),
      }),

      // Drain (4 boxes)
      drain: new fields.SchemaField({
        value: new fields.NumberField({ required: true, initial: 4, min: 0, max: 4, integer: true }),
      }),

      // Harm tracks (2 slots each)
      harm: new fields.SchemaField({
        hurt: new fields.SchemaField({ slot1: harmSlot(), slot2: harmSlot() }),
        wounded: new fields.SchemaField({ slot1: harmSlot(), slot2: harmSlot() }),
        critical: new fields.SchemaField({ slot1: harmSlot(), slot2: harmSlot() }),
      }),

      // Conditions
      conditions: new fields.SchemaField({
        stunned: new fields.BooleanField({ initial: false }),
        shaken: new fields.BooleanField({ initial: false }),
        prone: new fields.BooleanField({ initial: false }),
      }),

      // Armor
      armor: new fields.NumberField({ required: true, initial: 0, min: 0, max: 3, integer: true }),

      // Scars
      scars: new fields.NumberField({ required: true, initial: 0, min: 0, integer: true }),

      // Background
      background: new fields.StringField({ initial: "" }),

      // Edges — inline array
      edges: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        effect: new fields.StringField({ initial: "boon", choices: ["boon", "gambit", "thaumic", "narrative"] }),
      })),

      // Weapons — inline array
      weapons: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        die: new fields.StringField({ initial: "d8", choices: ["d6", "d8", "d10", "d12"] }),
        properties: new fields.ArrayField(new fields.StringField({
          choices: ["ranged", "sidearm", "thrown", "area", "long", "loud", "brutal", "subtle", "slow"],
        })),
      })),

      // Equipment — inline array
      equipment: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        quantity: new fields.NumberField({ initial: 1, min: 0, integer: true }),
      })),
    };
  }

  /** Derived data: guard max, cracked state */
  prepareDerivedData() {
    const stats = this.stats;
    const highestStat = Math.max(stats.grit, stats.sharp, stats.nerve);
    this.guard.max = 2 + highestStat + this.scars;
    this.cracked = this.drain.value === 0;
  }
}

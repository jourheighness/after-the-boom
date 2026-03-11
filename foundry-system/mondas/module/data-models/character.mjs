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

      // Guard — value = boxes checked (spent), starts at 0
      guard: new fields.SchemaField({
        value: new fields.NumberField({ required: true, initial: 0, min: 0, integer: true }),
        max: new fields.NumberField({ required: true, initial: 4, min: 0, integer: true }),
      }),

      // Drain — value = boxes checked (spent), starts at 0
      drain: new fields.SchemaField({
        value: new fields.NumberField({ required: true, initial: 0, min: 0, max: 4, integer: true }),
        max: new fields.NumberField({ required: true, initial: 4, min: 0, max: 4, integer: true }),
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

      // Scars — array of descriptions
      scars: new fields.ArrayField(new fields.StringField({ initial: "" })),

      // Background
      background: new fields.StringField({ initial: "" }),

      // Notes (rich text, shown in Notes tab)
      notes: new fields.HTMLField({ initial: "" }),

      // Last used weapon index for combat roll default (-1 = none yet)
      lastWeaponIndex: new fields.NumberField({ initial: -1, integer: true }),

      // Setup die — banked Boon from a Setup gambit (one at a time)
      setupDie: new fields.SchemaField({
        active: new fields.BooleanField({ initial: false }),
        value: new fields.NumberField({ initial: 0, min: 0, max: 6, integer: true }),
        source: new fields.StringField({ initial: "" }),
      }),

      // Edges — inline array with optional gambit
      edges: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        mechanical: new fields.StringField({ initial: "" }),
        gambitName: new fields.StringField({ initial: "" }),
        gambitDesc: new fields.StringField({ initial: "" }),
      })),

      // Weapons — inline array with optional gambit
      weapons: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        die: new fields.StringField({ initial: "d8", choices: ["d6", "d8", "d10", "d12", "sd4", "sd6", "sd8", "sd10"] }),
        properties: new fields.ArrayField(new fields.StringField({
          choices: ["ranged", "sidearm", "thrown", "area", "long", "loud", "brutal", "subtle", "slow"],
        })),
        gambitName: new fields.StringField({ initial: "" }),
        gambitDesc: new fields.StringField({ initial: "" }),
        thaumic: new fields.BooleanField({ initial: false }),
        quantity: new fields.NumberField({ initial: 1, min: 0, integer: true }),
      })),

      // Tracked dice — sustained effects, displayed in die-tracking strip
      trackedDice: new fields.ArrayField(new fields.SchemaField({
        die: new fields.StringField({ initial: "d6s" }),
        label: new fields.StringField({ initial: "" }),
        type: new fields.StringField({ initial: "sustained-enemy", choices: ["sustained-self", "sustained-enemy"] }),
      })),

      // Equipment — inline array with tags, optional gambit, optional armor
      equipment: new fields.ArrayField(new fields.SchemaField({
        name: new fields.StringField({ initial: "" }),
        description: new fields.StringField({ initial: "" }),
        quantity: new fields.NumberField({ initial: 1, min: 0, integer: true }),
        armorValue: new fields.NumberField({ initial: 0, min: 0, max: 3, integer: true }),
        tags: new fields.ArrayField(new fields.StringField()),
        gambitName: new fields.StringField({ initial: "" }),
        gambitDesc: new fields.StringField({ initial: "" }),
      })),
    };
  }

  /** Derived data: guard max, armor, harm states, auto-snags, weapon choices */
  prepareDerivedData() {
    const stats = this.stats;
    const highestStat = Math.max(stats.grit, stats.sharp, stats.nerve);
    this.guard.max = 2 + highestStat + this.scars.length;
    if (this.guard.value > this.guard.max) this.guard.value = this.guard.max;
    this.cracked = this.drain.value >= this.drain.max;

    // Armor derived from equipment
    this.armor = Math.min(3,
      (this.equipment ?? []).reduce((sum, e) => sum + (e.armorValue || 0), 0),
    );

    // Harm-level booleans
    this.wounded = this.harm.wounded.slot1.filled || this.harm.wounded.slot2.filled;
    this.critical = this.harm.critical.slot1.filled || this.harm.critical.slot2.filled;
    this.incapacitated = this.wounded && this.drain.value >= this.drain.max;
    this.mustSpendDrain = this.critical;

    // Auto-snags: array of {source, applies}
    this.autoSnags = [];
    if (this.wounded) this.autoSnags.push({ source: "Wounded", applies: "all" });
    if (this.conditions.shaken) this.autoSnags.push({ source: "Shaken", applies: "all" });
    if (this.cracked) this.autoSnags.push({ source: "Cracked", applies: "all" });
    if (this.conditions.prone) this.autoSnags.push({ source: "Prone", applies: "combat" });

    // Weapon choices: Unarmed + weapons sorted by die size desc
    const DIE_ORDER = { d12: 4, d10: 3, d8: 2, d6: 1 };
    const unarmed = {
      name: "Unarmed", die: "d6", properties: [],
      thaumic: false, gambitName: "", gambitDesc: "",
      description: "",
    };
    const sorted = [...(this.weapons ?? [])].sort(
      (a, b) => (DIE_ORDER[b.die] || 0) - (DIE_ORDER[a.die] || 0),
    );
    this.weaponChoices = [unarmed, ...sorted];

    // Default weapon selection: last used, or first (highest die)
    const lastIdx = this.lastWeaponIndex ?? -1;
    if (lastIdx >= 0 && lastIdx < this.weaponChoices.length) {
      this.defaultWeaponIndex = lastIdx;
    } else {
      this.defaultWeaponIndex = 0;
    }
  }
}

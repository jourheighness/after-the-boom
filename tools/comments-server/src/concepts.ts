import type Database from 'better-sqlite3';
import { upsertConcept } from './db.ts';

export interface CuratedConcept {
  name: string;
  aliases: string[];
}

/** Seed list of curated game concepts with known aliases. */
export const CURATED_CONCEPTS: CuratedConcept[] = [
  // Resource tracks
  { name: 'Guard', aliases: ['body buffer', 'guard points'] },
  { name: 'Drain', aliases: ['will buffer', 'drain track'] },

  // Gambit verbs
  { name: 'Push', aliases: ['push gambit'] },
  { name: 'Pull', aliases: ['pull gambit'] },
  { name: 'Pin', aliases: ['pin gambit'] },
  { name: 'Read', aliases: ['read gambit'] },
  { name: 'Cover', aliases: ['cover gambit'] },
  { name: 'Setup', aliases: ['setup gambit'] },
  { name: 'Break', aliases: ['break gambit'] },

  // Gambit system
  { name: 'Gambit', aliases: ['gambits'] },
  { name: 'Boon', aliases: ['boons'] },
  { name: 'Snag', aliases: ['snags'] },

  // Consequence states
  { name: 'Scar', aliases: ['scarred', 'guard hits 0'] },
  { name: 'Crack', aliases: ['cracked', 'drain empties'] },
  { name: 'Break State', aliases: ['innate overload', 'broken'] },

  // Thaumic spectrum
  { name: 'Shaper', aliases: ['shapers', 'shaping'] },
  { name: 'Sparked', aliases: ['spark'] },
  { name: 'Knack', aliases: ['knacks'] },
  { name: 'Mundane', aliases: [] },
  { name: 'Tell', aliases: ['tells'] },
  { name: 'Resonance', aliases: ['resonances'] },

  // Stats
  { name: 'Grit', aliases: [] },
  { name: 'Sharp', aliases: [] },
  { name: 'Nerve', aliases: [] },
  { name: 'Flair', aliases: [] },

  // Character
  { name: 'Edge', aliases: ['edges', 'character ability'] },
  { name: 'Temporary Edge', aliases: ['temp edge'] },
  { name: 'Untapped Potential', aliases: [] },

  // Combat
  { name: 'Threat', aliases: ['threat level', 'enemy difficulty'] },
  { name: 'Harm', aliases: [] },
  { name: 'Condition', aliases: ['conditions'] },
  { name: 'Stunned', aliases: [] },
  { name: 'Shaken', aliases: [] },
  { name: 'Prone', aliases: [] },

  // World/Tech
  { name: 'BTC', aliases: ['background thaumic count'] },
  { name: 'Leyline', aliases: ['leylines', 'ley line'] },
  { name: 'Siphon', aliases: ['siphons'] },
  { name: 'Device Gambit', aliases: ['device gambits'] },

  // Roll types
  { name: 'Combat Roll', aliases: [] },
  { name: 'Stakes Roll', aliases: [] },
  { name: 'Assist', aliases: ['assist action'] },
  { name: 'Save', aliases: ['saves', 'save roll'] },
];

/** Insert curated concepts into the DB if not already present. */
export function seedConcepts(db: Database.Database): void {
  for (const c of CURATED_CONCEPTS) {
    upsertConcept(db, c.name, c.aliases.join(',') || undefined, true);
  }
}

/**
 * Find known concept names mentioned in text content.
 * Returns concept names that appear in the text (case-insensitive word boundary match).
 */
export function detectConcepts(content: string, existingConcepts: string[]): string[] {
  const found: string[] = [];

  for (const name of existingConcepts) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escaped + '\\b', 'i');
    if (regex.test(content)) {
      found.push(name);
    }
  }

  return found;
}

/**
 * Auto-detect potential new concepts from headings and bold terms.
 * Returns candidate names that aren't in the existing concept list.
 */
export function autoDetectNewConcepts(
  heading: string,
  content: string,
  existingNames: Set<string>,
): string[] {
  const candidates = new Set<string>();

  // Short, capitalized headings (2-4 words) that look like mechanic names
  if (heading) {
    const words = heading.trim().split(/\s+/);
    if (words.length <= 4 && /^[A-Z]/.test(heading.trim())) {
      const name = heading.trim();
      if (!existingNames.has(name) && !isCommonEnglish(name)) {
        candidates.add(name);
      }
    }
  }

  // **Bold terms** in rules files
  const boldPattern = /\*\*([^*]+)\*\*/g;
  let match;
  while ((match = boldPattern.exec(content)) !== null) {
    const term = match[1].trim();
    if (term.split(/\s+/).length <= 3 && !existingNames.has(term) && !isCommonEnglish(term)) {
      candidates.add(term);
    }
  }

  return Array.from(candidates);
}

const COMMON_WORDS = new Set([
  'The', 'This', 'That', 'These', 'Those', 'What', 'When', 'Where', 'How', 'Why',
  'Note', 'Example', 'Important', 'Warning', 'Tip', 'Summary', 'Overview',
  'Rules', 'Rule', 'Table', 'List', 'Step', 'Option', 'Options',
  'Player', 'Players', 'Character', 'Characters', 'GM', 'DM',
  'Action', 'Actions', 'Turn', 'Turns', 'Round', 'Rounds',
  'Yes', 'No', 'True', 'False', 'None', 'All', 'Some', 'Any',
  'Result', 'Results', 'Effect', 'Effects', 'Cost', 'Costs',
  'Damage', 'Attack', 'Defense', 'Roll', 'Rolls', 'Dice', 'Die',
]);

function isCommonEnglish(term: string): boolean {
  return COMMON_WORDS.has(term) || COMMON_WORDS.has(term.toLowerCase());
}

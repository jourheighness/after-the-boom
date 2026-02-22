#!/usr/bin/env python3
"""Combat calculator for After the Boom. Reads stat blocks from markdown files."""

import re
import sys
import random
import os


# MONDAS ↔ 5e attribute mapping
MONDAS_TO_5E = {'MUS': 'STR', 'REF': 'DEX', 'GRI': 'CON', 'SMA': 'INT', 'SEN': 'WIS', 'PRE': 'CHA'}
E5_TO_MONDAS = {v: k for k, v in MONDAS_TO_5E.items()}
ALL_ATTRS = list(MONDAS_TO_5E.keys()) + list(MONDAS_TO_5E.values())

# Skill → attribute mapping (MONDAS names)
SKILL_TO_ATTR = {
    'athletics': 'MUS', 'intimidation': 'MUS',
    'acrobatics': 'REF', 'stealth': 'REF', 'sleight of hand': 'REF',
    'endurance': 'GRI',
    'arcana': 'SMA', 'history': 'SMA', 'investigation': 'SMA',
    'search': 'SMA', 'thaumatech': 'SMA', 'savvy': 'SMA',
    'awareness': 'SEN', 'insight': 'SEN', 'medicine': 'SEN',
    'perception': 'SEN', 'survival': 'SEN', 'animal handling': 'SEN',
    'resonance': 'SEN',
    'deception': 'PRE', 'performance': 'PRE', 'persuasion': 'PRE',
    'pressure': 'PRE', 'lie': 'PRE', 'creativity': 'PRE',
}


def roll_dice(expr):
    """Roll a dice expression like 1d20+4, 2d6+3, 1d8+1d6+2. Returns (breakdown, total)."""
    parts = re.findall(r'([+-]?)(\d*)d(\d+)|([+-]?\d+)', expr.replace(' ', ''))
    breakdown = []
    total = 0

    for match in parts:
        sign_d, count_d, sides_d, flat = match
        if sides_d:
            sign = -1 if sign_d == '-' else 1
            count = int(count_d) if count_d else 1
            rolls = [random.randint(1, int(sides_d)) for _ in range(count)]
            subtotal = sum(rolls) * sign
            total += subtotal
            roll_str = ','.join(str(r) for r in rolls)
            if count == 1:
                breakdown.append(f"[{rolls[0]}]")
            else:
                breakdown.append(f"[{roll_str}]")
        elif flat:
            val = int(flat)
            total += val
            if val >= 0:
                breakdown.append(f"+{val}" if breakdown else str(val))
            else:
                breakdown.append(str(val))

    return ' '.join(breakdown), total


def normalize_attr(attr):
    """Normalize attribute name to MONDAS convention."""
    attr = attr.upper().strip()
    if attr in MONDAS_TO_5E:
        return attr
    if attr in E5_TO_MONDAS:
        return E5_TO_MONDAS[attr]
    return attr


def parse_stat_block(content, name=None):
    """Parse a creature/character stat block from markdown content.

    If name is provided, finds that specific stat block.
    Returns dict with attrs, saves, skills, attacks, ac, hp, speed, prof, drain.
    """
    blocks = content

    # If name given, find the section
    if name:
        # Try to find a heading matching the name (any heading level)
        pattern = re.compile(
            r'^#{1,4}\s+.*?' + re.escape(name) + r'.*?$',
            re.IGNORECASE | re.MULTILINE
        )
        match = pattern.search(blocks)
        if not match:
            raise ValueError(f"Could not find stat block for '{name}'")

        start = match.start()
        # Find next heading of same or higher level
        heading_level = match.group().count('#', 0, 4)
        next_heading = re.search(
            r'^#{1,' + str(heading_level) + r'}\s',
            blocks[match.end():],
            re.MULTILINE
        )
        end = match.end() + next_heading.start() if next_heading else len(blocks)
        blocks = blocks[start:end]

    stats = {
        'name': name or 'Unknown',
        'attrs': {},
        'saves': {},
        'skills': {},
        'attacks': [],
        'prof': 2,
        'ac': 10,
        'hp': 0,
        'drain': None,
    }

    # Parse attribute table: | MUS | REF | GRI | SMA | SEN | PRE |
    attr_header = re.search(
        r'\|\s*(MUS|STR)\s*\|\s*(REF|DEX)\s*\|\s*(GRI|CON)\s*\|\s*(SMA|INT)\s*\|\s*(SEN|WIS)\s*\|\s*(PRE|CHA)\s*\|',
        blocks, re.IGNORECASE
    )
    if attr_header:
        # Skip separator row, get values row
        after = blocks[attr_header.end():]
        rows = after.strip().split('\n')
        for row in rows:
            if '|-' in row or not row.strip():
                continue
            cells = [c.strip() for c in row.split('|') if c.strip()]
            if len(cells) >= 6:
                attr_names = ['MUS', 'REF', 'GRI', 'SMA', 'SEN', 'PRE']
                for i, cell in enumerate(cells[:6]):
                    # Parse "14 (+2)" or just "14"
                    m = re.match(r'(\d+)\s*\(([+-]\d+)\)', cell)
                    if m:
                        stats['attrs'][attr_names[i]] = {
                            'score': int(m.group(1)),
                            'mod': int(m.group(2))
                        }
                    else:
                        try:
                            score = int(cell)
                            stats['attrs'][attr_names[i]] = {
                                'score': score,
                                'mod': (score - 10) // 2
                            }
                        except ValueError:
                            pass
                break

    # Parse stat table for AC, HP, Prof, Drain
    stat_line = re.search(r'\*\*AC\*\*\s*(\d+)', blocks)
    if stat_line:
        stats['ac'] = int(stat_line.group(1))

    hp_match = re.search(r'\*\*HP\*\*\s*(\d+)', blocks)
    if hp_match:
        stats['hp'] = int(hp_match.group(1))

    prof_match = re.search(r'\*\*Prof\*\*\s*\+(\d+)', blocks)
    if prof_match:
        stats['prof'] = int(prof_match.group(1))

    drain_match = re.search(r'\*\*Drain\*\*\s*(\d+)/(\d+)', blocks)
    if drain_match:
        stats['drain'] = {'current': int(drain_match.group(1)), 'max': int(drain_match.group(2))}

    # Also check the stat/value table format
    for row in re.finditer(r'\|\s*(\w+)\s*\|\s*(.+?)\s*\|', blocks):
        key, val = row.group(1).strip(), row.group(2).strip()
        if key == 'AC':
            m = re.match(r'(\d+)', val)
            if m:
                stats['ac'] = int(m.group(1))
        elif key == 'HP':
            m = re.match(r'(\d+)', val)
            if m:
                stats['hp'] = int(m.group(1))
        elif key == 'Prof':
            m = re.match(r'\+?(\d+)', val)
            if m:
                stats['prof'] = int(m.group(1))
        elif key == 'Drain':
            m = re.match(r'(\d+)/(\d+)', val)
            if m:
                stats['drain'] = {'current': int(m.group(1)), 'max': int(m.group(2))}

    # Parse saves: **Saves:** REF +4, SEN +3
    saves_match = re.search(r'\*\*Saves?:\*\*\s*(.+?)(?:\n|$)', blocks)
    if saves_match:
        for s in re.finditer(r'(\w+)\s*\+(\d+)', saves_match.group(1)):
            attr = normalize_attr(s.group(1))
            stats['saves'][attr] = int(s.group(2))

    # Parse skills: **Skills:** Awareness +3, Search +3
    skills_match = re.search(r'\*\*Skills?:\*\*\s*(.+?)(?:\n|$)', blocks)
    if skills_match:
        for s in re.finditer(r'([\w\s]+?)\s*\+(\d+)', skills_match.group(1)):
            skill_name = s.group(1).strip().lower()
            stats['skills'][skill_name] = int(s.group(2))

    # Parse attacks table
    attack_section = re.search(r'###?\s*Attacks?\s*\n', blocks, re.IGNORECASE)
    if not attack_section:
        attack_section = re.search(r'\|\s*Attack\s*\|\s*Hit\s*\|\s*Damage\s*\|\s*Notes\s*\|', blocks, re.IGNORECASE)

    if attack_section:
        after = blocks[attack_section.end():]
        for row in after.split('\n'):
            if '|-' in row or not row.strip():
                continue
            if row.strip().startswith('#') or (row.strip().startswith('**') and '|' not in row):
                break
            cells = [c.strip() for c in row.split('|')]
            cells = [c for c in cells if c]
            if len(cells) >= 3 and cells[0].lower() not in ('attack', ''):
                attack = {
                    'name': cells[0],
                    'hit': cells[1] if len(cells) > 1 else '',
                    'damage': cells[2] if len(cells) > 2 else '',
                    'notes': cells[3] if len(cells) > 3 else '',
                }
                stats['attacks'].append(attack)

    return stats


def cmd_attack(filepath, name, attack_name):
    """Roll an attack from a stat block."""
    with open(filepath) as f:
        content = f.read()

    stats = parse_stat_block(content, name)

    # Find the attack
    attack = None
    for a in stats['attacks']:
        if attack_name.lower() in a['name'].lower():
            attack = a
            break

    if not attack:
        available = ', '.join(a['name'] for a in stats['attacks'])
        print(f"Attack '{attack_name}' not found for {name}.")
        if available:
            print(f"Available: {available}")
        sys.exit(1)

    # Parse hit bonus
    hit_match = re.match(r'\+(\d+)', attack['hit'])
    if hit_match:
        bonus = int(hit_match.group(1))
        atk_roll = random.randint(1, 20)
        atk_total = atk_roll + bonus
        crit = atk_roll == 20
        fumble = atk_roll == 1

        result = f"Attack ({attack['name']}): 1d20+{bonus} = [{atk_roll}]+{bonus} = {atk_total}"
        if crit:
            result += " CRITICAL!"
        elif fumble:
            result += " FUMBLE!"

        # Roll damage if there's a damage expression
        if attack['damage'] and attack['damage'] != '--':
            dmg_expr = attack['damage']
            dmg_breakdown, dmg_total = roll_dice(dmg_expr)
            result += f"\nDamage: {dmg_expr} = {dmg_breakdown} = {dmg_total}"
            if crit:
                # Double dice on crit
                crit_breakdown, crit_extra = roll_dice(dmg_expr)
                result += f"\nCrit bonus: {crit_breakdown} = {crit_extra}"
                result += f"\nTotal crit damage: {dmg_total + crit_extra}"

        if attack['notes']:
            result += f"\nNotes: {attack['notes']}"

        print(result)
    else:
        # DC-based attack
        print(f"Attack ({attack['name']}): {attack['hit']}")
        if attack['damage'] and attack['damage'] != '--':
            dmg_breakdown, dmg_total = roll_dice(attack['damage'])
            print(f"Damage: {attack['damage']} = {dmg_breakdown} = {dmg_total}")
        if attack['notes']:
            print(f"Notes: {attack['notes']}")


def cmd_save(filepath, name, attr):
    """Roll a saving throw."""
    with open(filepath) as f:
        content = f.read()

    stats = parse_stat_block(content, name)
    attr = normalize_attr(attr)

    if attr in stats['saves']:
        bonus = stats['saves'][attr]
    elif attr in stats['attrs']:
        bonus = stats['attrs'][attr]['mod']
    else:
        print(f"Attribute '{attr}' not found for {name}.")
        sys.exit(1)

    roll = random.randint(1, 20)
    total = roll + bonus
    print(f"Save ({attr}): 1d20+{bonus} = [{roll}]+{bonus} = {total}")


def cmd_check(filepath, name, skill):
    """Roll a skill check."""
    with open(filepath) as f:
        content = f.read()

    stats = parse_stat_block(content, name)
    skill_lower = skill.lower().strip()

    if skill_lower in stats['skills']:
        bonus = stats['skills'][skill_lower]
    elif skill_lower in SKILL_TO_ATTR:
        attr = SKILL_TO_ATTR[skill_lower]
        if attr in stats['attrs']:
            bonus = stats['attrs'][attr]['mod']
        else:
            print(f"No attribute data for skill '{skill}'.")
            sys.exit(1)
    else:
        # Try as raw attribute
        attr = normalize_attr(skill)
        if attr in stats['attrs']:
            bonus = stats['attrs'][attr]['mod']
        else:
            print(f"Skill '{skill}' not found for {name}.")
            print(f"Known skills: {', '.join(stats['skills'].keys())}")
            sys.exit(1)

    roll = random.randint(1, 20)
    total = roll + bonus
    print(f"Check ({skill}): 1d20+{bonus} = [{roll}]+{bonus} = {total}")


def cmd_drain(filepath, name, action):
    """Show drain cost for a thaumic action."""
    with open(filepath) as f:
        content = f.read()

    stats = parse_stat_block(content, name)

    # Search for drain cost in attack notes or the stat block text
    drain_info = stats.get('drain')
    if drain_info:
        print(f"Current Drain: {drain_info['current']}/{drain_info['max']}")

    # Search for the action in attacks
    for a in stats['attacks']:
        if action.lower() in a['name'].lower() or action.lower() in a['notes'].lower():
            # Look for drain cost in notes
            drain_match = re.search(r'(\d+)\s*drain', a['notes'], re.IGNORECASE)
            if drain_match:
                cost = int(drain_match.group(1))
                print(f"Action: {a['name']} → Drain cost: {cost}")
                if drain_info:
                    remaining = drain_info['current'] - cost
                    print(f"After use: {remaining}/{drain_info['max']}" +
                          (" (TAPPED OUT!)" if remaining <= 0 else ""))
                return

    print(f"No drain cost found for action '{action}' on {name}.")
    print("Check attack names/notes for drain references.")


def cmd_init(*filepaths_and_names):
    """Roll initiative for multiple combatants. Args: file1 name1 file2 name2 ..."""
    pairs = []
    i = 0
    args = list(filepaths_and_names)
    while i < len(args):
        filepath = args[i]
        name = args[i + 1] if i + 1 < len(args) else None
        pairs.append((filepath, name))
        i += 2

    results = []
    for filepath, name in pairs:
        with open(filepath) as f:
            content = f.read()

        try:
            stats = parse_stat_block(content, name)
            ref_mod = stats['attrs'].get('REF', {}).get('mod', 0)
            roll = random.randint(1, 20)
            total = roll + ref_mod
            display_name = name or os.path.basename(filepath).replace('.md', '')
            results.append((total, roll, ref_mod, display_name))
        except (ValueError, KeyError) as e:
            display_name = name or os.path.basename(filepath).replace('.md', '')
            results.append((0, 0, 0, f"{display_name} (ERROR: {e})"))

    # Sort by total descending
    results.sort(key=lambda x: x[0], reverse=True)

    print("INITIATIVE ORDER:")
    for i, (total, roll, mod, name) in enumerate(results, 1):
        sign = '+' if mod >= 0 else ''
        print(f"  {i}. {name}: [{roll}]{sign}{mod} = {total}")


def usage():
    print("""Usage: calc.py <command> <file> [name] [args...]

Commands:
  attack <file> <name> <attack_name>  Roll attack + damage
  save   <file> <name> <attribute>    Roll saving throw
  check  <file> <name> <skill>        Roll skill check
  drain  <file> <name> <action>       Show drain cost
  init   <file> <name> [file name...] Roll initiative

Name can be omitted for single-stat-block files (PCs).
For encounters.md, provide the creature name (e.g. "Street Tough").

Attributes: MUS/REF/GRI/SMA/SEN/PRE (or STR/DEX/CON/INT/WIS/CHA)""")
    sys.exit(1)


def main():
    if len(sys.argv) < 3:
        usage()

    cmd = sys.argv[1].lower()

    if cmd == 'init':
        cmd_init(*sys.argv[2:])
    elif cmd == 'attack':
        if len(sys.argv) < 5:
            print("Usage: calc.py attack <file> <name> <attack_name>")
            sys.exit(1)
        cmd_attack(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == 'save':
        if len(sys.argv) < 5:
            print("Usage: calc.py save <file> <name> <attribute>")
            sys.exit(1)
        cmd_save(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == 'check':
        if len(sys.argv) < 5:
            print("Usage: calc.py check <file> <name> <skill>")
            sys.exit(1)
        cmd_check(sys.argv[2], sys.argv[3], sys.argv[4])
    elif cmd == 'drain':
        if len(sys.argv) < 5:
            print("Usage: calc.py drain <file> <name> <action>")
            sys.exit(1)
        cmd_drain(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        print(f"Unknown command: {cmd}")
        usage()


if __name__ == '__main__':
    main()

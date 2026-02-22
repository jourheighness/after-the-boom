#!/usr/bin/env python3
"""Dice roller with real randomness for After the Boom TTRPG sessions."""

import random
import re
import sys


def roll_dice(count, sides):
    """Roll count dice with given sides, return list of results."""
    return [random.randint(1, sides) for _ in range(count)]


def parse_and_roll(expr):
    """Parse a dice expression and return (rolls, modifier, total, description).

    Supports: 2d6+3, 4d6kh3, 2d20kl1, d100, adv, dis
    """
    expr = expr.strip().lower()

    # Aliases
    if expr == 'adv':
        expr = '2d20kh1'
    elif expr == 'dis':
        expr = '2d20kl1'

    # Pattern: [count]d<sides>[kh<n>|kl<n>][+/-mod]
    m = re.match(r'^(\d*)d(\d+)(kh(\d+)|kl(\d+))?(([+-]\d+)?)$', expr)
    if not m:
        raise ValueError(f"Invalid dice expression: {expr}")

    count = int(m.group(1)) if m.group(1) else 1
    sides = int(m.group(2))
    keep_high = int(m.group(4)) if m.group(4) else None
    keep_low = int(m.group(5)) if m.group(5) else None
    modifier = int(m.group(6)) if m.group(6) else 0

    rolls = roll_dice(count, sides)
    kept = rolls[:]

    desc_parts = []

    if keep_high is not None:
        kept = sorted(rolls, reverse=True)[:keep_high]
        dropped = sorted(rolls, reverse=True)[keep_high:]
        desc_parts.append(f"rolled {rolls} → kept highest {keep_high}: {kept}")
    elif keep_low is not None:
        kept = sorted(rolls)[:keep_low]
        dropped = sorted(rolls)[keep_low:]
        desc_parts.append(f"rolled {rolls} → kept lowest {keep_low}: {kept}")
    else:
        desc_parts.append(f"{rolls}")

    subtotal = sum(kept)
    total = subtotal + modifier

    if modifier > 0:
        desc_parts.append(f"+{modifier}")
    elif modifier < 0:
        desc_parts.append(f"{modifier}")

    return rolls, kept, modifier, total, desc_parts


def format_result(label, expr, rolls, kept, modifier, total, desc_parts):
    """Format a roll result for display."""
    parts = []
    if label:
        parts.append(f"{label}: ")

    parts.append(f"{expr} = ")

    if len(rolls) > 1 or modifier != 0:
        # Show breakdown
        if kept != rolls:
            parts.append(f"{desc_parts[0]}")
        else:
            parts.append(f"{kept}")

        if modifier > 0:
            parts.append(f" + {modifier}")
        elif modifier < 0:
            parts.append(f" - {abs(modifier)}")

        parts.append(f" = {total}")
    else:
        parts.append(f"[{rolls[0]}]")
        if modifier != 0:
            if modifier > 0:
                parts.append(f" + {modifier} = {total}")
            else:
                parts.append(f" - {abs(modifier)} = {total}")

    return ''.join(parts)


def main():
    if len(sys.argv) < 2:
        print("Usage: roll.py <expr> [expr2] ...")
        print("  Examples: 2d6+3  4d6kh3  1d20+5  adv  dis  d100")
        print("  Labels:   attack:1d20+5  damage:2d6+3")
        sys.exit(1)

    results = []
    for arg in sys.argv[1:]:
        label = None
        expr = arg

        if ':' in arg and not re.match(r'^d\d', arg):
            label, expr = arg.split(':', 1)

        try:
            rolls, kept, modifier, total, desc_parts = parse_and_roll(expr)
            results.append(format_result(label, expr, rolls, kept, modifier, total, desc_parts))
        except ValueError as e:
            results.append(str(e))

    for r in results:
        print(r)


if __name__ == '__main__':
    main()

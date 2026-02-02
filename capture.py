#!/usr/bin/env python3
"""
Content Capture Inbox - Quick capture links, export to Claude for post generation.
"""

import json
import sys
from datetime import datetime
from pathlib import Path
import uuid

CAPTURES_DIR = Path(__file__).parent / "captures"
CAPTURES_FILE = CAPTURES_DIR / "captures.json"


def ensure_storage():
    CAPTURES_DIR.mkdir(exist_ok=True)
    if not CAPTURES_FILE.exists():
        CAPTURES_FILE.write_text("[]")


def load_captures() -> list:
    ensure_storage()
    return json.loads(CAPTURES_FILE.read_text())


def save_captures(captures: list):
    ensure_storage()
    CAPTURES_FILE.write_text(json.dumps(captures, indent=2, default=str))


def add(url: str, notes: str):
    """Quick add - just URL and notes."""
    captures = load_captures()
    capture = {
        "id": str(uuid.uuid4())[:8],
        "url": url,
        "notes": notes,
        "captured_at": datetime.now().isoformat(),
    }
    captures.append(capture)
    save_captures(captures)
    print(f"+ [{capture['id']}] {url}")
    return capture


def inbox():
    """Show all captures as a Claude-ready prompt."""
    captures = load_captures()
    if not captures:
        print("Inbox empty.")
        return

    print("=" * 60)
    print("COPY BELOW INTO CLAUDE")
    print("=" * 60)
    print()
    print("Here are articles/links I've captured. For each one, write me a LinkedIn post (engaging, concise, with relevant hashtags) based on my notes about why it's valuable:\n")

    for c in captures:
        print(f"---")
        print(f"URL: {c['url']}")
        print(f"My notes: {c['notes']}")
        print(f"Captured: {c['captured_at'][:10]}")
        print()

    print("---")
    print("\nWrite a LinkedIn post for each. Make them authentic, not generic. Use my notes to understand the angle I want.")


def export_one(capture_id: str):
    """Export single capture as Claude prompt."""
    captures = load_captures()
    capture = next((c for c in captures if c["id"] == capture_id), None)

    if not capture:
        print(f"Not found: {capture_id}")
        return

    print("=" * 60)
    print("COPY BELOW INTO CLAUDE")
    print("=" * 60)
    print()
    print(f"""I found this article/link that I want to share:

URL: {capture['url']}

My notes on why this is valuable and the angle I want to take:
{capture['notes']}

Write me:
1. A LinkedIn post (engaging, authentic, with hashtags)
2. A Medium article outline if this could be expanded into longer content

Use my notes to understand what resonated with me and the angle I want to take.""")


def ls():
    """List all captures."""
    captures = load_captures()
    if not captures:
        print("Inbox empty.")
        return

    for c in sorted(captures, key=lambda x: x["captured_at"], reverse=True):
        print(f"[{c['id']}] {c['url'][:50]}...")
        print(f"        {c['notes'][:60]}...")
        print()


def clear(capture_id: str = None):
    """Clear inbox or remove specific capture."""
    if capture_id:
        captures = load_captures()
        captures = [c for c in captures if c["id"] != capture_id]
        save_captures(captures)
        print(f"Removed {capture_id}")
    else:
        save_captures([])
        print("Inbox cleared.")


def main():
    if len(sys.argv) < 2:
        print("""
Capture Inbox
=============

Quick capture:
  python capture.py <url> "<notes>"

Commands:
  python capture.py ls                    # List captures
  python capture.py inbox                 # Export all for Claude
  python capture.py export <id>           # Export one for Claude
  python capture.py rm <id>               # Remove capture
  python capture.py clear                 # Clear all

Example:
  python capture.py https://example.com/article "Great for AI engineers, covers RAG basics"
  python capture.py inbox
  # Copy output into Claude chat
""")
        return

    cmd = sys.argv[1]

    if cmd == "ls":
        ls()
    elif cmd == "inbox":
        inbox()
    elif cmd == "export" and len(sys.argv) > 2:
        export_one(sys.argv[2])
    elif cmd == "rm" and len(sys.argv) > 2:
        clear(sys.argv[2])
    elif cmd == "clear":
        clear()
    elif cmd.startswith("http") and len(sys.argv) > 2:
        # Quick add: capture.py <url> "<notes>"
        add(sys.argv[1], sys.argv[2])
    else:
        print(f"Unknown: {cmd}")


if __name__ == "__main__":
    main()

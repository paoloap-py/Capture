#!/usr/bin/env python3
"""
Content Capture System - Quick capture of articles and links for future content creation.
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional
import uuid

# Storage configuration
CAPTURES_DIR = Path(__file__).parent / "captures"
CAPTURES_FILE = CAPTURES_DIR / "captures.json"


def ensure_storage():
    """Ensure the captures directory and file exist."""
    CAPTURES_DIR.mkdir(exist_ok=True)
    if not CAPTURES_FILE.exists():
        CAPTURES_FILE.write_text("[]")


def load_captures() -> list:
    """Load all captures from storage."""
    ensure_storage()
    return json.loads(CAPTURES_FILE.read_text())


def save_captures(captures: list):
    """Save captures to storage."""
    ensure_storage()
    CAPTURES_FILE.write_text(json.dumps(captures, indent=2, default=str))


def add_capture(url: str, title: str, notes: str, tags: Optional[list] = None) -> dict:
    """Add a new capture."""
    captures = load_captures()

    capture = {
        "id": str(uuid.uuid4())[:8],
        "url": url,
        "title": title,
        "notes": notes,
        "tags": tags or [],
        "captured_at": datetime.now().isoformat(),
        "used_for": []  # Track which posts this was used for
    }

    captures.append(capture)
    save_captures(captures)

    print(f"✓ Captured: {title}")
    print(f"  ID: {capture['id']}")
    print(f"  URL: {url}")
    if tags:
        print(f"  Tags: {', '.join(tags)}")

    return capture


def list_captures(tag: Optional[str] = None, limit: int = 10):
    """List captures, optionally filtered by tag."""
    captures = load_captures()

    if tag:
        captures = [c for c in captures if tag.lower() in [t.lower() for t in c.get("tags", [])]]

    captures = sorted(captures, key=lambda x: x["captured_at"], reverse=True)[:limit]

    if not captures:
        print("No captures found.")
        return

    print(f"\n{'='*60}")
    print(f"CAPTURED CONTENT ({len(captures)} items)")
    print(f"{'='*60}\n")

    for c in captures:
        print(f"[{c['id']}] {c['title']}")
        print(f"    URL: {c['url']}")
        print(f"    Notes: {c['notes'][:100]}..." if len(c['notes']) > 100 else f"    Notes: {c['notes']}")
        if c.get("tags"):
            print(f"    Tags: {', '.join(c['tags'])}")
        print(f"    Captured: {c['captured_at'][:10]}")
        print()


def get_capture(capture_id: str) -> Optional[dict]:
    """Get a specific capture by ID."""
    captures = load_captures()
    for c in captures:
        if c["id"] == capture_id:
            return c
    return None


def generate_linkedin_post(capture_id: str) -> str:
    """Generate a LinkedIn post from a capture."""
    capture = get_capture(capture_id)
    if not capture:
        print(f"Capture {capture_id} not found.")
        return ""

    post = f"""🔗 Just came across this valuable resource that I wanted to share with my network.

📌 {capture['title']}

{capture['notes']}

Key takeaways:
• [Add your key insight 1]
• [Add your key insight 2]
• [Add your key insight 3]

🔗 Link: {capture['url']}

What are your thoughts on this? I'd love to hear your perspective in the comments.

#ContentSharing #Learning #ProfessionalDevelopment"""

    return post


def generate_medium_post(capture_id: str) -> str:
    """Generate a Medium post outline from a capture."""
    capture = get_capture(capture_id)
    if not capture:
        print(f"Capture {capture_id} not found.")
        return ""

    post = f"""# {capture['title']}

## Introduction

{capture['notes']}

## Why This Matters

[Expand on the significance and relevance of this content]

## Key Insights

### Insight 1
[Detail the first major takeaway]

### Insight 2
[Detail the second major takeaway]

### Insight 3
[Detail the third major takeaway]

## My Take

[Add your personal perspective and analysis]

## Conclusion

[Summarize the main points and call to action]

---

*Source: [{capture['title']}]({capture['url']})*

---

*If you found this valuable, follow me for more insights on [your topic area].*"""

    return post


def interactive_capture():
    """Interactive mode for capturing content."""
    print("\n📥 CAPTURE NEW CONTENT")
    print("-" * 40)

    url = input("URL: ").strip()
    if not url:
        print("URL is required.")
        return

    title = input("Title: ").strip()
    if not title:
        print("Title is required.")
        return

    print("Notes (why is this valuable? Press Enter twice to finish):")
    notes_lines = []
    while True:
        line = input()
        if line == "":
            if notes_lines:
                break
        else:
            notes_lines.append(line)
    notes = "\n".join(notes_lines)

    tags_input = input("Tags (comma-separated, optional): ").strip()
    tags = [t.strip() for t in tags_input.split(",")] if tags_input else []

    add_capture(url, title, notes, tags)


def main():
    """Main CLI entry point."""
    if len(sys.argv) < 2:
        print("""
Content Capture System
======================

Usage:
  python capture.py add <url> <title> <notes> [--tags tag1,tag2]
  python capture.py capture              # Interactive capture mode
  python capture.py list [--tag TAG] [--limit N]
  python capture.py show <id>
  python capture.py linkedin <id>        # Generate LinkedIn post
  python capture.py medium <id>          # Generate Medium post outline

Examples:
  python capture.py capture
  python capture.py list --tag ai
  python capture.py linkedin abc123
        """)
        return

    command = sys.argv[1].lower()

    if command == "capture":
        interactive_capture()

    elif command == "add":
        if len(sys.argv) < 5:
            print("Usage: python capture.py add <url> <title> <notes> [--tags tag1,tag2]")
            return
        url = sys.argv[2]
        title = sys.argv[3]
        notes = sys.argv[4]
        tags = []
        if "--tags" in sys.argv:
            idx = sys.argv.index("--tags")
            if idx + 1 < len(sys.argv):
                tags = [t.strip() for t in sys.argv[idx + 1].split(",")]
        add_capture(url, title, notes, tags)

    elif command == "list":
        tag = None
        limit = 10
        if "--tag" in sys.argv:
            idx = sys.argv.index("--tag")
            if idx + 1 < len(sys.argv):
                tag = sys.argv[idx + 1]
        if "--limit" in sys.argv:
            idx = sys.argv.index("--limit")
            if idx + 1 < len(sys.argv):
                limit = int(sys.argv[idx + 1])
        list_captures(tag, limit)

    elif command == "show":
        if len(sys.argv) < 3:
            print("Usage: python capture.py show <id>")
            return
        capture = get_capture(sys.argv[2])
        if capture:
            print(json.dumps(capture, indent=2))
        else:
            print("Capture not found.")

    elif command == "linkedin":
        if len(sys.argv) < 3:
            print("Usage: python capture.py linkedin <id>")
            return
        post = generate_linkedin_post(sys.argv[2])
        if post:
            print("\n" + "="*60)
            print("LINKEDIN POST")
            print("="*60 + "\n")
            print(post)

    elif command == "medium":
        if len(sys.argv) < 3:
            print("Usage: python capture.py medium <id>")
            return
        post = generate_medium_post(sys.argv[2])
        if post:
            print("\n" + "="*60)
            print("MEDIUM POST OUTLINE")
            print("="*60 + "\n")
            print(post)

    else:
        print(f"Unknown command: {command}")


if __name__ == "__main__":
    main()

# Content Capture System

A quick capture system for saving articles and links with notes, for later generating LinkedIn or Medium posts.

## Usage

### Capture content (interactive mode)
```bash
python capture.py capture
```

### Quick add
```bash
python capture.py add "https://example.com/article" "Article Title" "Why this is valuable" --tags ai,tech
```

### List captures
```bash
python capture.py list
python capture.py list --tag ai --limit 5
```

### Generate posts
```bash
python capture.py linkedin <capture-id>
python capture.py medium <capture-id>
```

## Workflow

1. Find an interesting article/link
2. Run `python capture.py capture`
3. Enter URL, title, and notes about why it's valuable
4. When ready to create content, run `python capture.py linkedin <id>` or `python capture.py medium <id>`
5. Use the generated template as a starting point for your post

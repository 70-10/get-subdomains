# get-subdomains

A command-line tool for discovering subdomains using certificate transparency logs via crt.sh.

## Features

- 🔍 Fast subdomain discovery using crt.sh
- 🎯 Automatic filtering of unique subdomains
- 📝 Clean, readable output format
- 🔄 Real-time progress indication
- 🎨 Optional JSON output

## Installation

```bash
npm install -g get-subdomains
```

Or use directly with npx:

```bash
npx get-subdomains example.com
```

## Usage

Basic usage:

```bash
get-subdomains example.com
```

JSON output:

```bash
get-subdomains example.com --json
```

## Output Examples

Plain text output:

```
api.example.com
blog.example.com
dev.example.com
mail.example.com
www.example.com
```

JSON output:

```json
[
  "api.example.com",
  "blog.example.com",
  "dev.example.com",
  "mail.example.com",
  "www.example.com"
]
```

## How it Works

1. Queries certificate transparency logs via crt.sh API
2. Filters out duplicate entries
3. Removes invalid entries (wildcards, etc.)
4. Sorts results alphabetically
5. Outputs in requested format

## Error Handling

The tool provides clear error messages for common issues:

- Network connectivity problems
- Invalid API responses
- Content-type mismatches

## License

MIT

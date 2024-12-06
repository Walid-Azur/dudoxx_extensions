# Dudoxx Extensions

Odoo 16.0 module providing extended functionality for the Dudoxx platform.

## Features

### Markdown Field Widget
- Custom field widget for rendering markdown content in Odoo forms
- Supports standard markdown syntax including:
  - Headers
  - Tables
  - Lists
  - Code blocks
  - Blockquotes
  - Text formatting (bold, italic, strikethrough)
- Seamless integration with Odoo's form views
- Real-time markdown preview
- Safe HTML rendering

## Installation

1. Clone this repository into your Odoo addons directory:
```bash
git clone https://github.com/dudoxx/dudoxx_extensions.git
```

2. Update your Odoo configuration to include this directory in the addons path.

3. Install the module through Odoo's module installation interface.

## Usage

### Markdown Field Widget

To use the markdown field widget in your form views:

```xml
<field name="your_field" widget="ddx_markdown"/>
```

The widget will automatically render markdown content as formatted HTML while editing.

## Development

### Requirements
- Odoo 16.0
- Dependencies listed in `__manifest__.py`

### Structure
```
dudoxx_extensions/
├── __init__.py
├── __manifest__.py
├── models/
├── static/
│   ├── src/
│   │   ├── js/
│   │   ├── css/
│   │   └── xml/
└── views/
```

## License

This project is licensed under LGPL-3 - see the LICENSE file for details.

## Author

Dudoxx UG, Walid Boudabbous (CTO)
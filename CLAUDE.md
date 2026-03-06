# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TRIBUS-Directorio is a Jekyll-based static website serving as a local business directory for Guatemala. The site is deployed on Netlify and integrates with Airtable to manage business listings. Businesses are added via a Google Form, and the data is managed by the Imaginatorio team through Airtable.

## Development Commands

### Setup
```bash
bundle install
```

### Run Development Server
```bash
bundle exec jekyll serve
# Site will be available at http://localhost:4000
```

### Fetch Data from Airtable
```bash
ruby _plugins/airtable.rb
# This pulls business records from Airtable and generates _data/airtable.yml
# Run this before building/serving if you need fresh data
```

### Build for Production
```bash
bundle exec jekyll build
# Output will be in _site/
```

## Architecture

### Data Flow
1. Business data is sourced from Airtable (base ID: `appzux6XBDCjO151J`, table: `DirectorioTribus`)
2. The `_plugins/airtable.rb` plugin fetches records and transforms them into a YAML file at `_data/airtable.yml`
3. Jekyll reads the YAML file and uses it to render business cards on `index.html`
4. Client-side JavaScript (`js/main.js`) provides category filtering without page reloads

### Key Components

**Airtable Integration** ([_plugins/airtable.rb](_plugins/airtable.rb))
- Connects to Airtable API using hardcoded credentials
- Maps Spanish column names to English keys (e.g., "Nombre" → "name")
- Generates `_data/airtable.yml` with sanitized business records

**Business Card Component** ([_includes/business_card.html](_includes/business_card.html))
- Renders individual business listings
- Displays logo (if available) or business name/phone as fallback
- Shows description, phone (with `tel:` link), and social media link
- Uses `data-category` attribute for client-side filtering

**Category Filtering** ([js/main.js](_js/main.js))
- Filter buttons are generated dynamically from unique categories in the data
- Clicking a filter button toggles the `hidden` class on business cards
- No page reload required; all filtering happens client-side

**Layout Structure**
- Single layout: [_layouts/default.html](_layouts/default.html)
- Main page: [index.html](index.html) with two-column layout (filters sidebar + business cards grid)
- Styles organized in `_sass/` directory, compiled via [css/app.scss](css/app.scss)

### Dependencies
- **Jekyll 4.1.1** - Static site generator
- **Ruby 3.0.6** - Required Ruby version (set in `.ruby-version`)
- **Airtable gem** - For API integration
- **Bootstrap** - CSS framework (vendor files in `vendor/css/`)
- **jQuery** - For DOM manipulation and filtering
- **Font Awesome** - Icon library

## Important Notes

- The Airtable API key is currently hardcoded in `_plugins/airtable.rb`. Handle with care when sharing or making the repo public.
- Business images are stored in Google Drive; the `logo_attachment` field contains direct URLs to these images.
- The site uses Bootstrap 4 grid system with a sticky sidebar for filters on desktop.
- Phone numbers are clickable via `tel:` links for mobile users.
- Recent commit pinned Ruby to 3.0.6 for CI/Netlify compatibility.

## Install Google Tag Manager (GTM)

Add the GTM container snippet to `index.html` in two places:

1. **GTM `<script>` in `<head>`** — placed after `<meta charset>` / `<meta viewport>` and before the existing Google Analytics (gtag.js) script. This ensures GTM loads early and can manage the dataLayer.

2. **GTM `<noscript>` in `<body>`** — placed immediately after the opening `<body>` tag (before `<div id="root">`), as required by Google for users without JavaScript.

The existing Google Analytics gtag.js script will remain unchanged and coexist with GTM.

### Files changed
- `index.html`

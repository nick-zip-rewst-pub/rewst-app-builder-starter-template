# Rewst App Builder Template

Barebones template for building single-page apps on the Rewst App Builder platform. Everything compiles into ONE HTML file that gets pasted into Rewst.

## CRITICAL: How This Works

This is NOT a normal web app. There is no npm, no bundler, no dev server. The build is dead simple:

1. `dashboard-spa-main-template.html` has `{{ MARKER }}` placeholders
2. `build.js` reads each marker and replaces it with the file contents
3. Output: `dist/dashboard-spa-main-compiled.html` — a single self-contained HTML file
4. That file gets copy-pasted into Rewst App Builder's HTML component

**Always run `node build.js` after ANY change to see it in Rewst.**

## File Structure

```
dashboard-spa-main-template.html   # THE main file. HTML shell + all JS logic.
build.js                           # Build script. Maps markers to files.
dist/                              # Build output. This is what goes into Rewst.

src/                               # Core libraries — shared across all pages
  rewst-dom-builder.js             # RewstDOM: tables, metric cards, autocomplete, alerts, etc.
  zip-graphql-js-lib-v2-optimized.js  # RewstApp: GraphQL API wrapper for Rewst platform
  rewst-override-tailwind.css      # Rewst brand CSS theme layered on Tailwind

pages/                             # One JS file per sidebar page
  components.js                    # Kitchen Sink — shows all available components
  starter.js                       # Blank starter page — copy this for new pages
```

## How to Add a New Page

This is the most common task. Follow these steps EXACTLY:

### Step 1: Create the page file

Create `pages/mypage.js`:
```js
function renderMyPage() {
  const container = document.getElementById('page-mypage');
  container.innerHTML = '';

  // Build your page content here
  // Use RewstDOM components, create DOM elements, etc.
}
```

### Step 2: Update the HTML template

In `dashboard-spa-main-template.html`, make these 4 changes:

**A) Add sidebar nav item** (inside the `<div class="sub-nav ...">` block):
```html
<a href="#" class="sidebar-item flex items-center gap-3 px-3 py-2 rounded text-sm text-rewst-dark-gray" data-page="mypage">
  <span class="material-icons text-lg">your_icon</span>
  <span class="nav-text">My Page</span>
</a>
```

**B) Add page container** (inside `<div class="px-8 pb-8 pt-6">`):
```html
<div id="page-mypage" class="page-content" style="display: none;">
  <!-- Rendered by mypage.js -->
</div>
```

**C) Add marker** (in the script section, near the other page markers):
```
{{ PAGE_MYPAGE }}
```

**D) Register in pages config** (in the JS `pages` object):
```js
mypage: {
  title: 'My Page',
  subtitle: 'Description shown in header',
  render: renderMyPage
}
```

### Step 3: Update build.js

Add the marker mapping:
```js
'{{ PAGE_MYPAGE }}': 'pages/mypage.js',
```

### Step 4: Build

```bash
node build.js
```

## IMPORTANT GOTCHAS

### CSS Specificity: Accent Metric Cards

The `.card` class has `border: none` which KILLS `border-left` on accent cards at the same specificity. You MUST use the `cardClass` option with `card-accent-{color}`:

```js
// WRONG — border won't show (card's border:none wins)
RewstDOM.createMetricCard({ color: 'teal', solidBackground: false });

// CORRECT — card-accent-teal has higher specificity (.card.card-accent-teal)
RewstDOM.createMetricCard({
  color: 'teal',
  solidBackground: false,
  cardClass: 'card-accent-teal'
});
```

Available accent classes: `card-accent-teal`, `card-accent-fandango`, `card-accent-orange`, `card-accent-error`, `card-accent-warning`, `card-accent-snooze`, `card-accent-bask`

### All JS runs inside a single `<script type="module">` block

Page functions, the RewstApp init, sidebar logic — it's all in one async IIFE inside the template. Page JS files get injected into this scope via markers. This means:
- Page render functions have access to `rewst`, `RewstDOM`, `debugLog`, `switchPage`, etc.
- No imports/exports — everything is in the same function scope
- `window.rewst`, `window.RewstDOM` are set globally for console debugging

### The template HTML file IS the app

`dashboard-spa-main-template.html` contains:
- The HTML structure (sidebar, header, page containers, filter drawer)
- All JavaScript (init, navigation, scroll behavior, event listeners)
- Markers where libraries and pages get injected

The `src/` and `pages/` files are only separate for developer ergonomics. After build, it's ONE file.

### Sticky header behavior

The header shrinks on scroll (subtitle hides, buttons collapse to icon-only). This is handled by CSS classes:
- `.scrolled` — compact mode (added when scrollTop > 50px)
- `.hide-smooth` — slides header up when scrolling down fast
- `.show-instant` — snaps header back when scrolling up
- `.btn-text` elements get `display: none` when `.scrolled`

### Filter drawer

The slide-out filter panel on the right is pre-wired:
- `#open-filter-drawer` button opens it
- `#close-filter-drawer` button and overlay click close it
- Filter containers (`#filter-org-container`, `#filter-date-container`, `#filter-custom-container`) are empty — populate them with RewstDOM components
- CSS: `#filter-drawer.open { transform: translateX(0) }` handles the slide animation

### Toggle switch in header

The toggle switch (`#header-toggle`) is wired up with a change listener. Access its state with:
```js
document.getElementById('header-toggle').checked
```

## Component Reference (RewstDOM)

### Metric Cards
```js
const card = RewstDOM.createMetricCard({
  title: 'My Metric',          // card title (also accepts 'label')
  subtitle: 'Description',     // smaller text under title (also accepts 'description')
  value: '1,234',              // big number displayed
  icon: 'speed',               // Material Icons name
  color: 'teal',               // teal|fandango|orange|success|error|warning|snooze|bask
  solidBackground: true,       // true = gradient bg, false = white card (use cardClass for accent)
  cardClass: 'card-accent-teal', // override CSS class (REQUIRED for accent border cards)
  trend: 'up',                 // up|down|null — shows trend arrow
  trendValue: '+12%'           // text next to trend arrow
});
container.appendChild(card);

// Or with skeleton loading:
RewstDOM.loadMetricCard('#my-target', { ...same options });
```

### Tables
```js
const table = RewstDOM.createTable(dataArray, {
  title: 'My Table',                    // heading above the table
  columns: ['name', 'status', 'count'], // which keys to show
  headers: { name: 'Name', status: 'Status', count: 'Count' },  // display names
  transforms: {                         // custom cell rendering
    status: (val) => `<span class="badge badge-${val === 'OK' ? 'success' : 'error'}">${val}</span>`
  },
  filters: {                            // column filter dropdowns
    status: { type: 'dropdown' },
    date: { type: 'dateRange' }
  },
  defaultSort: { column: 'count', direction: 'desc' },
  pagination: 10,                       // rows per page (default 10)
  paginationOptions: [10, 25, 50],      // page size choices
  searchable: true,                     // full-text search (default true)
  sortable: true,                       // click-to-sort columns (default true)
  workflowId: 'xxx',                    // enables refresh button
  refreshable: true                     // show refresh icon
});
```

### Autocomplete
```js
const auto = RewstDOM.createAutocomplete(items, {
  labelKey: 'name',           // which property to display
  valueKey: 'id',             // which property is the value
  placeholder: 'Search...',
  onSelect: (item) => { },    // callback when item selected
  showClearButton: true,
  maxResults: 10
});
```

### Dropdowns
```js
// Single select
const dropdown = RewstDOM.createStyledDropdown(
  [{ value: '7', label: 'Last 7 days' }, { value: '30', label: 'Last 30 days' }],
  { defaultValue: '30', onChange: (option, value) => { } }
);

// Multi select
const multi = RewstDOM.createMultiSelect(
  [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }],
  { placeholder: 'Select...', onChange: (selectedValues) => { } }
);
```

### Alerts (toast notifications)
```js
RewstDOM.showSuccess('Done!');              // green, 4s
RewstDOM.showError('Something broke');      // red, 5s
RewstDOM.showWarning('Watch out');          // amber, 4s
RewstDOM.showInfo('FYI');                   // teal, 4s
// All accept optional second param for duration in ms
```

### Loading Skeletons
```js
RewstDOM.showMetricSkeleton('#target');           // shimmer card placeholder
RewstDOM.showChartSkeleton('#target', '300px');   // shimmer chart placeholder
RewstDOM.showTableSkeleton('#target', 5);         // shimmer table with N rows
RewstDOM.showButtonSkeleton('#target', 130, 52);  // shimmer button placeholder
```

### DOM Helpers
```js
RewstDOM.place(element, '#selector');       // append element to target
RewstDOM.getColor('teal');                  // returns '#009490'
RewstDOM.getColorRgba('teal', 0.5);        // returns 'rgba(0, 148, 144, 0.5)'
RewstDOM.animateNumber(element, '1,234', 1000);  // count-up animation
```

## Rewst API (RewstApp)

The `rewst` object is initialized on boot and available globally:

```js
// Run workflows
await rewst.runWorkflowSmart(workflowId)          // auto-detect trigger, recommended
await rewst.runWorkflow(workflowId, inputs)        // simple test execution (no trigger)
await rewst.runWorkflowWithTrigger(workflowId, triggerId, inputs)  // explicit trigger

// Forms
await rewst.submitForm(formId, fieldValues)
await rewst.debugForm(formId)                      // logs field schemas to console

// Data
await rewst.getAllWorkflows()
await rewst.getRecentExecutions(withTriggerInfo, days, workflowId, includeSubWorkflows, orgIds)
await rewst.getWorkflowTriggers(workflowId)
await rewst.getWorkflowSchema(workflowId)
await rewst.getLastWorkflowExecution(workflowId)
await rewst.getOrgVariable(variableName)
await rewst.getManagedOrganizations()
await rewst.getIntegrationConfigs()

// Context
rewst.getOrgId()                                   // current org ID
rewst.orgId                                        // same thing, property access
```

## CSS Quick Reference

### Buttons
```html
<button class="btn-primary">Primary</button>          <!-- teal bg -->
<button class="btn-secondary">Secondary</button>      <!-- white bg, teal border -->
<button class="btn-tertiary">Tertiary</button>        <!-- transparent, teal text -->
<!-- Sizes: add btn-sm or btn-lg -->
```

### Cards
```html
<div class="card">Default white card</div>
<div class="card card-success">Green success card</div>
<div class="card card-warning">Amber warning card</div>
<div class="card card-error">Red error card</div>
```

### Badges
```html
<span class="badge badge-teal">Teal</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

### Colors
CSS variables: `var(--rewst-teal)`, `var(--rewst-fandango)`, `var(--rewst-orange)`, `var(--rewst-bask)`, `var(--rewst-snooze)`, `var(--rewst-quincy)`

Utility classes: `bg-rewst-{color}`, `text-rewst-{color}`, `border-rewst-{color}`

Color names: `teal`, `light-teal`, `fandango`, `orange`, `bask`, `snooze`, `quincy`, `black`, `dark-gray`, `gray`, `light-gray`, `light`, `white`

### Material Icons
```html
<span class="material-icons">icon_name</span>
```
Browse icons at: https://fonts.google.com/icons

### Layout Classes
- `.sidebar` — left nav (240px, collapses to 64px)
- `.main-content` — content area (margin-left matches sidebar)
- `.sticky-header` — top bar (sticky, shrinks on scroll)
- `.page-content` — page container (toggled by nav)

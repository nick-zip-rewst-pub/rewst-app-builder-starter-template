# Rewst App Builder Template

A barebones template for building single-page apps on the Rewst App Builder platform. Compiles modular JS/CSS into a single HTML file you paste into Rewst.

## Architecture

```
src/                        # Core libraries (DO NOT EDIT unless extending)
  rewst-dom-builder.js      # DOM component library (tables, cards, autocomplete, alerts, etc.)
  zip-graphql-js-lib-v2-optimized.js  # Rewst GraphQL API wrapper (RewstApp class)
  rewst-override-tailwind.css         # Rewst brand theme over Tailwind CSS

pages/                      # Page scripts (one per sidebar tab)
  components.js             # Kitchen sink showing all available components
  starter.js                # Blank starter page template

dashboard-spa-main-template.html  # Main HTML shell with {{ MARKER }} placeholders
build.js                          # Build script: replaces markers with file contents
dist/                             # Build output (single compiled HTML)
```

## Build

```bash
node build.js
```

Output goes to `dist/dashboard-spa-main-compiled.html`. Copy that into Rewst App Builder.

## How to Add a New Page

1. Create `pages/mypage.js` with a `function renderMyPage() { ... }` that targets `#page-mypage`
2. In `dashboard-spa-main-template.html`:
   - Add a sidebar nav item: `<a href="#" class="sidebar-item ..." data-page="mypage">...</a>`
   - Add a page container: `<div id="page-mypage" class="page-content" style="display: none;"></div>`
   - Add a marker in the script section: `{{ PAGE_MYPAGE }}`
   - Add to the `pages` config object: `mypage: { title: 'My Page', subtitle: '...', render: renderMyPage }`
3. In `build.js`, add the marker mapping: `'{{ PAGE_MYPAGE }}': 'pages/mypage.js'`
4. Run `node build.js`

## Available Components (RewstDOM)

All accessed via the global `RewstDOM` object:

### Metric Cards
```js
RewstDOM.createMetricCard({ title, value, icon, color, solidBackground, trend, trendValue, subtitle })
RewstDOM.loadMetricCard(target, options) // skeleton -> card with delay
```
Colors: `teal`, `fandango`, `orange`, `success`, `error`, `warning`, `snooze`, `bask`

### Tables
```js
RewstDOM.createTable(dataArray, {
  title, columns, headers, transforms, filters, defaultSort,
  pagination, searchable, sortable, workflowId, refreshable
})
```

### Autocomplete
```js
RewstDOM.createAutocomplete(items, { labelKey, valueKey, placeholder, onSelect, maxResults })
```

### Dropdowns
```js
RewstDOM.createStyledDropdown(options, { defaultValue, onChange })
RewstDOM.createMultiSelect(options, { placeholder, defaultValues, onChange })
```

### Alerts (toast notifications)
```js
RewstDOM.showSuccess(message, duration)
RewstDOM.showError(message, duration)
RewstDOM.showWarning(message, duration)
RewstDOM.showInfo(message, duration)
```

### Loading Skeletons
```js
RewstDOM.showMetricSkeleton(target)
RewstDOM.showChartSkeleton(target, height)
RewstDOM.showTableSkeleton(target, rows)
```

### Utilities
```js
RewstDOM.place(element, selector)  // append element to target
RewstDOM.getColor(name)            // get hex color value
RewstDOM.getColorRgba(name, opacity)
```

## Rewst API (RewstApp)

Global `rewst` object initialized on boot:

```js
await rewst.runWorkflowSmart(workflowId)     // auto-detect trigger type and run
await rewst.runWorkflow(workflowId, inputs)   // simple test execution
await rewst.submitForm(formId, fieldValues)   // submit a form
await rewst.getAllWorkflows()                  // list all workflows
await rewst.getRecentExecutions(withTriggerInfo, days)
rewst.getOrgId()                              // current org ID
await rewst.getOrgVariable(variableName)      // fetch org variable
```

## CSS Classes

- Buttons: `btn-primary`, `btn-secondary`, `btn-tertiary` (sizes: `btn-sm`, `btn-lg`)
- Cards: `card`, `card-success`, `card-warning`, `card-error`
- Badges: `badge badge-teal`, `badge-success`, `badge-warning`, `badge-error`
- Colors: `bg-rewst-{name}`, `text-rewst-{name}`, `border-rewst-{name}`
- Layout: `sidebar`, `main-content`, `sticky-header`, `page-content`

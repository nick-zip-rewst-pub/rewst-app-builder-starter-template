// ============================================
// COMPONENTS PAGE - Kitchen Sink
// Shows every available RewstDOM component
// so you can see what's in your toolbox
// ============================================

function renderComponentsPage() {
  const container = document.getElementById('page-components');
  container.innerHTML = '';

  // ============================================
  // SECTION: Metric Cards (Solid Background)
  // ============================================
  const solidSection = document.createElement('div');
  solidSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Metric Cards — Solid Background</h2>
    <p class="text-sm text-rewst-gray mb-4">Use <code>RewstDOM.createMetricCard({ solidBackground: true, color: '...' })</code> or the shorthand <code>RewstDOM.loadMetricCard(target, options)</code></p>
  `;
  container.appendChild(solidSection);

  const solidGrid = document.createElement('div');
  solidGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8';
  container.appendChild(solidGrid);

  const solidColors = [
    { color: 'teal', icon: 'speed', title: 'Teal Card', value: '1,234', subtitle: 'The default color', trend: 'up', trendValue: '+12%' },
    { color: 'fandango', icon: 'favorite', title: 'Fandango Card', value: '567', subtitle: 'A bold pink-purple' },
    { color: 'orange', icon: 'local_fire_department', title: 'Orange Card', value: '89.2%', subtitle: 'Warm and attention-grabbing' },
    { color: 'success', icon: 'check_circle', title: 'Success Card', value: '42', subtitle: 'Green for positive metrics', trend: 'up', trendValue: '+5' },
    { color: 'error', icon: 'error', title: 'Error Card', value: '3', subtitle: 'Red for alerts or failures', trend: 'down', trendValue: '-2' },
    { color: 'snooze', icon: 'bedtime', title: 'Snooze Card', value: '7.5h', subtitle: 'Deep purple' },
    { color: 'warning', icon: 'warning', title: 'Warning Card', value: '15', subtitle: 'Amber for caution' },
    { color: 'bask', icon: 'whatshot', title: 'Bask Card', value: '$4,200', subtitle: 'Warm red-coral' },
  ];

  solidColors.forEach(opts => {
    const wrapper = document.createElement('div');
    solidGrid.appendChild(wrapper);
    const card = RewstDOM.createMetricCard({ ...opts, solidBackground: true });
    wrapper.appendChild(card);
  });

  // ============================================
  // SECTION: Metric Cards (Accent Border)
  // ============================================
  const accentSection = document.createElement('div');
  accentSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Metric Cards — Accent Border</h2>
    <p class="text-sm text-rewst-gray mb-4">Set <code>solidBackground: false</code> for a lighter card with a colored left border</p>
  `;
  container.appendChild(accentSection);

  const accentGrid = document.createElement('div');
  accentGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8';
  container.appendChild(accentGrid);

  const accentColors = [
    { color: 'teal', icon: 'analytics', title: 'Accent Teal', value: '99.9%', subtitle: 'Light card, teal border' },
    { color: 'fandango', icon: 'star', title: 'Accent Fandango', value: '256', subtitle: 'Light card, fandango border' },
    { color: 'orange', icon: 'bolt', title: 'Accent Orange', value: '38m', subtitle: 'Light card, orange border' },
  ];

  accentColors.forEach(opts => {
    const wrapper = document.createElement('div');
    accentGrid.appendChild(wrapper);
    const card = RewstDOM.createMetricCard({ ...opts, solidBackground: false });
    wrapper.appendChild(card);
  });

  // ============================================
  // SECTION: Table
  // ============================================
  const tableSection = document.createElement('div');
  tableSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Table</h2>
    <p class="text-sm text-rewst-gray mb-4">Use <code>RewstDOM.createTable(data, options)</code> — supports sorting, search, pagination, column filters, and custom transforms</p>
  `;
  container.appendChild(tableSection);

  const sampleData = [
    { name: 'Onboard New User', status: 'Succeeded', executions: 142, timeSaved: '23.5h', triggerType: 'Form Submission' },
    { name: 'Daily Backup Check', status: 'Succeeded', executions: 720, timeSaved: '120h', triggerType: 'Cron Job' },
    { name: 'Alert on Disk Full', status: 'Failed', executions: 18, timeSaved: '1.2h', triggerType: 'Webhook' },
    { name: 'Provision Mailbox', status: 'Succeeded', executions: 56, timeSaved: '9.3h', triggerType: 'Form Submission' },
    { name: 'Sync AD Groups', status: 'Succeeded', executions: 365, timeSaved: '60.8h', triggerType: 'Cron Job' },
    { name: 'Reset MFA', status: 'Succeeded', executions: 89, timeSaved: '14.8h', triggerType: 'Form Submission' },
    { name: 'Deploy Agent', status: 'Failed', executions: 5, timeSaved: '0.4h', triggerType: 'App Platform' },
    { name: 'License Audit', status: 'Succeeded', executions: 30, timeSaved: '25h', triggerType: 'Cron Job' },
    { name: 'Ticket Triage', status: 'Succeeded', executions: 412, timeSaved: '68.7h', triggerType: 'Webhook' },
    { name: 'Offboard Employee', status: 'Succeeded', executions: 23, timeSaved: '11.5h', triggerType: 'Form Submission' },
    { name: 'Patch Compliance', status: 'Succeeded', executions: 60, timeSaved: '10h', triggerType: 'Cron Job' },
    { name: 'Network Scan', status: 'Failed', executions: 2, timeSaved: '0.1h', triggerType: 'Manual/Test' },
  ];

  const tableEl = RewstDOM.createTable(sampleData, {
    title: 'Sample Workflow Table',
    columns: ['name', 'status', 'executions', 'timeSaved', 'triggerType'],
    headers: {
      name: 'Workflow Name',
      status: 'Status',
      executions: 'Executions',
      timeSaved: 'Time Saved',
      triggerType: 'Trigger Type'
    },
    transforms: {
      status: (val) => {
        const color = val === 'Succeeded' ? 'badge-success' : 'badge-error';
        return `<span class="badge ${color}">${val}</span>`;
      }
    },
    filters: {
      status: { type: 'dropdown' },
      triggerType: { type: 'dropdown' }
    },
    defaultSort: { column: 'executions', direction: 'desc' },
    pagination: 5
  });

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'mb-8';
  tableWrapper.appendChild(tableEl);
  container.appendChild(tableWrapper);

  // ============================================
  // SECTION: Autocomplete
  // ============================================
  const autoSection = document.createElement('div');
  autoSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Autocomplete Search</h2>
    <p class="text-sm text-rewst-gray mb-4">Use <code>RewstDOM.createAutocomplete(items, options)</code> — searchable dropdown with keyboard nav</p>
  `;
  container.appendChild(autoSection);

  const autoCard = document.createElement('div');
  autoCard.className = 'card p-6 mb-8';
  container.appendChild(autoCard);

  const autoLabel = document.createElement('label');
  autoLabel.className = 'block text-sm font-medium text-rewst-dark-gray mb-2';
  autoLabel.textContent = 'Search Workflows';
  autoCard.appendChild(autoLabel);

  const sampleItems = [
    { name: 'Onboard New User', id: '1' },
    { name: 'Daily Backup Check', id: '2' },
    { name: 'Alert on Disk Full', id: '3' },
    { name: 'Provision Mailbox', id: '4' },
    { name: 'Sync AD Groups', id: '5' },
    { name: 'Reset MFA', id: '6' },
    { name: 'Deploy Agent', id: '7' },
    { name: 'License Audit', id: '8' },
  ];

  const autocomplete = RewstDOM.createAutocomplete(sampleItems, {
    labelKey: 'name',
    valueKey: 'id',
    placeholder: 'Type to search workflows...',
    onSelect: (item) => {
      if (item) {
        RewstDOM.showSuccess(`Selected: ${item.name}`);
      }
    }
  });
  autoCard.appendChild(autocomplete);

  // ============================================
  // SECTION: Dropdowns
  // ============================================
  const dropdownSection = document.createElement('div');
  dropdownSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Dropdowns</h2>
    <p class="text-sm text-rewst-gray mb-4">Use <code>RewstDOM.createStyledDropdown(options, config)</code> or <code>RewstDOM.createMultiSelect(options, config)</code></p>
  `;
  container.appendChild(dropdownSection);

  const dropdownCard = document.createElement('div');
  dropdownCard.className = 'card p-6 mb-8';
  container.appendChild(dropdownCard);

  const dropdownGrid = document.createElement('div');
  dropdownGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
  dropdownCard.appendChild(dropdownGrid);

  // Styled Dropdown
  const ddCol1 = document.createElement('div');
  const ddLabel1 = document.createElement('label');
  ddLabel1.className = 'block text-sm font-medium text-rewst-dark-gray mb-2';
  ddLabel1.textContent = 'Styled Dropdown (single select)';
  ddCol1.appendChild(ddLabel1);

  const styledDropdown = RewstDOM.createStyledDropdown(
    [
      { value: '7', label: 'Last 7 days' },
      { value: '14', label: 'Last 14 days' },
      { value: '30', label: 'Last 30 days' },
      { value: '90', label: 'Last 90 days' },
    ],
    {
      defaultValue: '30',
      onChange: (option, value) => {
        RewstDOM.showInfo(`Selected: ${option.label}`);
      }
    }
  );
  ddCol1.appendChild(styledDropdown);
  dropdownGrid.appendChild(ddCol1);

  // Multi Select
  const ddCol2 = document.createElement('div');
  const ddLabel2 = document.createElement('label');
  ddLabel2.className = 'block text-sm font-medium text-rewst-dark-gray mb-2';
  ddLabel2.textContent = 'Multi Select';
  ddCol2.appendChild(ddLabel2);

  const multiSelect = RewstDOM.createMultiSelect(
    [
      { value: 'cron', label: 'Cron Job' },
      { value: 'webhook', label: 'Webhook' },
      { value: 'form', label: 'Form Submission' },
      { value: 'app', label: 'App Platform' },
      { value: 'manual', label: 'Manual/Test' },
    ],
    {
      placeholder: 'Filter trigger types...',
      onChange: (values) => {
        if (values.length > 0) {
          RewstDOM.showInfo(`Selected: ${values.join(', ')}`);
        }
      }
    }
  );
  ddCol2.appendChild(multiSelect);
  dropdownGrid.appendChild(ddCol2);

  // ============================================
  // SECTION: Alerts / Toasts
  // ============================================
  const alertSection = document.createElement('div');
  alertSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Alerts / Toasts</h2>
    <p class="text-sm text-rewst-gray mb-4">Use <code>RewstDOM.showSuccess(msg)</code>, <code>showError(msg)</code>, <code>showWarning(msg)</code>, <code>showInfo(msg)</code></p>
  `;
  container.appendChild(alertSection);

  const alertCard = document.createElement('div');
  alertCard.className = 'card p-6 mb-8';
  container.appendChild(alertCard);

  const alertGrid = document.createElement('div');
  alertGrid.className = 'flex flex-wrap gap-3';
  alertCard.appendChild(alertGrid);

  const alertButtons = [
    { label: 'Success Toast', color: 'btn-primary', fn: () => RewstDOM.showSuccess('This is a success message!') },
    { label: 'Error Toast', color: 'btn-primary', style: 'background-color: var(--rewst-bask)', fn: () => RewstDOM.showError('Something went wrong!') },
    { label: 'Warning Toast', color: 'btn-primary', style: 'background-color: var(--rewst-orange)', fn: () => RewstDOM.showWarning('Watch out for this!') },
    { label: 'Info Toast', color: 'btn-secondary', fn: () => RewstDOM.showInfo('Here is some useful info.') },
  ];

  alertButtons.forEach(({ label, color, style, fn }) => {
    const btn = document.createElement('button');
    btn.className = color;
    if (style) btn.style.cssText = style;
    btn.textContent = label;
    btn.addEventListener('click', fn);
    alertGrid.appendChild(btn);
  });

  // ============================================
  // SECTION: Buttons
  // ============================================
  const btnSection = document.createElement('div');
  btnSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Buttons</h2>
    <p class="text-sm text-rewst-gray mb-4">CSS classes: <code>btn-primary</code>, <code>btn-secondary</code>, <code>btn-tertiary</code> — with optional <code>btn-sm</code> / <code>btn-lg</code></p>
  `;
  container.appendChild(btnSection);

  const btnCard = document.createElement('div');
  btnCard.className = 'card p-6 mb-8';
  container.appendChild(btnCard);

  btnCard.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-primary btn-sm">Primary SM</button>
        <button class="btn-primary">Primary</button>
        <button class="btn-primary btn-lg">Primary LG</button>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-secondary btn-sm">Secondary SM</button>
        <button class="btn-secondary">Secondary</button>
        <button class="btn-secondary btn-lg">Secondary LG</button>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-tertiary btn-sm">Tertiary SM</button>
        <button class="btn-tertiary">Tertiary</button>
        <button class="btn-tertiary btn-lg">Tertiary LG</button>
      </div>
    </div>
  `;

  // ============================================
  // SECTION: Badges
  // ============================================
  const badgeSection = document.createElement('div');
  badgeSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Badges</h2>
    <p class="text-sm text-rewst-gray mb-4">CSS classes: <code>badge badge-teal</code>, <code>badge-success</code>, <code>badge-warning</code>, <code>badge-error</code></p>
  `;
  container.appendChild(badgeSection);

  const badgeCard = document.createElement('div');
  badgeCard.className = 'card p-6 mb-8';
  container.appendChild(badgeCard);

  badgeCard.innerHTML = `
    <div class="flex flex-wrap gap-3">
      <span class="badge badge-teal">Teal</span>
      <span class="badge badge-success">Success</span>
      <span class="badge badge-warning">Warning</span>
      <span class="badge badge-error">Error</span>
    </div>
  `;

  // ============================================
  // SECTION: Cards
  // ============================================
  const cardSection = document.createElement('div');
  cardSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Cards</h2>
    <p class="text-sm text-rewst-gray mb-4">CSS classes: <code>card</code>, <code>card-success</code>, <code>card-warning</code>, <code>card-error</code></p>
  `;
  container.appendChild(cardSection);

  const cardGrid = document.createElement('div');
  cardGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-8';
  container.appendChild(cardGrid);

  cardGrid.innerHTML = `
    <div class="card">
      <h3 class="text-lg font-semibold mb-2">Default Card</h3>
      <p class="text-sm text-rewst-gray">A clean white card with subtle shadow. Use for general content containers.</p>
    </div>
    <div class="card card-success">
      <div class="flex items-center gap-2 mb-2">
        <span class="material-icons text-green-600">check_circle</span>
        <h3 class="text-lg font-semibold">Success Card</h3>
      </div>
      <p class="text-sm">Great for confirmation messages or positive status.</p>
    </div>
    <div class="card card-warning">
      <div class="flex items-center gap-2 mb-2">
        <span class="material-icons text-orange-600">warning</span>
        <h3 class="text-lg font-semibold">Warning Card</h3>
      </div>
      <p class="text-sm">Use when something needs attention but isn't critical.</p>
    </div>
    <div class="card card-error">
      <div class="flex items-center gap-2 mb-2">
        <span class="material-icons text-red-600">error</span>
        <h3 class="text-lg font-semibold">Error Card</h3>
      </div>
      <p class="text-sm">For errors, failures, or critical information.</p>
    </div>
  `;

  // ============================================
  // SECTION: Color Palette
  // ============================================
  const colorSection = document.createElement('div');
  colorSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Color Palette</h2>
    <p class="text-sm text-rewst-gray mb-4">Access via CSS vars <code>var(--rewst-teal)</code> or JS <code>RewstDOM.getColor('teal')</code></p>
  `;
  container.appendChild(colorSection);

  const colorCard = document.createElement('div');
  colorCard.className = 'card p-6 mb-8';
  container.appendChild(colorCard);

  const colors = [
    { name: 'teal', label: 'Teal', hex: '#009490' },
    { name: 'light-teal', label: 'Light Teal', hex: '#2BB5B6' },
    { name: 'fandango', label: 'Fandango', hex: '#C64A9A' },
    { name: 'orange', label: 'Orange', hex: '#F9A100' },
    { name: 'bask', label: 'Bask', hex: '#F75B58' },
    { name: 'snooze', label: 'Snooze', hex: '#504384' },
    { name: 'quincy', label: 'Quincy', hex: '#6a5445' },
  ];

  const colorGrid = document.createElement('div');
  colorGrid.className = 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4';
  colorCard.appendChild(colorGrid);

  colors.forEach(({ name, label, hex }) => {
    const swatch = document.createElement('div');
    swatch.className = 'text-center';
    swatch.innerHTML = `
      <div class="w-full h-16 rounded-lg mb-2 bg-rewst-${name}"></div>
      <p class="text-sm font-medium text-rewst-dark-gray">${label}</p>
      <p class="text-xs text-rewst-gray">${hex}</p>
    `;
    colorGrid.appendChild(swatch);
  });

  // ============================================
  // SECTION: Skeletons
  // ============================================
  const skelSection = document.createElement('div');
  skelSection.innerHTML = `
    <h2 class="text-xl font-semibold text-rewst-black mb-2">Loading Skeletons</h2>
    <p class="text-sm text-rewst-gray mb-4">Use <code>RewstDOM.showMetricSkeleton(target)</code>, <code>showChartSkeleton(target, height)</code>, <code>showTableSkeleton(target, rows)</code></p>
  `;
  container.appendChild(skelSection);

  const skelGrid = document.createElement('div');
  skelGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8';
  container.appendChild(skelGrid);

  const skelMetric = document.createElement('div');
  skelMetric.id = 'demo-skeleton-metric';
  skelGrid.appendChild(skelMetric);
  RewstDOM.showMetricSkeleton('#demo-skeleton-metric');

  const skelChart = document.createElement('div');
  skelChart.id = 'demo-skeleton-chart';
  skelChart.className = 'md:col-span-2';
  skelGrid.appendChild(skelChart);
  RewstDOM.showChartSkeleton('#demo-skeleton-chart', '180px');
}

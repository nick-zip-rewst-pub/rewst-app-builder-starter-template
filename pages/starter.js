// ============================================
// STARTER PAGE
// A blank canvas for building your first page.
// Copy this pattern when adding new pages.
// ============================================

function renderStarterPage() {
  const container = document.getElementById('page-starter');
  container.innerHTML = '';

  // ---- Your page content goes here ----

  // Example: a simple welcome card
  const hero = document.createElement('div');
  hero.className = 'card p-8 mb-8 text-center';
  hero.innerHTML = `
    <span class="material-icons text-rewst-teal mb-4" style="font-size: 64px;">rocket_launch</span>
    <h2 class="text-2xl font-semibold text-rewst-black mb-2">Your App Starts Here</h2>
    <p class="text-rewst-gray max-w-lg mx-auto mb-6">
      This is a blank starter page. Build your idea here using the components
      from the Kitchen Sink page. Check the Components tab to see everything available.
    </p>
    <button class="btn-primary" id="starter-demo-btn">
      <span class="material-icons">play_arrow</span>
      Try It
    </button>
  `;
  container.appendChild(hero);

  // Wire up the demo button
  document.getElementById('starter-demo-btn').addEventListener('click', () => {
    RewstDOM.showSuccess('It works! Now go build something awesome.');
  });

  // ---- How to add more to this page ----
  //
  // Metric cards:
  //   const card = RewstDOM.createMetricCard({ title: 'My Metric', value: '42', icon: 'insights', color: 'teal' });
  //   container.appendChild(card);
  //
  // Tables:
  //   const table = RewstDOM.createTable(myDataArray, { columns: [...], headers: {...} });
  //   container.appendChild(table);
  //
  // Run a workflow:
  //   const result = await rewst.runWorkflowSmart('workflow-id-here');
  //   console.log(result);
  //
  // Submit a form:
  //   const result = await rewst.submitForm('form-id-here', { field1: 'value' });
  //   console.log(result);
  //
  // Show alerts:
  //   RewstDOM.showSuccess('Done!');
  //   RewstDOM.showError('Oops!');
  //   RewstDOM.showWarning('Heads up');
  //   RewstDOM.showInfo('FYI');
}

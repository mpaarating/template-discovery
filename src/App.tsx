import React, { Suspense, useState } from "react";

import type { ZapTemplate } from "./types";
import mockData from "./data/templates.json";

const TemplateSearch = React.lazy(() =>
  import("./components/TemplateSearch").then((module) => ({
    default: module.TemplateSearch,
  }))
);
const TemplateDetailModal = React.lazy(() =>
  import("./components/TemplateDetailModal").then((module) => ({
    default: module.TemplateDetailModal,
  }))
);

function App() {
  const [selected, setSelected] = useState<ZapTemplate | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-1">
          <Suspense fallback={<div className="p-4">Loading search…</div>}>
            <TemplateSearch
              templates={mockData as ZapTemplate[]}
              onTemplateSelect={setSelected}
            />
          </Suspense>
        </section>
        <section className="md:col-span-2 bg-white p-6 rounded shadow">
          <Suspense fallback={<div>Loading details…</div>}>
            {selected && <TemplateDetailModal template={selected} />}
          </Suspense>
        </section>
      </main>
    </div>
  );
}

export default App;

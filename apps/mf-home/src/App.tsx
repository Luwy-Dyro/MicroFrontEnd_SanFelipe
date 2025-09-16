import React from "react";
import cssHref from "./index.css?url";
import { ensureStyle } from "./style-loader";

const HeaderApp = React.lazy(() => import("web_header/HeaderApp"));
const MenuApp = React.lazy(() => import("web_menu/MenuApp"));
const MainApp = React.lazy(() => import("web_main/MainApp"));
const FooterApp = React.lazy(() => import("web_footer/FooterApp"));

export default function App() {
  ensureStyle(new URL(cssHref, import.meta.url).toString());

  return (
    <React.Suspense fallback={<div className="p-6">Cargando Home…</div>}>
      <div className="min-h-dvh bg-slate-100">
        <div className="grid grid-cols-1 grid-rows-3 md:grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr_auto] md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr] gap-x-6">
          <section className="row-start-1 col-span-2 shadow">
            <HeaderApp />
          </section>

          <section className="row-start-2 col-start-1 bg-base-100  shadow overflow-auto">
            <MenuApp />
          </section>

          <section className="row-start-2 col-start-2 flex flex-col gap-4 justify-between">
            <main className="pt-6 overflow-auto min-h-0">
              <MainApp />
            </main>

            <footer>
              <FooterApp />
            </footer>
          </section>
        </div>
      </div>
    </React.Suspense>
  );
}

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
      <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[280px_1fr] gap-4 min-h-[calc(100dvh-2rem)]">
        <section className="row-start-1 col-span-2 shadow">
          <HeaderApp />
        </section>

        <section className="row-start-2 col-start-1 bg-base-100  rounded-box shadow overflow-auto">
          <MenuApp />
        </section>

        <section className="row-start-2 col-start-2 flex flex-col gap-4">
          <main className="bg-white/95 rounded-xl border shadow p-6 overflow-auto min-h-0">
            <MainApp />
          </main>

          <footer className="bg-white/95 rounded-xl border shadow p-4">
            <FooterApp />
          </footer>
        </section>
        {/* <div className="grid grid-cols-[300px_1fr] gap-3 min-h-0">
            <section className="grid grid-rows-[1fr_auto] gap-3 min-h-0">

            

             
            </section>
        </div>
         */}
      </div>
    </React.Suspense>
  );
}

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
      <div className="bg-slate-100">
   
        <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr] gap-x-6 content-start">
          
       
          <section className="col-start-1 md:col-span-2 shadow">
           <HeaderApp />
           

          </section>

          <section className="col-start-1 row-start-2 md:self-stretch h-full bg-base-100 shadow ">
            <MenuApp />
          </section>

         <section className="col-start-1 row-start-3 md:col-start-2 md:row-start-2 grid grid-rows-[1fr_auto] min-h-0">
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

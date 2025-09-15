import React from 'react'
import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';


const HeaderApp = React.lazy(() => import('web_header/HeaderApp'))
const MenuApp   = React.lazy(() => import('web_menu/MenuApp'))
const MainApp   = React.lazy(() => import('web_main/MainApp'))
const FooterApp = React.lazy(() => import('web_footer/FooterApp'))


export default function App() {
ensureStyle(new URL(cssHref, import.meta.url).toString());
  

  return (
    <React.Suspense fallback={<div className="p-6">Cargando Home…</div>}>
      <div className="min-h-dvh grid grid-rows-[auto_1fr] gap-3 p-3 ">
        <header className="bg-white/95 border rounded-xl shadow p-2">
          <HeaderApp />
        </header>

        <div className="grid grid-cols-[300px_1fr] gap-3 min-h-0">

          
          <MenuApp />

            <section className="grid grid-rows-[1fr_auto] gap-3 min-h-0">

              <main className="bg-white/95 rounded-xl border shadow p-6 overflow-auto min-h-0">
                  <MainApp />
                </main>
                <footer className="bg-white/95 rounded-xl border shadow p-4">
                  <FooterApp />
                </footer>
            </section>
        </div>
        
       
           
      </div>
    </React.Suspense>
  )
}

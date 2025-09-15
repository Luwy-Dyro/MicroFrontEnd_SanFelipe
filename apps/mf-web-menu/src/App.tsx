import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';
import Item from './item.tsx';




export default function MenuApp() {
  ensureStyle(new URL(cssHref, import.meta.url).toString());


  return (
    <aside className="border p-4 min-h-0 bg-primary text-primary-content">
      <div className="p-4 font-semibold text-lg flex items-center justify-between">
        <span>Menú</span>
        <button className="btn btn-ghost btn-xs text-primary-content/80">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <ul className="menu px-2">
          <Item icon="fa-solid fa-house" text="Inicio" to="/home" exact />

          <Item
            icon="fa-solid fa-notes-medical"
            text="Ambulatorio"
            
            state={{ tipoAtencion: 'Ambulatorio' }}
          />
          <Item icon="fa-solid fa-hospital" text="Hospital"/>
          <Item icon="fa-solid fa-truck-medical" text="Emergencia"/>

          <li className="divider opacity-10" />   
          <Item icon="fa-solid fa-calendar-days" text="Mi Agenda"  disabled />
          <Item icon="fa-solid fa-clock-rotate-left" text="Data Histórica"  disabled/>
      </ul>
    </aside>
  )
}

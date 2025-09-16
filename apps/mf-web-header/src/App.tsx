import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';

ensureStyle(new URL(cssHref, import.meta.url).toString());


export default function HeaderApp() {
  return (

    <header className="bg-white/95 shadow p-2">
      <div className="navbar bg-base-100 px-4">
        <div className="flex-1">
          <a href="/home">
          <img src="https://citaweb.clinicasanfelipe.com/CSF_CITAS/Resources/Images/Layout/logo-clinicasanfelipe.png" className="mr-3" alt="Clínica"  />
          </a>
          
        </div>

        <div className="flex-none gap-2">
          <button className="btn btn-ghost btn-circle">
            <i className="fa-regular fa-bell"></i>
          </button>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <i className="fa-solid fa-user-circle text-xl"></i>
              <span className="hidden md:inline ml-2">Hola, Administradopr</span>
              <i className="fa-solid fa-chevron-down ml-2"></i>
            </div>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-56 p-2 shadow">
              <li><a><i className="fa-regular fa-id-badge"></i> Perfil</a></li>
              <li><a><i className="fa-solid fa-gear"></i> Configuración</a></li>
              <li><a onClick={() => { localStorage.removeItem('jwt'); location.href='/login' }}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Salir
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>

  )
}

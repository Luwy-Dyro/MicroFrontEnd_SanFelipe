import cssHref from "./index.css?url";
import { ensureStyle } from "./style-loader";

ensureStyle(new URL(cssHref, import.meta.url).toString());

export default function HeaderApp() {
  return (
    <header className="bg-white/95 shadow px-5 py-4">
      <nav className="navbar bg-base-100  flex justify-between p-0 m-0">
        <div>
          <a href="/home" className="block h-auto m-0 p-0">
            <img
              src="https://citaweb.clinicasanfelipe.com/CSF_CITAS/Resources/Images/Layout/logo-clinicasanfelipe.png"
              alt="Clínica san Felipe"
              className="m-0 h-[65px]"
            />
          </a>
        </div>

        <div className="flex gap-2 grid-row-gap justify-center items-center">
          <button className="btn btn-ghost btn-circle">
            <i className="fa-regular fa-bell text-xl text-gray-500"></i>
          </button>

          <i className="fa-solid fa-user-circle text-3xl text-csf-verde"></i>

          <span className="hidden md:inline ml-2 text-csf-azul text-base mr-3">
            Hola,
          </span>

          <div>
            <span className="hidden md:inline font-bold  text-csf-azul text-lg">
              LUIS HUAMAN
            </span>
          </div>

          <div className="dropdown dropdown-end hover:bg-white">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <i className="fa-solid fa-chevron-down "></i>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] w-56 p-2 shadow"
            >
              <li>
                <a>
                  <i className="fa-regular fa-id-badge"></i> Perfil
                </a>
              </li>
              <li>
                <a>
                  <i className="fa-solid fa-gear"></i> Configuración
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    location.href = "/login";
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Salir
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

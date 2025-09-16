import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "./api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

export default function LoginApp() {
  const [usuario, setUsuario] = useState("test");
  const [perfil, setPerfil] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = await loginRequest(usuario, perfil);
      localStorage.setItem("jwt", token);
      navigate("/home", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Error de autenticación");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="back_body min-h-dvh">
        <div className="container mx-auto">
          <main className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 md:place-items-center">
            <div className="flex flex-col justify-center align-middle w-[320px] mx-auto my-6 md:my-0">
              <div>
                <img
                  src="https://citaweb.clinicasanfelipe.com/CSF_CITAS//Resources/Images/Login/logo.png"
                  alt="Clinica San Felipe"
                />
              </div>
              <h1 className="text-gray-200 text-5xl mt-2 p-0">Bienvenido</h1>
              <p className="text-gray-200 mx-1">
                En Clinica San Felipe te vamos a cuidar
              </p>
            </div>

            <div className="md:min-h-dvh mx-auto w-[calc(100%-10%)] md:w-[calc(100%-20%)] md:mr-50 md:place-content-center ">
              <form
                onSubmit={onSubmit}
                className="w-full flex flex-col bg-white shadow-xl rounded-xl p-10 md:p-17"
              >
                <div className="mb-7">
                  <b className="text-3xl block text-csf-azul">Iniciar sesión</b>
                  <p className="text-gray-600">
                    Iniciar sesión acceder a la História Clinica Electrónica
                    (HCE){" "}
                  </p>
                </div>

                <div className="flex flex-col mb-3">
                  <label className="absolute -mt-3 ml-2 px-2 text-sm text-csf-azul font-normal bg-white">
                    Login
                  </label>
                  <input
                    className="w-full rounded-md  border px-4 py-2 mb-4 outline-none  bg-white focus:ring-blue-600 text-gray-400"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingrese su nombre"
                    required
                  />
                </div>

                <div>
                  <label className="absolute -mt-3 ml-2 px-2 text-sm text-csf-azul font-normal bg-white">
                    Tipo
                  </label>
                  <select
                    className="w-full rounded-md bg-white border px-4 py-2 mb-8 outline-none  focus:ring-blue-600  text-gray-400"
                    value={perfil}
                    onChange={(e) => setPerfil(e.target.value)}
                  >
                    <option value="admin">admin</option>
                    <option value="medico">medico</option>
                    <option value="asistente">asistente</option>
                  </select>
                </div>

                {error && (
                  <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary rounded-3xl border-0 bg-csf-verde hover:bg-csf-azul  focus:outline-2 focus:outline-offset-2 w-full justify-center text-white "
                  disabled={loading}
                >
                  {loading ? (
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-right-to-bracket"></i>
                  )}
                  <span> {loading ? "Ingresando…" : "Ingresar"}</span>
                </button>
              </form>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}

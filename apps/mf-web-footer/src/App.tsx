import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';

ensureStyle(new URL(cssHref, import.meta.url).toString());


export default function FooterApp() {
  return (
    <div className="footer footer-center p-4 text-sm text-base-content/70">
      <aside>Copyright © {new Date().getFullYear()} Clínica San Felipe — Todos los derechos reservados</aside>
    </div>
  )
}

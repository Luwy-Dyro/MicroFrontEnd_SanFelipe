// src/MenuApp.tsx
import { useEffect, useState } from 'react';
import cssHref from './index.css?url';
import { ensureStyle } from './style-loader';
import Item from './item';
import api from './apiClient';                    
import type { PerfilResponse } from './types';
import { mapToMenuModel } from './menu-map';

type MenuAppProps = {
  perfil?: string; 
};

export default function MenuApp({ perfil = 'admin' }: MenuAppProps) {
  ensureStyle(new URL(cssHref, import.meta.url).toString());

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [top, setTop] = useState<any[]>([]);
  const [bottom, setBottom] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr(null);

    (async () => {
      try {
        const { data } = await api.get<PerfilResponse>('/TestFrontEnd/perfil', {
          params: { perfil },
        });
        if (!mounted) return;
        const { topItems, bottomItems } = mapToMenuModel(data.subgrupos || []);
        setTop(topItems);
        setBottom(bottomItems);
      } catch (e: any) {
        if (!mounted) return;
        setErr('No se pudo cargar el menú.');
        setTop([]);
        setBottom([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [perfil]);

  return (
    <aside className="border p-4 min-h-0 bg-primary text-primary-content">
      <div className="p-4 font-semibold text-lg flex items-center justify-between">
        <span>Menú</span>
        <button className="btn btn-ghost btn-xs text-primary-content/80">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

   
      {loading && (
        <ul className="menu px-2 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="h-10 rounded-xl bg-base-100/10 mb-2" />
          ))}
        </ul>
      )}

      {!loading && (
        <ul className="menu px-2">
        
          {top.map((it) => (
            <Item
              key={it.key}
              icon={it.icon}
              text={it.text}
              to={it.to}
              state={it.state}
            />
          ))}

        
          {bottom.length > 0 && <li className="divider--menu opacity-10" />}

       
          {bottom.map((it) => (
            <Item
              key={it.key}
              icon={it.icon}
              text={it.text}
              to={it.to}
              state={it.state}
             
            />
          ))}

       
          {err && <li className="mt-2 text-error text-sm">{err}</li>}
        </ul>
      )}
    </aside>
  );
}

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
    <>
    <aside className="min-w-[280px] flex flex-col h-full w-full p-2 min-h-0 bg-csf-azul text-primary-content">
  
      {loading && (
        <ul className="menu overflow-auto py-5 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="h-10 rounded-xl bg-base-100/10 mb-2" />
          ))}
        </ul>
      )}

      {!loading && (
        <ul className="overflow-auto py-5">
        
          {top.map((it) => (
            <Item
              key={it.key}
              icon={it.icon}
              text={it.text}
              to={it.to}
              state={it.state}
            />
          ))}

        
          {bottom.length > 0 && <li className="border-1 text-emerald-700 w-2/3 mx-auto my-3"/>}

       
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


    </>
  );
}

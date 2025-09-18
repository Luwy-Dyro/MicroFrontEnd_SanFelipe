# clinicsf-frontapp (Monorepo)

Resumen rápido: este monorepo contiene varios microfrontends (MF) y un shell (host). Cada MF habitualmente se ejecuta en su propio puerto en dev (Vite). A continuación está el árbol de apps y los puertos confirmados / recomendaciones para desarrollo local.

# clinicsf-frontapp — Monorepo (Resumen rápido)

Este README lista los microfrontends (MF) del monorepo y los puertos usados en desarrollo, además de comandos útiles y notas de despliegue.

## Árbol de apps (ubicación: apps/)
- apps/
  - shell/ ...................... Host (Shell) — puerto dev: 5000
  - mf-login/ ................... Microfrontend Login — puerto dev: 5001
  - mf-home/ .................... Microfrontend Home — puerto dev: 5102
  - mf-web-header/ .............. Microfrontend Header — puerto dev: 5103 (sugerido)
  - mf-web-main/ ................ Microfrontend Main — puerto dev: 5104 (sugerido)
  - mf-web-menu/ ................ Microfrontend Menu — puerto dev: 5105 (sugerido)
  - mf-web-footer/ .............. Microfrontend Footer — puerto dev: 5106 (sugerido)
  - mf-atencion/ ................ Microfrontend Atención — preview / serve:dist puerto: 5202
  - mf-datospaciente/ ........... Microfrontend DatosPaciente — puerto a configurar
  - mf-bases/ ................... Librería / MF — puerto a configurar
  
> Nota: algunos puertos son los confirmados durante pruebas; otros son sugeridos y deben reconciliarse con cada `apps/<app>/vite.config.ts`.

## Remote entry filename
- Comprueba en cada `vite.config.ts` el valor `filename` del plugin `federation`.
  - Comúnmente usado en este repo en dev: `assets/remoteEntry.js`
  - Asegúrate que el shell apunte a la misma URL (`http://localhost:<port>/assets/remoteEntry.js`) o a `/remoteEntry.js` si esa es la configuración.

## Comandos por app (desarrollo local)
- Instalar deps (desde la raíz, usa workspaces):
  npm install
- Levantar un microfrontend individual:
  cd apps/mf-login
  npm run dev
- Levantar el shell:
  cd apps/shell
  npm run dev

## Scripts útiles (ejemplos para añadir al package.json raíz)
- Ejecutar build en todas las apps (usar paths reales `./apps/<app>`):
  "build-all": "concurrently \"npm --prefix ./apps/mf-home run build\" \"npm --prefix ./apps/mf-login run build\" \"npm --prefix ./apps/mf-web-main run build\" \"npm --prefix ./apps/mf-web-menu run build\" \"npm --prefix ./apps/mf-web-header run build\" \"npm --prefix ./apps/mf-web-footer run build\" \"npm --prefix ./apps/mf-datospaciente run build\" \"npm --prefix ./apps/mf-bases run build\" \"npm --prefix ./apps/mf-atencion run build\""
- Servir todos los dist (después de `build-all`):
  "serve-all": "concurrently \"npm --prefix ./apps/mf-home run serve:dist\" \"npm --prefix ./apps/mf-login run serve:dist\" \"npm --prefix ./apps/mf-web-main run serve:dist\" \"npm --prefix ./apps/mf-web-menu run serve:dist\" \"npm --prefix ./apps/mf-web-header run serve:dist\" \"npm --prefix ./apps/mf-web-footer run serve:dist\" \"npm --prefix ./apps/mf-datospaciente run serve:dist\" \"npm --prefix ./apps/mf-bases run serve:dist\" \"npm --prefix ./apps/mf-atencion run serve:dist\""

(Instala `concurrently` como devDependency en la raíz si usarás estos scripts.)




## Correr 
````

cd C:/....\clinicsf-frontapp\apps\<app-name>
npm install     

SHELL
npm run dev

MicroFrontEnds
npm run serve:dist
````

## Env
````
.env.example 

Cambiar de nombre a 

.env.local

````

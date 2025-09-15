# clinicsf-frontapp (Monorepo)

Resumen rápido: este monorepo contiene varios microfrontends (MF) y un shell (host). Cada MF habitualmente se ejecuta en su propio puerto en dev (Vite). A continuación está el árbol de apps y los puertos confirmados / recomendaciones para desarrollo local.

## Estructura (apps/)
- apps/
  - shell/ ...................... Host (Shell) — puerto: 5000 (confirmado)
  - mf-login/ ................... Microfrontend Login — puerto: 5001 (confirmado)
  - mf-home/ .................... Microfrontend Home — puerto: 5102 (confirmado)
  - mf-web-header/ .............. Microfrontend Web Header — puerto sugerido: 5103
  - mf-web-main/ ................ Microfrontend Web Main — puerto sugerido: 5104
  - mf-web-menu/ ................ Microfrontend Web Menu — puerto sugerido: 5105
  - mf-web-footer/ .............. Microfrontend Web Footer — puerto sugerido: 5106
  - mf-atencion/ ................ (otro MF) — puerto a definir
  - mf-bases/ ................... (librería / MF) — puerto a definir
  - mf-datospaciente/ ........... (otro MF) — puerto a definir

> Nota: los puertos con "confirmado" se obtuvieron de los dev servers que ejecutaste. Los puertos "sugeridos" se usan en ejemplos/configs y conviene alinearlos con cada vite.config.ts.

## URLs de desarrollo (ejemplos)
- Shell: http://localhost:5000
- Login: http://localhost:5001
- Home:  http://localhost:5102
- Header: http://localhost:5103
- Main: http://localhost:5104
- Menu: http://localhost:5105
- Footer: http://localhost:5106

Asegúrate de que los remotes del shell apunten a las URLs exactas (incluyendo `/remoteEntry.js` o `/assets/remoteEntry.js` según tu filename en cada vite.config):

Ejemplo (apps/shell/vite.config.ts -> remotes):
````typescript
remotes: {
  login: 'http://localhost:5001/assets/remoteEntry.js',
  home:  'http://localhost:5102/assets/remoteEntry.js',
  web_header: 'http://localhost:5103/assets/remoteEntry.js',
  web_main:   'http://localhost:5104/assets/remoteEntry.js',
  web_menu:   'http://localhost:5105/assets/remoteEntry.js',
  web_footer: 'http://localhost:5106/assets/remoteEntry.js',
}

````



## Correr 
````

cd C:/....\clinicsf-frontapp\apps\<app-name>
npm install     

SHELL
npm run dev

MF
npm run serve:dist
````

## Correr 
````
.env.example 

Cambiar de nombre a 

.env.local

````
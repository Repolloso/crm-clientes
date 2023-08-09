# CRM-Clientes
CRM-Clientes es un CRUD hecho con React router DOM, TailwindCSS, JSON-Server, React y Vite

## Instrucciones 

1 - Clonamos el repositorio en el fichero deseado escribiendo esta linea de comando en la termina --> git clone https://github.com/Repolloso/crm-clientes.git y corremos el comando --> npm i

2 - Este proyecto al utilizar un fake REST API (JSON-server) se debe instalar esta dependencia en caso de no tenerla --> npm install -g json-server, una vez instalado debe inicializarse el servidor con este comando --> json-server --watch db.json

3 - Una vez instalado e inicializado el json-server, se debe crear un archivo .env (variable de entorno) en la raiz del proyecto y crear esta variable VITE_API_URL = http://localhost:3000/clientes (esta url se las da el json-server cuando lo inicializan)

4 - Por ultimo, debemos iniciar el servidor local con --> npm run dev

5 - A probar!

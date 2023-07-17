import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, { Action as nuevoClienteAction } from './pages/NuevoCliente'
import Index, { Loader as clientesLoader } from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditarCliente, { Loader as editarClienteLoader, Action as actualizarClienteAction } from './pages/EditarCliente'
import { Action as eliminarClienteAction } from './components/Cliente'

// En la carpeta components va todo archivo que va a ser reutilizable en el tiempo
// En la carpeta pages va todo archivo que va a ser una pagina de la aplicacion (no se va a reutilizar en el tiempo)

//createBrowserRouter permite defiinir un router por medio de objetos
//RouterProvider permite definir el contexto del router (es el centro de la aplicacion) lo que era antes el App, con este fluye los datos a traves de los componentes
// Outlet es el componente que se encarga de renderizar el componente que corresponde a la ruta que se esta visitando

// Actions --> actua como procesador de formularios y hace peticiones del tipo POST, PUT, DELETE
// Loaders --> actua como useEffect y hace peticiones del tipo GET (APIs, base de datos, etc)

// router es un objeto que contiene las rutas de la aplicacion
const router = createBrowserRouter([
  //path: es la ruta de la aplicacion
  //action: es la funcion que se ejecuta cuando se entra a esa ruta
  //element es el componente que se va a renderizar
  //children: es un arreglo de objetos que contiene las rutas hijas de la ruta padre, este children es el outlet del componente padre (Layout)
  {
    path: '/', 
    element: <Layout />,
    children: [
      {
        //index: true significa que es la ruta por defecto
        // Aca puedo setear que componente quiero que se renderice por defecto (/), heredando el layout
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />,

      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        // action: nuevoClienteAction es la funcion que se ejecuta cuando se entra a la ruta /clientes/nuevo (esta funcion se ejecuta cuando le mandamos enviar en el formulario)
        action: nuevoClienteAction,
      },
      //routing dinamico para editar el cliente, el id es el parametro que se pasa a la ruta y para hacer dinamico un parametro se usa :nombreParametro
      {
        path: '/clientes/:id/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: actualizarClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: 'clientes/:id/eliminar',
        action: eliminarClienteAction,
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

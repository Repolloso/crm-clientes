import { useLoaderData } from "react-router-dom"
import Cliente from "../components/Cliente"
import { obtenerClientes } from "../services/Clientes"

// useLoaderData es un hook que permite obtener los datos que se pasaron desde el loader de la ruta

export async function Loader() {
    // Este es el loader de la ruta, aqui se pueden hacer peticiones a una API o a una base de datos, en este caso se va a simular una peticion a una API o a una base de datos (basicamente permite hacer peticiones http, en este caso seria una peticion GET)
    // Para acceder al env de vite se usa import.meta.env.VITE_API_URL
    const clientes = await obtenerClientes()
    return clientes
}

const Index = () => {

    // data es el objeto que se paso desde el loader de la ruta
    //useLoaderData es un hook que permite obtener los datos que se pasaron desde el loader de la ruta (es casi como un useEffect, se usa a partir de ahora este hook en vez del useEffect)

    const clientes = useLoaderData()

    return (
        <>
        {/* Este es el componente principal que se va a renderizar en la ruta /, el layout es el padre de todos, el index es solo la pagina o el contenido a mostrar principal */}
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administrar Clientes</p>

            {
                clientes.length
                ? 
                    (
                        <>
                            <table className="w-full bg-white shadow mt-5 table-auto">
                                <thead className="bg-blue-800 text-white">
                                    <tr>
                                        <th className="p-2">Clientes</th>
                                        <th className="p-2">Contactos</th>
                                        <th className="p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clientes.map(cliente => (
                                            <Cliente 
                                                cliente={cliente} 
                                                key={cliente.id}
                                            />
                                        ))
                                    }       
                                </tbody>

                            </table>
                        </>
                    ) 
                : 
                    (
                        <p className="text-center mt-10">No hay clientes aún</p>
                    )
            }

        </>
    )
}

export default Index
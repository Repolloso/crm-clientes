import { Outlet, Link, useLocation } from "react-router-dom"

//Link es un componente que permite navegar entre rutas y renderizar el componente que corresponde a esa ruta (es la forma mas optimizada, no se usa a)

const Layout = () => {

    // useLocation es un hook que permite obtener la ruta actual
    const location = useLocation()

    // hash es el fragmento de la url que esta despues del # (es util para hacer scroll a un elemento en especifico)
    // search es el fragmento de la url que esta despues del ?
    // pathname es la ruta actual
    // key es un identificador unico que se le asigna a cada ruta (es util para hacer animaciones)
    // state es un objeto que permite pasar datos entre rutas (es util para pasar datos entre rutas)

    return (
        <div className="md:flex md:min-h-screen"> 
             {/* Todo lo que pongas fuera del outlet se va a renderizar en todos lados (los hijos van a tener el mismo laytout)  */}
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">CRM - Clientes</h2>

                <nav className="mt-10">
                    <Link className={`${location.pathname === '/' ? 'text-blue-300 hover:text-blue-500' : 'text-white hover:text-blue-500'} text-2xl block mt-2`} to="/">Clientes</Link>
                    <Link className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300 hover:text-blue-500' : 'text-white hover:text-blue-500'} text-2xl block mt-2`} to="/clientes/nuevo">Nuevo Cliente</Link>
                    {/* <NavLink className={({isActive}) => isActive ? 'text-blue-300' : 'text-white'}>Nuevo Cliente</NavLink> --> Esta es otra forma de hacer el ternario de arriba pero usando el navlink que ya incorpora de default esta funcionalidad --> no es lo mas eficiente de usar, tiene fallos */}
                </nav>
            </aside>

            <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                {/* Es un contenedor dinamico (placeholder)*/}
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
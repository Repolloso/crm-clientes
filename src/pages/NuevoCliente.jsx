import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../services/Clientes"

// useNavigate es un hook que permite navegar entre rutas sin necesidad de usar el componente Link
// redirect es una funcion que permite redireccionar a otra ruta y es una alternativa a useNavigate, se usa con los loaders (useLoaderData)

export async function Action({request}) {
    // request es el objeto que se paso desde el componente Formulario (que pasa por la ruta como action en main.jsx y luego se pasa al componente Formulario como prop)
    // formData es un objeto que permite obtener los datos del formulario
    const formData = await request.formData() 
    const datos = Object.fromEntries(formData)

    const email = formData.get('email');
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    const errores = [];

    if (!regex.test(email)) {
        errores.push("El email no es valido")
    }
    
    if (Object.values(datos).includes('')) {
        errores.push("Todos los campos son obligatorios")
    }

    // Retornar un objeto con los errores
    if (Object.keys(errores).length) {
        return errores
    }

    // Si no hay errores, agregar el cliente
    await agregarCliente(datos)

    // Redireccionar, siempre todos los metodos de react-router-dom se deben usar dentro de un componente y retornar algo, redirect nada mas se usa cuando se usa el loader o action
    return redirect('/')
}

const NuevoCliente = () => {

    const errores = useActionData()
    const navigate = useNavigate()

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate('/')}
                    //onClick={() => navigate(-1)} //Esta es otra forma de volver a la ruta anterior
                >
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
                {/* Si hay errores, mostrar el mensaje */}
                {errores?.length && errores.map((error, i) => (
                    <Error key={i} error={error} />)
                )}
            
                <Form
                // el componente Form busca de forma automatica el action y el method del formulario 
                    method="POST"
                >
                    <Formulario />

                    <input 
                        type="submit" 
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 cursor-pointer"
                        value="Registrar Cliente"
                    />
                </Form>
            </div>
        </>
    )
}

export default NuevoCliente
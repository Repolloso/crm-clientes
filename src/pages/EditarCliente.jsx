import { useLoaderData, Form, useNavigate, redirect, useActionData } from "react-router-dom"
import { obtenerCliente, editarCliente } from "../services/Clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function Loader({params}) {
    // Obtengo el id que le paso a la ruta
    const cliente = await obtenerCliente(params.id)

    if (Object.values(cliente).length === 0) {
        // Si no hay resultados, lanzo un error
        throw new Response('', { 
            status: 404,
            statusText: 'Cliente no existente'
        })
    }
    return cliente
}

export async function Action({request, params}) {
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

    await editarCliente(datos, params.id)

    return redirect('/')
}

const EditarCliente = () => {

    const cliente = useLoaderData()
    const errores = useActionData()
    const navigate = useNavigate()

    return (
        <>
            { cliente.error && <Error mensaje={cliente.error} /> }

            <h1 className="font-black text-4xl text-blue-900 mb-10">Editar Cliente</h1>
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
                    <Formulario cliente={cliente}/>

                    <input 
                        type="submit" 
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:bg-blue-700 cursor-pointer"
                        value="Editar Cliente"
                    />
                </Form>
            </div>
        </>
    )
}

export default EditarCliente
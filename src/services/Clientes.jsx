import axios from "axios"

export async function obtenerClientes() {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}`)
        const clientes = await respuesta.json()
        return clientes
    } catch (error) {
        console.log(error)
    }
}

export async function agregarCliente(datos) {
    try {  
        // do post data with axios
        const respuesta = await axios.post(`${import.meta.env.VITE_API_URL}`, datos)
        return respuesta
    } catch (error) {
        console.log(error)
    }
}

export async function obtenerCliente(id) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
        const cliente = await respuesta.json()
        return cliente
    } catch (error) {
        console.log(error)
    }
}

export async function editarCliente(datos, id) {
    try {
        const respuesta = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, datos)
        return respuesta
    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id) {
    try {
        const respuesta = await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`)
        return respuesta
    } catch (error) {
        console.log(error)
    }
}
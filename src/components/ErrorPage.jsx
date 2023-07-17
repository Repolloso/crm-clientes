import { useRouteError } from "react-router-dom";

// useRouteError es un hook que permite obtener el error que se paso desde el errorElement de la ruta

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">Error</h1>
            <p className="text-center">{error.message || error.statusText}</p>
        </div>
    )
}
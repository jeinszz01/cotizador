import { useCallback, useMemo, useRef } from "react" // para evitar hacer renders o q se actualize antes q lo necesitemos.
import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from "../constants"

const Resultado = () => {
    
    const { resultado, datos } = useCotizador()
    const { marca, year, plan } = datos

    //IMPORTADO LOS OBJETOS DE MARCAS Y PLANES, FILTRAMOS PARA SELECCIONAR LA POSICION CORRECTA YA Q INICIA SIEMPRE DESDE 0
    const [nombreMarca] = useCallback(MARCAS.filter(m => m.id === Number(marca)), [resultado]) // lo ponemos entre [nombreMarca] para obtener solo el objeto sin los []
  //const [nombreMarca] = useMemo( () => MARCAS.filter(m => m.id === Number(marca)), [resultado]) // funciona tambien con useMemo
    //useCallback, envuelve una funcion y luego similar a un useEffect definimos cuando cambie resultado se ejecute.
    const yearRef = useRef(year)
    const planRef = useRef(plan)

    if (resultado === 0) return null
    
    //Marca: {marca} ;si en el value estariamos agarrando el nombre y no el id. evitariamos filtrar. ejemplo con el plan
    return (
        <div className="bg-gray-100 text-center mt-5 p-5 shadow">
            <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
            
            <p className="p-2"><span className="font-bold">Marca: </span>{nombreMarca.nombre}</p>
            <p className="p-2"><span className="font-bold">Plan: </span>{planRef.current}</p>
            <p className="p-2"><span className="font-bold">Año del Auto: </span>{yearRef.current}</p>
            <p className="p-2 text-2xl"><span className="font-bold">Total Cotización: </span>{resultado}</p>
        </div>
    )
}

export default Resultado
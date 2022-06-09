import { createContext, useState } from 'react'
import { diferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [ datos, setDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const handleChangeDatos = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const [ error, setError ] = useState('')
    const [ resultado, setResultado] = useState(0)
    const [ cargando, setCargando] = useState(false) // Spiner

    const cotizarSeguro = () => {
        // Una base
        let resultado = 2000
        // Obtener diferencia de años
        const diferencia = diferenciaYear(datos.year)
        // Hay q restar el 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100
        //diferencia = 2022 - 2021 = 1,
        //resultado = (1*3)*2000/100 = 60; => 2000 - 60 = 1940.
        //diferencia es el año seleccionado menos el año actual, -= va ser el resultado menos toda la operacion de la derecha.
        
        // Europeo 30%
        // Americano 15%
        // Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        
        // Básico 20% más
        // Completo 50% más
        resultado *= calcularPlan(datos.plan)

        // Formatear dinero
        // resultado = resultado.toFixed(2) //con esto imprimimos el dinero total con 2 decimales
        resultado = formatearDinero(resultado)

        // spiner
        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 2000);
        
    }

    return (
        <CotizadorContext.Provider
            value={{
                // modal,
                // cambiarModal
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}


export {
    CotizadorProvider
}

export default CotizadorContext

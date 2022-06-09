import { Fragment } from 'react'
import { MARCAS, YEARS, PLANES } from '../constants/'
import useCotizador from '../hooks/useCotizador'
import Error from './Error'

const Formulario = () => {
   
    //const { hola, modal, cambiarModal } = useCotizador()
    //console.log(modal)

    const { datos, handleChangeDatos, error, setError, cotizarSeguro } = useCotizador()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(Object.values(datos).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        cotizarSeguro()
    }

    return (
        <>
            {/* <button type='submit' onClick={cambiarModal}>
                Cambiar Modal XD
            </button> */}
            {error && <Error/>}
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-400 uppercase">Marca</label>
                    <select name="marca" className="w-full p-3 bg-white border border-gray-200" value={datos.marca} onChange={e => handleChangeDatos(e)}>
                        <option value=''>-- seleccione la Marca --</option>
                        {MARCAS.map(marca => (
                            <option key={marca.id} value={marca.id}>{marca.nombre}</option> //value={marca.nombre} para evitar estar filtrando x el id
                        ))}
                    </select>
                </div>

                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-400 uppercase">Año</label>
                    <select name="year" className="w-full p-3 bg-white border border-gray-200" value={datos.year} onChange={e => handleChangeDatos(e)}>
                        <option value=''>-- seleccione el Año --</option>
                        {YEARS.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="my-5">
                    <label className="block mb-3 font-bold text-gray-400 uppercase">Elije un Plan :)</label>
                    <div className="flex gap-3 items-center">
                        {PLANES.map(plan => (
                            <Fragment key={plan.id}>
                                <label>{plan.nombre}</label>
                                <input type='radio' name='plan' value={plan.nombre} onChange={e => handleChangeDatos(e)} />
                            </Fragment> //con value .nombre
                        ))}
                    </div>
                </div>

                <input
                    type='submit' 
                    className='w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold'
                    value='Cotizar'
                />
                
            </form>
        </>
    )
}

export default Formulario
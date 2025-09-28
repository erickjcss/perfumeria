import React from 'react'

const PerfumesAux = () => {
  return (
    <div className=' mt-8 bg-red-200 relative right-[35px] min-[320px]:right-[38px] min-[350px]:right-[40px] min-[360px]:right-[42px] min-[390px]:right-[44px] min-[410px]:right-[46px] min-[430px]:right-[48px] min-[450px]:right-[50px] min-[470px]:right-[52px] min-[490px]:right-[54px] min-[510px]:right-[56px] min-[530px]:right-[58px] min-[550px]:right-[60px] min-[570px]:right-[62px] min-[510px]:right-[56px] min-[530px]:right-[58px] min-[585px]:right-[64px] w-[100vw] flex justify-evenly ancho '>
        <article className="inline-flex ">
            <div className='inline-flex text-[10px]'>
                <h3 className='ml-2 '>Filtrar por:</h3>
                <li className='inline-flex'>
                    <ul className='mb-4 relative right-8 inline-flex'>Disponibilidad
                       <li> <select name="" id="Disponible">
                            <option value="Disponible">Disponible</option>
                            <option value="Agotado">Agotado</option>
                        </select></li>
                        <li>Precio Rango de precio: <input type="text" className='inline-block w-8'/>- <input className='inline-block w-8 ' type="text" /></li>
                        <li>Género: <input type="text" className='inline-block w-8'/>- <input className='inline-block w-8 ' type="text" /></li>
                    </ul>

                    <ol></ol>
                    <ol></ol>
                </li>
            </div>
        </article>
        <article className="flex justify-evenly">
            <form action="
        ">
            
            <label htmlFor="Ordenar"></label>
          
            <select id='Orden' className='w-32 h-8 text-[10px]'>
                <option className='options ' value="PrecioC">Precio (Más costoso - Menos costoso)</option>
                <option value="PrecioB">Precio (Más costoso - Menos costoso)</option>
                <option value="Orden alfabético (A-Z)">Alfabéticamente (A-Z)</option>
                <option value="Orden alfabético (Z-A)">Orden alfabético (Z-A)</option>
                <option value="Más populares">Popularidad</option>
               
            </select>
        </form>
        </article>
   
    </div>
  )
}

export default PerfumesAux

import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const Perfumes = (perfumes,setPerfumes) => {
    const width = useWindowWidth();
    const [ordenar,setOrdenar]=useState(false);
    const [disponibilidad,setDisponibilidad]=useState(false);
    const [disponibles,setDisponibles]=useState(false);
    const [agotados,setAgotados]=useState(false);
    const [precio,setPrecio]=useState(false);
    const [genero,setGenero]=useState(false);
    const [calidad,setCalidad]=useState(false);
    const [altura,setAltura]=useState(200);
    const [cambioD,setCambioD]=useState(false);
    const [cambioP,setCambioP]=useState(false);
    const [cambioG,setCambioG]=useState(false);
    const [cambioC,setCambioC]=useState(false);
    const [calidadV, setCalidadV] = useState([]);
    const [generoV, setGeneroV] = useState([]);
    const [precioMax, setPrecioMax] = useState([]);
    const [precioMin, setPrecioMin] = useState([]);
    const [ordenarrV,setOrdenarrV]=useState('precio_desc');

    const [ordenarCaros,setOrdenarCaros]=useState();
useEffect(()=>{
   if(precioMin<0){
    toast.error("Este campo no acepta valores negativos")
    setPrecioMin(precioMin*(-1))
  }
  if(precioMax<0){
    toast.error("Este campo no acepta valores negativos")
    setPrecioMax(precioMax*(-1))
  }

  if(precioMax!=""&&precioMax!=" "){
  if(precioMax<precioMin){
    toast.error("El valor del precio máximo no puede ser menor que el valor del precio mínimo")
}}
  },[precioMin,precioMax])
 
useEffect(() => {
  if (disponibilidad) {
    setAltura(prevAltura => prevAltura + 50);
    setCambioD(true);
  } else if (cambioD) {
    setAltura(prevAltura => prevAltura - 50);
  }
}, [disponibilidad]);

useEffect(() => {
  if (genero) {
    setAltura(prevAltura => prevAltura + 50);
    setCambioG(true);
  } else if (cambioG) {
    setAltura(prevAltura => prevAltura - 50);
  }
}, [genero]);

useEffect(() => {
  if (calidad) {
    setAltura(prevAltura => prevAltura + 50);
    setCambioC(true);
  } else if (cambioC) {
    setAltura(prevAltura => prevAltura - 50);
  }
}, [calidad]);


useEffect(() => {
  if (precio) {
    setAltura(prevAltura => prevAltura + 50);
    setCambioP(true);
  } else if (cambioP) {
    setAltura(prevAltura => prevAltura - 50);
  }
}, [precio]);
useEffect(()=>{
    
   console.log(perfumes?.perfumes?.[1]?.perfume ?? "s");
    
},[calidadV]);

const cambcambCalidadV = (valor) => {
  setCalidadV(prev => {
    if (prev.includes(valor)) {
    
      return prev.filter(v => v !== valor);
    } else {
    
      return [...prev, valor];
    }
  });
};

const cambcambGeneroV = (valor) => {
  setGeneroV(prev => {
    if (prev.includes(valor)) {
    
      return prev.filter(v => v !== valor);
    } else {
    
      return [...prev, valor];
    }
  });
};

const cambcambPrecioV = (valor) => {
  setPrecioV(prev => {
    if (prev.includes(valor)) {
    
      return prev.filter(v => v !== valor);
    } else {
    
      return [...prev, valor];
    }
  });
};

const handleSubmit = (e) => {
  perfumes.setPerfumes(perfumes.perfumesAuxAux)
  let perfumesAU=perfumes.perfumesAuxAux
  try {
        e.preventDefault();  
           let perfumesAux=[];   
    perfumesAU.map((perfume,index)=>{
      console.log('',precioMin)
      console.log(precioMax)
      if(perfume.precio>=precioMin&&perfume.precio<=precioMax||precioMin==""||precioMin==" "||precioMax==""||precioMax==" "){
 
        if (generoV.length === 0 || generoV.includes(perfume.genero)) {
              
              perfumesAux[index]=perfume
        }
      }
          })
          perfumes.setPerfumes(perfumesAux)
    //calidadV
    
    
    toast.success("Filtros aplicados correctamente");
    setOrdenar(false);
  } catch (error) {
    toast.error("❌ Error en el servidor:", error);
  }

};
const empezar=()=>{
  setOrdenar(true)
}  
const eliminarFiltros=()=>{
  perfumes.setPerfumes(perfumes.perfumesAuxAux)
}
const ordenarr=()=>{

}
  const eliminarCambios=()=>{
    setGeneroV("");
    setPrecioMax("");
    setPrecioMin("");
    return;
  }
  return (
    <div> 
    {!ordenar&&(
    <div className='inline-flex justify-evenly w-[90vw] text-xl text-black mb-4'>
    <h2 className='cursor-pointer' onClick={()=>setOrdenar(true)}>Filtrar-Ordenar</h2>
    <h2 className='cursor-pointer' onClick={()=>eliminarFiltros()}>Eliminar filtros</h2>
    </div>
   
    )}
  
      {ordenar&&(
           <form className='       mt-24  relative right-[35px] min-[320px]:right-[38px] min-[350px]:right-[40px] min-[360px]:right-[42px] min-[390px]:right-[44px] min-[410px]:right-[46px] min-[430px]:right-[48px] min-[450px]:right-[50px] min-[460px]:right-[52px] min-[490px]:right-[54px] min-[510px]:right-[56px] min-[530px]:right-[58px] min-[550px]:right-[60px] min-[560px]:right-[62px] min-[510px]:right-[56px] min-[530px]:right-[58px] min-[585px]:right-[64px] w-[100vw] flex justify-evenly ancho max-[340px]:text-xs'>
      
  
     <div className="bg-white w-[90vw] max-w-[400px] relative top-[-10vh] transition-all duration-300" style={{ 
        height: `${altura}px`,
        
      }} 
     >    <h2 className='mt-3 relative top-2'>Ordenar</h2>  <label htmlFor="Ordenar"></label>
        
            <select    value={ordenarrV}
 onChange={(e)=>setOrdenarrV(e.target.value) }
 id='Orden' className='w-48 bg-white  h-8 text-[10px] cursor-pointer  mt-2'>
                <option value="precio_desc" className='options cursor-pointer'  >Precio (Más costoso - Menos costoso)</option>
                <option value="precio_asc" className='options cursor-pointer '  >Precio (Menos costoso - Más costoso)</option>
                <option value="a_z" className='options cursor-pointer '   >Alfabéticamente (A-Z)</option>
                <option value="z_a" className='options cursor-pointer '  >Alfabéticamente (Z-A)</option>
                <option value="popularidad" className='options cursor-pointer '  >Popularidad</option>
               
            </select>
           <ul> 
           <li className='cursor-pointer mt-1' onClick={()=>setPrecio(!precio)}>Rango de Precio (cup)  <img src="img/right_arrow.png" className='w-7  inline' alt="" /></li>  {precio&&(
            <div className=' mt-2 w-full inline-flex justify-between'>
                <div className='relative left-[0.21rem] '>
             <label htmlFor="" className='relative left-[0.3rem] bottom-[0.05rem] mr-4'>
                Mínimo
            </label>
            <input type="number" name="" id="" className='relative w-[40%] border border-black  text-center' value={precioMin} onChange={e=>setPrecioMin(e.target.value)} />
            
          </div>
 <div><span className=' relative left-1 '>{width > 450?'------':"---"}</span>
 </div>
          <div>
            <label htmlFor="" className='relative bottom-[0.05rem] '>
               
                Máximo 
            </label>
                <input type="number" name="" id="" className='relative w-[40%] border border-black  text-center left-1' value={precioMax} onChange={e=>setPrecioMax(e.target.value)} />
                  
            </div>
            </div>
           )}
             <li className='cursor-pointer mt-1' onClick={()=>setGenero(!genero)}>Género  <img src="img/right_arrow.png" className='w-7  inline' alt="" /></li>
             {genero&&(
                     <div className='inline-flex justify-around mt-2 content-start w-full'>
                <div className='relative left-[0.21rem] '>
            <input type="checkbox" name="" id="" className='relative ' onChange={()=>cambcambGeneroV("Femenino")} />
             <label htmlFor="" className='relative left-[0.3rem] bottom-[0.05rem]'>
                Femenino 
            </label>
          </div>
          <div>
                <input type="checkbox" name="" id="" className='relative right-1'  onChange={()=>cambcambGeneroV("Masculino")}/>
                  <label htmlFor="" className='relative bottom-[0.05rem]'>
                Masculino 
            </label>
            </div>
            <div>
                <input type="checkbox" name="" id="" className='relative right-1' onChange={()=>cambcambGeneroV("Unisex")} />
                  <label htmlFor="" className='relative bottom-[0.05rem]'>
                Unisex 
            </label>
            </div>
            </div>
             )
            }
               {/*  <li className='cursor-pointer mt-1' onClick={()=>setCalidad(!calidad)}>Calidad  <img src="img/right_arrow.png" className='w-7  inline' alt="" /></li>  
                {calidad && (
  <div className='inline-flex justify-around mt-2 content-start w-full max-[340px]:text-xs'>
    <div className='relative left-[0.21rem] '>
      <input 
        type="checkbox" 
        onChange={() => cambcambCalidadV("Réplicas")} 
        className='relative' 
      />
      <label htmlFor="" className='relative left-[0.3rem] bottom-[0.05rem]'>
        Réplicas
      </label>
    </div>
    <div>
      <input 
        type="checkbox" 
        onChange={() => cambcambCalidadV("Imitaciones")} 
        className='relative right-1' 
      />
      <label htmlFor="" className='relative bottom-[0.05rem]'>
        Imitaciones 
      </label>
    </div>
    <div>
      <input 
        type="checkbox" 
        onChange={() => cambcambCalidadV("Originales")} 
        className='relative right-1' 
      />
      <label htmlFor="" className='relative bottom-[0.05rem]'>
        Originales
      </label>
    </div>
  </div>
)} */}
           </ul>
          
           <div className='mt-4 flex justify-around'>
            <input type='button' value="Eliminar cambios" className=' bg-zinc-300   p-1 hover:text-white cursor-pointer ' onClick={()=>eliminarCambios()}></input>
            <input type='submit' value="Aplicar cambios" className=' bg-indigo-500 p-1 hover:text-white cursor-pointer' onClick={handleSubmit}></input>

           </div>
        </div>
       </form>
      )}
   
</div>
  )
}


export default Perfumes

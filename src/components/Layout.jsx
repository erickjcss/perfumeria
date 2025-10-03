import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Perfumes from './Perfumes';
import { useDebounce } from 'use-debounce';
    let currentIndex = 0;
function showSlide(perfumeIndex, slideIndex,nombre) {
   const sliderContainers = document.querySelectorAll(`.${nombre}`);

   
  console.log(slideIndex,perfumeIndex,sliderContainers.length,nombre);
  
  for(let i=0;i<sliderContainers.length;i++){
    if(i!=perfumeIndex){
      document.querySelector(`.${nombre+'F'}`).src;
      sliderContainers[i].classList.toggle('opacity-0');
    }
    else{
      sliderContainers[i].classList.toggle('opacity-100')  
    }
  }
  
  
   
  
}


 
const Layout = () => {
  const [position,setPosition]=useState([]);
  const [positionR,setPositionR]=useState([]);
const [currentPerfumeIndex, setCurrentPerfumeIndex] = useState(0);
  const [currentIndices, setCurrentIndices] = useState({});  
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const [text,setText]=useState("Cargando")
    const [tocar,setTocar]=useState(false)
  const [inputValue, setInputValue] = useState('');
  const [fotoReal,setFotoReal]=useState([]);
  const [perfumes,setPerfumes]=useState();
  const [divError,setDivError]=useState(false);
  const [divEspera,setDivEspera]=useState(true);
  const activeToasts = [];
  const [auxiliar,setAuxiliar]=useState();
  const [perfumesAuxAux,setPerfumesAuxAux]=useState();
  const [busqueda,setBusqueda]=useState();
  
   function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
   
 useEffect(() => {
  if(!busqueda&&busqueda==undefined) return;
  if (!perfumesAuxAux || perfumesAuxAux.length === 0) return;

  if (busqueda.trim() === '') {
   
    setPerfumes(perfumesAuxAux);
  } else {
    const terminoBusqueda = busqueda.trim().toLowerCase();
    const auxBus = perfumesAuxAux.filter(perfume => 
      perfume.perfume.toLowerCase().includes(terminoBusqueda)
    );
    setPerfumes(auxBus);
  }
}, [busqueda, perfumesAuxAux]); 
  useEffect(() => {
  let loadingToastId;

  if (divEspera) {
    loadingToastId = toast.loading(text);
  } else {
    
     if (loadingToastId) toast.dismiss(loadingToastId);
  }

  return () => {

    if (loadingToastId) toast.dismiss(loadingToastId);
  };
}, [divEspera]);
  useEffect(()=>{
  
  const csrftoken = getCookie('csrftoken');
  
  const obtenerPerfumes=async()=>{
       try {
        const response =await fetch("https://perfumeriadjango.onrender.com/perfumes/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken 
            }
        });      
          const data = await response.json();
     setDivError(false);
     setDivEspera(false);
           
        console.log(data);
            
              
setPerfumes(data);
setPerfumesAuxAux(data);
const initialIndices = {};
      data.forEach((perfume, index) => {
        initialIndices[index] = 0;
      });
      setCurrentIndices(initialIndices);
      
let initialFotoRealState=[]; 
let posiciones=[];
let posicionesR=[];
data.forEach((item,index)=>{
  initialFotoRealState[index]=false;
  posiciones[index]=0;
  posicionesR[index]=0;
       })


setFotoReal(initialFotoRealState);
setPosition(posiciones);
setPositionR(posicionesR)
console.log("Estado inicial:",fotoReal); 
       
        console.log(fotoReal)
        // toast.dismiss(loadingToast);
          if (data.status === "error") {
       /*      toast.error("Configuración incorrecta", {
                duration: 3000,
                icon: '🙄',
                animation: "custom-enter 1s ease",
                hideProgressBar: true,
                customProgressBar: true,
                closeButton: true
            }); */
            return
        } 
        
        /*   toast.success("Escaneo ejecutado exitosamente",{
            duration:3000,
            closeButton: true
          }) */
      } catch (error) {   
        setDivError(true);
        setDivEspera(false)
        console.log(divError);
   
        console.log(error.status)
        console.log(error)
               if (error instanceof TypeError && error.message.includes('Falló el fetch')) {
            console.error('Error de conexión:', error);
            alert('No se pudo conectar al servidor');
        }
        else if (error instanceof Error && error.message === 'error') {
            console.error('Error de autenticación:', error);
           /*  toast.error("Configuración incorrecta", {
              duration: 3000,
              icon: '🙄',
              animation: "custom-enter 1s ease",
              hideProgressBar: true,
              customProgressBar: true,
              closeButton: true
          }); toast.dismiss(loadingToast);
        */}
         
        else {
       
            console.error('Error inesperado:', error);
          /*   toast.error("Configuración incorrecta", {
              duration: 3000,
              icon: '🙄',
              animation: "custom-enter 1s ease",
              hideProgressBar: true,
              customProgressBar: true,
              closeButton: true
          }); */
        }
      /*   toast.dismiss(loadingToast); */
        return;
        
    }
  }
  obtenerPerfumes()
},[])  
useEffect(() => {
  console.log("Positions actual:", position);
    console.log("PositionsR actual:", positionR);
  console.log("FotoReal actual:", fotoReal);
}, [position, positionR, fotoReal]);
 const cambiarFotoAlanteC=(perfume,index)=>{
      /* alert(position[0]) */
      if (fotoReal[index]){
         console.log(positionR[index],perfume.fotosReales.split(',').length)
      if(positionR[index]==perfume.fotosReales.split(',').length-1){ 
      const aux = [...positionR]; 
      aux[index] = 0; 
      setPositionR(aux);}
      else{
        const aux = [...positionR]; 
        aux[index] = aux[index]+1; 
        setPositionR(aux)
      }
      }
      else{
      console.log(position[index],perfume.fotosCatalogo.split(',').length)
      if(position[index]==perfume.fotosCatalogo.split(',').length-1){
        
      const aux = [...position]; 
      aux[index] = 0; 
      setPosition(aux);}
      else{
        const aux = [...position]; 
        aux[index] = aux[index]+1; 
        setPosition(aux)
      }
    }}
     const cambiarFotoAtrasC=(perfume,index)=>{
      if (fotoReal[index]){
         console.log(positionR[index],perfume.fotosCatalogo.split(',').length)
      if(positionR[index]==0){ 
      const aux = [...positionR]; 
      aux[index] = perfume.fotosReales.split(',').length-1; 
      setPositionR(aux);}
      else{
        const aux = [...positionR]; 
        aux[index] = aux[index]-1; 
        setPositionR(aux)
      }
      }
      else{
      console.log(position[index],perfume.fotosCatalogo.split(',').length)
      if(position[index]==0){ 
      const aux = [...position]; 
      aux[index] = perfume.fotosCatalogo.split(',').length-1; 
      setPosition(aux);}
      else{
        const aux = [...position]; 
        aux[index] = aux[index]-1; 
        setPosition(aux)
      }
    }
    }
    const filtrar=()=>{

    }
  return (
    <div className='w-[120vw] h-16 fixed top-0 bg-gray-100 ml-[-30px]  '>
     <div className='mt-4 w-[100vw]  overflow-y-auto  overflow-x-hidden'>
   
   {divError?(
    <div>
     <div className='z-[-10] left-[-2px] absolute portada w-[100vw] h-[90vh] bg-[cover] mt-2 right-[2px] '></div>
     <div className='inline-flex  h-8 relative right-[0.6rem]' >
      
    <div className=' w-full h-[90vh] mt-4 z-[9] pl-8'>
  
  

      <h2 className='text-2xl pt-4 '>No presenta conexión a Internet en estos momentos o tenemos problemas con el servidor</h2>
        </div>
    </div>
    </div>
   ):(
<form action="">
            <div className='inline-flex  h-8 relative right-[0.6rem]' onMouseEnter={()=>setTocar(true)} onMouseLeave={()=>setTocar(false)} value={busqueda} onChange={(e) => setBusqueda(e.target.value)}>
         <img src="img/loupe.png" className='h-4 relative left-6 min-[330px]:left-8 top-1 cursor-pointer z-[60]' alt="Buscar" />
         <div className='w-[80vw] flex justify-center'>         <input className='w-[80vw] pl-4   text-center fixed z-[50]' type="search"  autoComplete='on' placeholder='Busque su perfume favorito' name="" id="" 
        onChange={(e) => setInputValue(e.target.value)} />
     </div>

        </div>
        <div className='z-[-10] left-[-2px] absolute portada w-[100vw] h-[90vh] bg-[cover] mt-2 right-[2px] '></div>

     
        <div className='z-10 mt-6    w-[80vw]  ml-auto mr-auto '>{(tocar === true || inputValue !== ""||5==5) ?(
          <div className='  h-[80vh]'>
          <section className='populares ml-auto mr-auto 2 min-[700px]:w-[48vw] min-[700px]:mx-0 '>
            <div className='min-[700px]:w-[80vw] min-[700px]:mx-auto '>
            <h1 className=' max-w-[220px]      min-[700px]:max-w-[300px]    mb-2 text-base min-[700px]:text-2xl mx-auto min-[1024px]:text-2xl bg-slate-100 relative '>Perfumes</h1></div>
      <div>
        <Perfumes setPerfumes={setPerfumes} setPerfumesAuxAux={setPerfumesAuxAux} perfumes={perfumes} perfumesAuxAux={perfumesAuxAux} />  
 <div className="grid grid-cols-1 min-[692px]:grid-cols-2 gap-6 min-[783px]:gap-6 min-[500px]:w-[90vw] min-[783px]:w-[80vw] mx-auto  w-[55vw]  ">
  
    {perfumes && perfumes.length > 0 && perfumes.map((perfume, index) => (
      <div className=' h-40 min-[400px]:h-44    min-[500px]:h-52 min-[692px]:h-60   mb-4 min-[800px]:mb-8   '>
      <article onClick={()=>alert("Ja")}
        key={`perfume-${index}`} 
        className="relative   w-[60vw] min-[400px]:min-w-[250px] max-[690px]:min-h-[150px]   min-[500px]:w-[30vw] min-[600px]:w-[45vw] min-[692px]:w-[35vw]   mb-4    min-[700px]:w-[35vw] mx-auto min-[692px]:mx-0 max-[700px]:right-[20px]  hover:border-gray-200 cursor-pointer bg-white overflow-hidden max-[500px]:h-[10rem] max-[400px]:h-[10rem] h-[12rem] min-[693px]:h-60   "
      >
        <div id="slider-container" className="relative h-full w-full ">
          <div className="absolute inset-0 opacity-100 transition-opacity duration-500">
            
            <div className='flex w-full mx-auto'>
              <h1 className="italic text-slate-600 w-full relative left-6 min-[700px]:w-[350px] min-[700px]:left-10 text-center min-[310px]:left-0 min-[420px]:left-[1vw]  text-[0.5rem]  min-[470px]:text-xs min-[300px]:text-[6px] min-[740px]:left-[6vw] min-[792px]:left-[8.5vw] min-[800px]:left-[9vw] min-[500px]:left-0  min-[520px]:left-[10px]  gr z-[1500]">
                {perfume.perfume}
              </h1>
              
              <div className='flex items-start justify-between w-[80vw]'  onClick={() => setFotoReal(prev => ({
      ...prev,
      [index]: !prev[index]
    }))}>
                <h3 className="italic text-slate-700 bg-galery h-12 bg-cover bg-no-repeat text-sm w-[130px] left-[.8rem] z-[1100] min-[300px]:left-[7vw] min-[400px]:left-[1.8rem]  min-[500px]:left-[1rem]  min-[700px]:left-[1.8rem] min-[692px]:left-[.5rem] top-1 relative min-[792px]:left-[5.4vw] min-[840px]:left-[7vw] min-[900px]:left-[9vw] min-[1000px]:left-[10vw] min-[1050px]:left-[11.5vw] max-[500px]:text-[0.6rem]  ">
                  Ver foto real 
                </h3>
                <img src="img/galery.png" className='h-12 object-top self-start relative left-[0.4rem] bottom-[.7rem] z-[1000] max-[424px]:left-[0.2rem] ' alt="" />
                <div className='absolute right-0 w-16' onClick={() => setFotoReal(!(fotoReal[index]))}></div>
              </div>
            </div>

           {!fotoReal[index] && (
  <div className={`slider-container slider-container-${index} ${perfume.diminutivo}`}>
  {/*   {perfume.fotosCatalogo.split(',').map((foto, fotoIndex) => ( */}
      <div 
        key={`catalogo-${index}-$/* {fotoIndex} */`}
        className={`slider-item mx-auto absolute w-[35vw] flex items-center justify-center max-[500px]:right-12 transition-opacity duration-500  'opacity-100' : 'opacity-0'}`}
      >
        <img 
          src={perfume.fotosCatalogo?.split(',')?.[position[index]]?.trim() || perfume.fotosCatalogo?.split(',')?.[0]?.trim()} 
          alt={perfume.perfume} 
          className={`h-48 min-[600px]:h-32 min-[693px]:h-48 min-w-[282px] z-[700] bottom-4 relative max-[692px]:bottom-[10px] max-[601px]:bottom-[10px]   max-[400px]:bottom-[30px] object-contain    w-[800px] max-[600px]:bottom-[10px] max-[500px]:bottom-[30px] max-[600px]:h-32 min-[680px]:z-[1200] inline-block fotoCa ${perfume.diminutivo+'F'}`}
        />
      </div>
    )){/* } */}
  </div>
)}

{fotoReal[index] && (
  <div className={`slider-container slider-container-${index} ${perfume.diminutivo}`}>
    {/* {perfume.fotosReales.split(',').map((foto, fotoIndex) => ( */}
      <div 
        key={`real-${index}-`}
        className={`slider-itemR mx-auto absolute w-[35vw] flex items-center justify-center transition-opacity duration-500 `}
      >
        <img 
          src={perfume.fotosReales?.split(',')?.[positionR[index]]?.trim() || perfume.fotosReales?.split(',')?.[0]?.trim()} 
          alt={perfume.perfume} 
          className="h-40 object-contain mx-auto relative top-4" 
        />
      </div>
    )){/* } */}
  </div>
)}          
          
          </div>
          
        </div>

        <div 
          className="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center z-[8000]"   
          onClick={() => cambiarFotoAtrasC(perfume,index)}
        >
          <h5 className='text-sm'>{"<<"}</h5> 
        </div>
        
        <div 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center text-3xl mb-4 z-[8000]"
          onClick={() => cambiarFotoAlanteC(perfume,index)}
        >
          <h5 className='text-sm'>{">>"}</h5> 
        </div>
        
              
      </article>
        <div className='bg-indigo-500 w-[60vw] min-[400px]:min-w-[250px]    min-[500px]:w-[30vw] min-[600px]:w-[45vw] min-[692px]:w-[35vw] left-[-20px] min-[500px]:left-[80px]     min-[700px]:w-[35vw] h-6 min-[400px]:h-7 min-[500px]:h-8 relative   bottom-[15.8px]    z-[60000] flex content-center align-center cursor-pointer hover:border-t-2 border-cyan-200   min-[400px]:min-w-[250px]   min-[400px]:min-w-[250px]  min-[500px]:w-[30vw] min-[600px]:w-[45vw]  min-[501px]:left-[0px]  min-[500px]:opacity-0 min-[701px]:opacity-100'>
          <a href='https://wa.me/+5353248235' target='blank' title='Contactar con el vendedor' reel="noopener noreferrer" className='self-center w-full relative right-4 min-[380px]:right-3 min-[500px]:right-5 hover:text-white  '>Comprar</a>
                <span className=' z-[70]  absolute right-0  self-center text-[0.5rem] min-[660px]:text-[0.6rem] min-[800px]:text-xs min-[800px]:w-28 w-20 '>{perfume.precio} {perfume.precioDolar?'usd':'cup'} {perfume.cantidad} </span>
                </div>
        </div>
    ))}
  </div>
</div>
        </section>
</div>        ):(
 <Perfumes setPerfumes={setPerfumes} setPerfumesAuxAux={setPerfumesAuxAux} perfumes={perfumes} perfumesAuxAux={perfumesAuxAux}/>   
)}
        </div>

        </form>
   )}  
   
        
       
     </div>
     </div>
  )
}

export default Layout

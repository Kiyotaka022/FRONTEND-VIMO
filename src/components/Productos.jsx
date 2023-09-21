import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faCircleXmark, faSocks } from '@fortawesome/free-solid-svg-icons'

import Button from './Button';
import Toggle from './Toggle'
import Fail from './FailMenssage'

import { useState, useEffect, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';
import { PromiseFetchGET, PromiseFetchPOST, PromiseFetchPUT } from '../logic/fetchs';






function Dialog({setProductos, setDialog, setError, edit, setEdit}) {
    const tallasD = useRef(null)
    const categoriaId = useRef(null)
    const [loading, setLoading]= useState(true)
    const [categorias, setCategorias]= useState([])

    if(loading===true){
        getCategorias()
    }


    function handleClose(){
        setDialog(false)
        if (edit[0]){
            setEdit(false)
        }
    }

    async function getCategorias(){
            let res = await PromiseFetchGET('https://api-vimo-production.up.railway.app/categorias')
            setCategorias(res.allData)
            setLoading(false)
    }

   async function handleSubmit(event){
        event.preventDefault()
        const {id, nombre, valorUnitario, categoria, descripcion}= Object.fromEntries(new FormData(event.currentTarget))
        const inputs=tallasD.current.querySelectorAll('input');
        const medidas=tallasD.current.querySelectorAll('label');
        const tallas={}
        let cantidad=0
        let zeros=0

        for(let i=0; i<inputs.length;i++){
            console.log(medidas[i].innerText)
            tallas[medidas[i].innerText]=Number(inputs[i].value)
            cantidad+=tallas[medidas[i].innerText]
            if(Number(inputs[i].value)===0){
                zeros+=1
            }
        }

        
        if(zeros===inputs.length){
            setError("Selecciona al menos una talla")
            return
        }
        let estadoProducto = true
        let categoriad = categoriaId.current.value

        let object = {id, nombre, valorUnitario, categoria:categoriad, descripcion, cantidad, tallas, estadoProducto}

        
    let res=null
    if(edit[0]){
        res = await PromiseFetchPUT(`https://api-vimo-production.up.railway.app/productos`,object)
    } else{
                
     res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/productos/${id}`)
    if(res.one!=null){
        setError('Este Id de producto ya existe en la base de datos')
        return
    }
    res = await PromiseFetchPOST(`https://api-vimo-production.up.railway.app/productos`, object)

    }
    res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/productos`)
    setDialog(false)
    setEdit(false)
    setProductos(res.allData)
}


    

    return (
      <>
      <dialog className="AMODAL container border-2 border-blue-600 rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose}/></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Producto</span>
                    {!loading ? (
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                        
                    <div className="inline-block hover:border-formInputs1  w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input value={edit[0]? edit[1].id:null} min="0" required name='id' type='number' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Nombre del Producto</label>
                            <input defaultValue={edit[0]? edit[1].nombre:null} required name='nombre' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                        
                        <div className=" inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Valor por Unidad</label>
                            <input defaultValue={edit[0]? edit[1].valorUnitario:null} type='number' required name='valorUnitario' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className=" inline-block hover:border-formInputs1 w-[270px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Categoria</label>
                            <select ref={categoriaId} name='categoria' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0">
                                {!edit[0]? 
                                    categorias.map((categoria)=>( 
                                        <option key={categoria.id} value={categoria.id} >{categoria.nombre}</option>
                                    ))
                                :
                                categorias.map((categoria)=>(
                                    <option key={categoria.id} value={categoria.id} selected={categoria.nombre===edit[1].categorias.nombre} >{categoria.nombre}</option>
                                ))
                                }
                              </select>            
                        </div>
                        
                        <div className=" inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Talla-Cantidad</label>
                            <div ref={tallasD} className="block w-[95%] h-[60px] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 overflow-y-auto">
                                <div className=''> 
                                    <label className='inline'>S</label>
                                    <input className='w-[45px] ml-4' type="number" min="0" placeholder='24' ></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>M</label>
                                    <input className='w-[45px] ml-4' type="number"  min="0"  placeholder='224'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>L</label>
                                    <input className='w-[45px] ml-4' type="number" min="0" placeholder='4'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>XL</label>
                                    <input className='w-[45px] ml-4' type="number" min="0"  placeholder='244'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>XXL</label>
                                    <input className='w-[45px] ml-4' type="number" min="0"  placeholder='54'></input>
                                </div>
                            </div>
                        </div>
                
                        <div className=" inline-block hover:border-formInputs1 h-[150px] w-[90%] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Descripción</label>
                            <textarea name='descripcion' className="block h-[85%] w-[95%] text-1xl font-sans font-semibold break-normal px-3 w-3/4 h-10 py-2 outline-0 break-words overflow-y-auto" placeholder="Camisa blabla">{edit[0]? edit[1].descripcion:null}</textarea>
                    </div>
                    <Button msg={edit[0]?"Editar":"+ Añadir"}></Button>
                </form>
    ): <h1 className='text-4xl'>Cargando</h1>}
            </dialog>
      </>
    )
}


function RenderData({data,setEdit,setTalla, setDialog}){


    return(
        <>
        <table>
        <tr>
        <th className="rounded-tl-md">Id</th>
        <th className="">Nombre</th>
        <th className="">Descripción</th>
        <th className="">Categoría</th>
        <th className="">ValorPorUnidad</th>
        <th className="">Cantidad</th>
        <th className="">Tallas</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>
        <tbody>
{data.map((producto)=>(
        <tr key={producto.id}>
            <td className="max-w-[250px] text-center break-words">{producto.id}</td>
            <td className="max-w-[250px] text-center break-words">{producto.nombre}</td>
            <td className="max-w-[250px] text-center break-words">{producto.descripcion}</td>
            <td className="max-w-[250px] text-center break-words">{producto.categorias.nombre}</td>
            <td className="max-w-[250px] text-center break-words">{producto.valorUnitario}</td>
            <td className="max-w-[250px] text-center break-words">{producto.cantidad}</td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faSocks} style={{color: "#404e67"}} onClick={()=>(setTalla((prev)=>([!prev[0],producto])))}  /></button></div></td>
            <td><div className="flex justify-center"></div><Toggle></Toggle></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=>{setEdit((prev)=>([!prev[0],producto]))
            setDialog((prev)=>!prev)}} /></button></div></td>
        </tr>

        ))
        }
        </tbody>
        </table>
        </>
    )
}

function RenderTallas({data,setTalla, disp}){
    
    return(
        <>
        {disp && <div className='OVERLAY fixed w-screen h-screen top-0 left-0 opacity-25 bg-black z-20'></div>}
        <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px] z-30" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-xl' icon={faCircleXmark} onClick={()=>(setTalla(((prev)=>!prev)))} /></button>
            <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Producto-{data.id}</span>
        <table className="">
    <tr>
        <th className="rounded-tl-md">Small</th>
        <th className="">Medium</th>
        <th className="">Large</th>
        <th className="">X-Large</th>
        <th className="rounded-tr-md">XX-Large</th>
    </tr>
    <tr>
            <td className="max-w-[250px] text-center break-words">{data.tallas.S}</td>
            <td className="max-w-[250px] text-center break-words">{data.tallas.M}</td>
            <td className="max-w-[250px] text-center break-words">{data.tallas.L}</td>
            <td className="max-w-[250px] text-center break-words">{data.tallas.XL}</td>
            <td className="max-w-[250px] text-center break-words">{data.tallas.XXL}</td>    
</tr>
</table>
</dialog>
        </>
    )
}


export default function Productos({dialog, setDialog}) {
    const[productos, setProductos]=useState([
    ])
    const [talla,setTalla]=useState([false,null])
    const {data, loading} = useFetch('https://api-vimo-production.up.railway.app/productos')
    const [edit,setEdit]=useState([false,null])
    const [error, setError]=useState("")

    useEffect(()=>{
        if(data!=null){
            setProductos(data.allData)
        }
    },[data])


  return (
    <>
        <div className="CONTENT inline-flex pt-7 h-full w-[70%] grow basis-0 flex-col overflow-y-auto relative">
            <div className="flex grow-0 basis-0 w-full">
                <input className="SEARCH max-lg:w-[60%] max-md:w-[50%] self-center ml-8 px-3 w-3/4 h-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300" placeholder="Id,Cedula..."></input>
                <button className="FILTER max-md:pt-[5px] max-md:pb-[5px] max-md:w-[30%] max-md:pl-0 max-md:pr-0  self-center ml-auto mr-7 border-2 rounded-lg px-11 py-3.5 text-lg tracking-widest">Filtrar</button>
            </div>

<div className="table-container h-96 flex flex-col items-center">
    {dialog && <div className='OVERLAY fixed w-screen h-screen top-0 left-0 opacity-25 bg-black'></div>}
    {dialog && <Dialog setEdit={setEdit} edit={edit} setProductos={setProductos} setDialog={setDialog} setError={setError}></Dialog>}
    {talla[0] && <RenderTallas data={talla[1]} setTalla={setTalla} disp={talla[0]}></RenderTallas>}
    {error!=false  && <Fail setError={setError} msg={error}></Fail>}

    {!loading ? (
<RenderData data={productos} setEdit={setEdit} setTalla={setTalla} setDialog={setDialog}></RenderData>
    ): <h1 className='text-4xl'>Cargando</h1>}

</div>   
        </div>
    
    </>
  )
}

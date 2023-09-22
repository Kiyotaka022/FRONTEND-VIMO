import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faCircleXmark, faSocks, faTrash } from '@fortawesome/free-solid-svg-icons'

import Pagination from './Pagination';
import Button from './Button';
import Toggle from './Toggle'
import Fail from './FailMenssage'

import { useState, useEffect, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';
import { PromiseFetchGET, PromiseFetchPOST, PromiseFetchPUT } from '../logic/fetchs';


function AddProdu({setDetalle, setShowProdu, setDialog, setError, showProdu, edit, setEdit, detalle}) {
    const tallasD = useRef(null)
    const categoriaId = useRef(null)
    const [loading, setLoading]= useState(true)
    const [categorias, setCategorias]= useState([])

    if(loading===true){
        getCategorias()
    }
    function handleClose(){
        setShowProdu(false)
    }

    async function getCategorias(){
            let res = await PromiseFetchGET('https://api-vimo-production.up.railway.app/categorias')
            setCategorias(res.allData)
            setLoading(false)
    }

    async function handleSubmit(event){
        event.preventDefault()
            const {id}= Object.fromEntries(new FormData(event.currentTarget))
            const inputs=tallasD.current.querySelectorAll('input');
            const medidas=tallasD.current.querySelectorAll('label');
            const tallas={}
            let cantidad=0
            let zeros=0
    
            for(let i=0; i<inputs.length;i++){
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
    
        let res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/productos/${id}`)
        if(res.message){
            setError('Este producto no existe en la base de datos')
            return
        }
        let valorUnitario= res.one[0].valorUnitario

                    setDetalle((prev)=>{
                return(
                    [...prev,
                    {
                        ...res.one[0],
                        categoria:res.one[0].categorias.id,
                        cantidad:cantidad,
                        tallas:tallas,
                        valorTotal:(Number(cantidad)*Number(valorUnitario))
                    }]
                )
            })
        

            console.log(detalle)
    
        setShowProdu(false)



        
    }

return (
      <>
            <div className='OVERLAY fixed w-screen h-screen top-0 left-0 opacity-25 bg-black z-[5]'></div>
      <dialog className="AMODAL container border-2 border-blue-600 rounded-2xl w-[650px] bg-Rwhite py-4 top-[15px] z-[10]" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose}/></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Producto</span>
                    {!loading ? (
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                    <div className="inline-block hover:border-formInputs1  w-[280px] border-2 rounded-2xl py-1 px-2 ">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input  min="1"   name='id' type='number' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
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
                                    <input className='w-[45px] ml-4' type="number" min="0" placeholder='224'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>L</label>
                                    <input className='w-[45px] ml-4' type="number" min="0" placeholder='4'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>XL</label>
                                    <input className='w-[45px] ml-4' type="number" min="0" placeholder='244'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>XXL</label>
                                    <input className='w-[45px] ml-4' type="number" min="0" placeholder='54'></input>
                                </div>
                            </div>
                        </div>
                    <Button msg={"+ Añadir"}></Button>
                </form>
    ): <h1 className='text-4xl'>Cargando</h1>}
            </dialog>
      </>
    )

}


function Dialog({setVentas, detalle, edit, setEdit, setDetalle, setDialog, setShowProdu,setRenderP, setError}) {

    let feche=""
    function parseData(date){
        let year, month, datee ="";"";""

        let fechaNacimiento=new Date(date)

        if(Number(fechaNacimiento.getFullYear())<10){
             year = "0"+(fechaNacimiento.getFullYear())
        }else{
            year = fechaNacimiento.getFullYear()
        }

        if(Number(fechaNacimiento.getMonth()+1)<10){
             month = "0"+(fechaNacimiento.getMonth()+1)
        }else{
            month = fechaNacimiento.getFullMonth()+1
        }

        if(Number(fechaNacimiento.getDate()+1)<10){
             datee = "0"+(fechaNacimiento.getDate()+1)
        }else{
            datee = fechaNacimiento.getDate()+1
        }

        fechaNacimiento=[year, month, datee].join("-")
        return fechaNacimiento
   }
   useEffect(()=>{
    setDetalle(edit[1].detalleVentaPedido)
},[edit[0]])

   if(edit[0]){
    feche= parseData(edit[1].fecha)
}
   function handleClick(){
    setRenderP(true)
   }

   function handleClose(){
    setDialog(false)
    if (edit[0]){
        setEdit(false)
    }
}
    
    async function handleSubmit(event){
        event.preventDefault()
        const {id, fecha, pais, cedulaEmpleado, cedulaCliente}= Object.fromEntries(new FormData(event.currentTarget))
        let total=0
        for(let i=0; i<detalle.length;i++){
            total+=detalle[i].valorTotal
        }
        console.log(detalle)
        if(detalle.length<1){
            setError('¡Tiene que haber productos en la venta!')
            return
        }
        if(edit[0]){
            await PromiseFetchPUT(`https://api-vimo-production.up.railway.app/pedidoVenta`, {id, fecha, pais, cedulaEmpleado, cedulaCliente, detalleVentaPedido:detalle, estado:true, montoAdeudado:0,  valorTotal:total, concepto:"venta"})
            setDetalle([])
            setDialog(false)
            setEdit([false,null])
            return
        }

        let res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/pedidoVenta/${id}`)
        if(res.one!=null){
            console.log(res)
            setError('Este id ya existe en la base de datos')
            return
        }
         await PromiseFetchPOST(`https://api-vimo-production.up.railway.app/pedidoVenta`,{id, fecha, pais, cedulaEmpleado, cedulaCliente, detalleVentaPedido:detalle, estado:true, montoAdeudado:0,  valorTotal:total, concepto:"venta"})
        res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/pedidoVenta/ventas`)
        setVentas(res.allData)
        setDetalle([])
        setEdit([false,null])
        setDialog(false)
    }

    return (
      <>
      <dialog className="AMODAL container border-2 border-blue-600 rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose} /></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">{edit[0]? "Editar Venta":"Venta"}</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                        
                    <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input required value={edit[0]? edit[1].id:null} name='id' type='number' min="1" className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Cedula Empleado</label>
                            <input required defaultValue={edit[0]? edit[1].cedulaEmpleado:null} name='cedulaEmpleado' type='number' min="1" className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Cedula Cliente</label>
                            <input required defaultValue={edit[0]? edit[1].cedulaCliente:null} name='cedulaCliente' type='number' min="1" className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Fecha</label>
                            <input required  defaultValue={edit[0]? feche :null} type='date' name='fecha' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                        <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2 ml-6">
                            <label className="text-xs font-sans font-semibold ml-3">País</label>
                            <input required defaultValue={edit[0]? edit[1].pais :null} name='pais' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                        <div className="RELLENO inline-block w-[280px] border-none rounded-2xl py-1 px-2"></div>
                    <Button msg={edit[0]?"Editar":"+ Añadir"}></Button>
                </form>

                <div className='flex justify-center gap-[10px]'>

                <button className="inline-block w-[280px] border-2 rounded-2xl py-3 px-2" onClick={()=>(handleClick())}>
                            <div className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 text-center" >Ver Productos</div>
                    </button>
                    <button className="inline-block w-[280px] border-2 rounded-2xl py-3 px-2">
                            <div className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 text-center" onClick={()=>(setShowProdu(true))}>+Añadir Producto</div>
                    </button>
                </div>
            </dialog>
      </>
    )
}

function RenderProductos({data,setRenderP, setTalla, deleteProdu}){
    return(
        <>
        <dialog className="AMODAL container border-2 border-black rounded-2xl w-[850px] bg-Rwhite py-3 top-[15px] px-3 overflow-x-auto" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={()=>(setRenderP(false))} /></button>
        <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Productos</span>
        <table>
        <tr>
        <th className="rounded-tl-md">Id</th>
        <th className="">cantidad</th>
       {/* <th className="">Descripción</th>
        <th className="">Categoría</th>
        <th className="">ValorPorUnidad</th>
        <th className="">Cantidad</th>
        <th className="">Valor Total</th>*/}
        <th className="">Tallas</th>
        {deleteProdu!=undefined && <th className="">Eliminar</th>}
    </tr>
        <tbody>
{data.map((producto)=>( 
        <tr key={producto.id}>
            <td className="max-w-[250px] text-center break-words">{producto.id}</td>
            <td className="max-w-[250px] text-center break-words">{producto.cantidad}</td>
           {/*} <td className="max-w-[250px] text-center break-words">{producto.descripcion}</td>
            <td className="max-w-[250px] text-center break-words">{producto.categorias.nombre}</td>
            <td className="max-w-[250px] text-center break-words">{producto.valorUnitario}</td>
            <td className="max-w-[250px] text-center break-words">{producto.cantidad}</td>
<td className="max-w-[250px] text-center break-words">{producto.valorTotal}</td>*/}
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faSocks} style={{color: "#404e67"}} onClick={()=>(setTalla((prev)=>([!prev[0],producto])))}  /></button></div></td>
            {deleteProdu!=undefined && <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faTrash} style={{color: "#404e67"}} onClick={()=>(deleteProdu(data, producto.id))}  /></button></div></td>
}
                </tr>

))
        }
        </tbody>
        </table>
        </dialog>
        </>
    )
}

function RenderData({data,setEdit, setListP, setDialog}){
    console.log(data)
        function parseData(date){
        let fechaNacimiento=new Date(date)
        fechaNacimiento=[fechaNacimiento.getFullYear(), fechaNacimiento.getMonth()+1, fechaNacimiento.getDate()+1].join("-")
        return fechaNacimiento
    }
    return(
        <>
        <tr>
        <th className="rounded-tl-md">Id</th>
        <th className="">Fecha</th>
        <th className="">Cedula Empleado</th>
        <th className="">Cedula Cliente</th>
        <th className="">Valor Total</th>
        <th className="">Productos</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>
        <tbody>
{data.map((venta)=>(
        <tr key={venta.id}>
            <td className="max-w-[250px] text-center break-words">{venta.id}</td>
            <td className="max-w-[250px] text-center break-words">{parseData(venta.fecha)}</td>
            <td className="max-w-[250px] text-center break-words">{venta.cedulaEmpleado}</td>
            <td className="max-w-[250px] text-center break-words">{venta.cedulaCliente}</td>
            <td className="max-w-[250px] text-center break-words">{venta.valorTotal}</td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faSocks} style={{color: "#404e67"}} onClick={()=>(setListP((prev)=>([!prev[0],venta.detalleVentaPedido])))}  /></button></div></td>
            <td><div className="flex justify-center"><Toggle></Toggle></div></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=> {
                setEdit((prev)=>([!prev[0],venta]))
                setDialog((prev)=>!prev)}} /></button></div></td>
        </tr>

        ))
        }
        </tbody>
        </>
    )
}

function RenderTallas({data,setTalla}){

    return(
        <>
        <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
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

export default function Ventas({dialog, setDialog}) {

    const[ventas, setVentas]=useState([])
    const {data, loading} = useFetch('https://api-vimo-production.up.railway.app/pedidoVenta/ventas')
    const [detalle, setDetalle]=useState([])
    const [edit,setEdit]=useState([false,null])
    const [error, setError]=useState("")
    

    const [showProdu,setShowProdu]=useState(false)
    const [listP, setListP]=useState([false, null])

    const [renderP,setRenderP]=useState(false)

    const [talla,setTalla]=useState([false,null])


    useEffect(()=>{
        if(data!=null){
            setVentas(data)
        }
    },[data])

    function deleteProdu(productos, id){
        let newProductos= productos.filter((producto)=>(producto.id!=id))
        setDetalle(newProductos)
    }
  return (
    <>
        <div className="CONTENT inline-flex pt-7 h-full w-[70%] grow basis-0 flex-col overflow-y-auto relative">
            <div className="flex grow-0 basis-0 w-full">
                <input className="SEARCH max-lg:w-[60%] max-md:w-[50%] self-center ml-8 px-3 w-3/4 h-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300" placeholder="Id,Cedula..."></input>
                <button className="FILTER max-md:pt-[5px] max-md:pb-[5px] max-md:w-[30%] max-md:pl-0 max-md:pr-0  self-center ml-auto mr-7 border-2 rounded-lg px-11 py-3.5 text-lg tracking-widest">Filtrar</button>
            </div>

<div className="table-container h-96 flex flex-col">

   {(dialog || renderP || listP[0]) && <div className='OVERLAY fixed w-screen h-screen top-0 left-0 opacity-25 bg-black'></div>}
   {dialog &&  <Dialog setError={setError} detalle={detalle} edit={edit} setEdit={setEdit} setDetalle={setDetalle} setVentas={setVentas} setDialog={setDialog} setShowProdu={setShowProdu} setRenderP={setRenderP}></Dialog>}
    
    {showProdu && <AddProdu setShowProdu={setShowProdu} setDialog={setDialog} setDetalle={setDetalle} setError={setError} showProdu={showProdu} edit={edit} setEdit={setEdit} detalle={detalle}></AddProdu>}
    {listP[0] && <RenderProductos data={listP[1]} setRenderP={setListP} setTalla={setTalla} setShowProdu={setShowProdu} setDetalle={setDetalle}></RenderProductos>}
    {renderP && <RenderProductos data={detalle} setRenderP={setRenderP} setTalla={setTalla} deleteProdu={deleteProdu}></RenderProductos>}
    {talla[0] && <RenderTallas data={talla[1]} setTalla={setTalla}></RenderTallas>}
    {error!=""  && <Fail setError={setError} msg={error}></Fail>}

    
<table className="">
{!loading ? (
    <RenderData data={ventas} setEdit={setEdit} setShowProdu={setShowProdu} setListP={setListP} setDialog={setDialog}></RenderData>
    ): <h1 className='text-4xl'>Cargando</h1>}
</table>
</div>



<div className='self-center'><Pagination></Pagination></div>  


            
        </div>
    
    </>
  )
}

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


function AddProdu({setDetalle, setShowProdu, setDialog, setError}) {
    const tallasD = useRef(null)
    const categoriaId = useRef(null)
    const [loading, setLoading]= useState(true)
    const [categorias, setCategorias]= useState([])
    const [thereIs, setThereIS] = useState(false)

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

    function handleOnChange(event){
        setThereIS((prev)=>(!prev)) 
      }

    async function handleSubmit(event){
        event.preventDefault()
        if(!thereIs){
            
        const {id, nombre, valorUnitario, categoria, descripcion}= Object.fromEntries(new FormData(event.currentTarget))
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
        
        let categoriad = categoriaId.current.value
        if(zeros===inputs.length){
            setError("Selecciona al menos una talla")
            return
        }

             let res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/productos/${id}`)
    if(res.message!="Producto no encontrado"){
        console.log("A")
        setError('Este Id de producto ya existe en la base de datos')
        return
    }

     res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/categorias/${categoriad}`)


    setDetalle((prev)=>{
            return(
                [...prev,
                {
                    id:id,
                    nombre:nombre,
                    descripcion:descripcion,
                    valorUnitario:valorUnitario,
                    categoria:categoriad,
                    categorias:{id:res.one.id, nombre:res.one.nombre},
                    cantidad:cantidad,
                    tallas:tallas,
                    estadoProducto:true,
                    valorTotal:(Number(cantidad)*Number(valorUnitario))
                }]
            )
        })

    setShowProdu(false)
        }else{
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

        console.log(res)

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
    
        setShowProdu(false)



        }
    }

return (
      <>
      <dialog className="AMODAL container border-2 border-blue-600 rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose}/></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Producto</span>
                    {!loading ? (
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                        
                        <div className=" inline-block w-[270px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Está el producto ya registrado?</label>
                            <select onChange={handleOnChange} name='rol' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0">
                               <option value={false}>No</option>
                                <option value={true}>Si</option>
                              </select> 
                              </div>
                              
                    <div className="inline-block hover:border-formInputs1  w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input  min="1" required={thereIs?false:true} name='id' type='number' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2" style={thereIs? {display:"none"}:{display:'inline-block'}}>
                            <label className="text-xs font-sans font-semibold ml-3">Nombre del Producto</label>
                            <input  required={thereIs?false:true}  name='nombre' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                        
                        <div className=" inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2" style={thereIs? {display:"none"}:{display:'inline-block'}}>
                            <label className="text-xs font-sans font-semibold ml-3">Valor por Unidad</label>
                            <input  type='number'required={thereIs?false:true} name='valorUnitario' min="1" className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className=" inline-block hover:border-formInputs1 w-[270px] border-2 rounded-2xl py-1 px-2" style={thereIs? {display:"none"}:{display:'inline-block'}}>
                            <label className="text-xs font-sans font-semibold ml-3">Categoria</label>
                            <select ref={categoriaId} name='categoria' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0">
                                {
                                    categorias.map((categoria)=>( 
                                        <option key={categoria.id} value={categoria.id} >{categoria.nombre}</option>
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
                
                        <div className=" inline-block hover:border-formInputs1 h-[150px] w-[90%] border-2 rounded-2xl py-1 px-2" style={thereIs? {display:"none"}:{display:'inline-block'}}>
                            <label className="text-xs font-sans font-semibold ml-3">Descripción</label>
                            <textarea name='descripcion' className="block h-[85%] w-[95%] text-1xl font-sans font-semibold break-normal px-3 w-3/4 h-10 py-2 outline-0 break-words overflow-y-auto" placeholder="Camisa blabla"></textarea>
                    </div>
                                            <div className="RELLENO inline-block w-[280px] border-none rounded-2xl py-1 px-2" style={!thereIs? {display:"none"}:{display:'block'}}></div>
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

   function handleClick(){
    setRenderP(true)
    setDetalle(edit[1].detalleCompra)

   }

   function handleClose(){
    setDialog(false)
    if (edit[0]){
        setEdit(false)
    }
}
    
    async function handleSubmit(event){
        event.preventDefault()
        const {id, fecha, pais}= Object.fromEntries(new FormData(event.currentTarget))
        let total=0
        for(let i=0; i<detalle.length;i++){
            total+=detalle[i].valorTotal
        }


        console.log(detalle.length)
        if(detalle.length<1){
            setError('¡Tiene que haber productos en la compra!')
            return
        }

        if(edit[0]){
            await PromiseFetchPUT(`https://api-vimo-production.up.railway.app/compras`, {id,fecha,pais,detalleCompra:detalle,valorTotal:total})
            setDetalle([])
            setDialog(false)
            return
        }

        let res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/compras/${id}`)
        if(!res.message){
            console.log(res)
            setError('Esta cedula ya existe en la base de datos')
            return
        }
        res = await PromiseFetchPOST(`https://api-vimo-production.up.railway.app/compras`,{id, fecha, pais, detalleCompra:detalle, valorTotal:total})

        res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/productos`)
        setVentas()
        setDetalle([])
        setDialog(false)
    }

    return (
      <>
      <dialog className="AMODAL container border-2 border-blue-600 rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose} /></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Compras</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                        
                    <div className="inline-block hover:border-formInputs1 w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input required value={edit[0]? edit[1].id:null} name='id' type='number' min="1" className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
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
        <th className="">Nombre</th>
        <th className="">Descripción</th>
        <th className="">Categoría</th>
        <th className="">ValorPorUnidad</th>
        <th className="">Cantidad</th>
        <th className="">Valor Total</th>
        <th className="">Tallas</th>
        {deleteProdu!=undefined && <th className="">Eliminar</th>}
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
            <td className="max-w-[250px] text-center break-words">{producto.valorTotal}</td>
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
        <th className="">Valor Total</th>
        <th className="">País</th>
        <th className="">Productos</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>
        <tbody>
{data.map((venta)=>(
        <tr key={venta.id}>
            <td className="max-w-[250px] text-center break-words">{venta.id}</td>
            <td className="max-w-[250px] text-center break-words">{parseData(venta.fecha)}</td>
            <td className="max-w-[250px] text-center break-words">{venta.valorTotal}</td>
            <td className="max-w-[250px] text-center break-words">{venta.pais}</td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faSocks} style={{color: "#404e67"}} onClick={()=>(setListP((prev)=>([!prev[0],venta.detalleCompra])))}  /></button></div></td>
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
    
    {showProdu && <AddProdu setShowProdu={setShowProdu} setDialog={setDialog} setDetalle={setDetalle} setError={setError}></AddProdu>}
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

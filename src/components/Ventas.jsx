import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faSocks, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from 'react';
import Pagination from './Pagination';


function AddProdu({setDetalle, setShowProdu}) {
    const tallasD = useRef(null)
    function handleSubmit(event){
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
            alert("Al menos alguna talla")
            return
        }

        setDetalle((prev)=>{
            return(
                [...prev,
                {
                    id:id,
                    tallas:tallas,
                    cantidad:cantidad
                }]
            )
        })
        setShowProdu(false)
    
    }
    return (
      <>
      <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
                    
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Producto</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                    <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input required className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" name='id' placeholder="Camisa blabla"></input>
                    </div>
                        
                        <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Talla-Cantidad</label>
                            <div ref={tallasD}  className="block w-[95%] h-[60px] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 overflow-y-auto">
                                <div className=''> 
                                    <label className='inline'>Small</label>
                                    <input className='w-[45px] ml-4' type="number" min="0" placeholder='24' ></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>Medium</label>
                                    <input className='w-[45px] ml-4' type="number" placeholder='224'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>Large</label>
                                    <input className='w-[45px] ml-4' type="number" placeholder='4'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>X-Large</label>
                                    <input className='w-[45px] ml-4' type="number" placeholder='244'></input>
                                </div>
                                <div className=''> 
                                    <label className='inline'>XX-Large</label>
                                    <input className='w-[45px] ml-4' type="number" placeholder='54'></input>
                                </div>
                            </div>
                        </div>
                    <button className="mb-3 self-center mr-7 border-2 rounded-lg px-11 py-1 text-lg tracking-widest">+Añadir</button>
                </form>
                </dialog>
      </>
    )
}

function RenderProductos({data,setRenderP}){
    return(
        <>
        <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={()=>(setRenderP(false))} /></button>
        <table>
        <tr>
        <th className="rounded-tl-md">Id</th>
        <th className="">Small</th>
        <th className="">Medium</th>
        <th className="">Large</th>
        <th className="">X-Large</th>
        <th className="rounded-tr-md">XX-Large</th>
    </tr>
        <tbody>
{data.map((producto)=>( 
        <tr key={producto.id}>
            <td className="max-w-[250px] text-center break-words">{producto.id}</td>
            <td className="max-w-[250px] text-center break-words">{producto.tallas.Small}</td>
            <td className="max-w-[250px] text-center break-words">{producto.tallas.Medium}</td>
            <td className="max-w-[250px] text-center break-words">{producto.tallas.Large}</td>
            <td className="max-w-[250px] text-center break-words">{producto.tallas["X-Large"]}</td>
            <td className="max-w-[250px] text-center break-words">{producto.tallas["XX-Large"]}</td>  
            
        </tr>

))
        }
        </tbody>
        </table>
        </dialog>
        </>
    )
}

function Dialog({setVentas, detalle, setDetalle, setDialog, setShowProdu,setRenderP}) {
    
    function handleSubmit(event){
        event.preventDefault()
        const {id, fecha, cedulaEmpleado, cedulaCliente}= Object.fromEntries(new FormData(event.currentTarget))

        setVentas((prev)=>{
            return(
                [...prev,
                {
                    id:id,
                    fecha:fecha,
                    cedulaEmpleado:cedulaEmpleado,
                    cedulaCliente:cedulaCliente,
                    productos:detalle
                }]
            )
        })
                setDetalle([{
            id:4545,
            cantidad:4854,
            tallas:{Small: 32, Medium: 0, Large: 0, 'X-Large': 0, 'XX-Large': 0},
        }])

        setDialog(false)
    }

    return (
      <>
      <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
        <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={()=>(setDialog(false))} /></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Ventas</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                        
                    <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input min="0" required name='id' type='number' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Fecha</label>
                            <input required type='date' name='fecha' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Cedula Empleado</label>
                            <input required name='cedulaEmpleado' type='number' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                        <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Cedula Cliente</label>
                            <input required name='cedulaCliente' type='number' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                    <button className="mb-3 self-center mr-7 border-2 rounded-lg px-11 py-1 text-lg tracking-widest">+Añadir</button>
                </form>
                 <button className="inline-block w-[280px] border-2 rounded-2xl py-3 px-2">
                            <div className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 text-center" placeholder="Camisa blabla" onClick={()=>(setRenderP(true))}>Ver Productos</div>
                    </button>
                    <button className="inline-block w-[280px] border-2 rounded-2xl py-3 px-2">
                            <div className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 text-center" placeholder="Camisa blabla" onClick={()=>(setShowProdu(true))}>+Añadir Producto</div>
                    </button>
            </dialog>
      </>
    )
}

function DialogEdit({setVentas, edit, setEdit, setShowProdu}) {

    const venta=edit[1]
    function handleSubmit(event){
        const {id, fecha, cedulaEmpleado, cedulaCliente}= Object.fromEntries(new FormData(event.currentTarget))
        

    setVentas((prev)=>{
        return prev.map((prevP) => {
            if(prevP.id===venta.id){
                return({
                    id:id,
                    fecha:fecha,
                    cedulaEmpleado:cedulaEmpleado,
                    cedulaCliente:cedulaCliente,
                })
            }else{
                return prevP
            }
        })
    })

    setEdit(false)
        
    }

    return (
        <>
        <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[15px]" open>
          <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={()=>(setEdit(false))} /></button>
                      <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Ventas</span>
                      <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                          
                      <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                              <label className="text-xs font-sans font-semibold ml-3">Id</label>
                              <input value={venta.id} min="0" required name='id' type='number' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                          </div>
  
                          <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                              <label className="text-xs font-sans font-semibold ml-3">Fecha</label>
                              <input defaultValue={venta.fecha} required type='date' name='fecha' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                          </div>
  
                          <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                              <label className="text-xs font-sans font-semibold ml-3">Cedula Empleado</label>
                              <input defaultValue={venta.cedulaEmpleado} required name='cedulaEmpleado' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                          </div>
                          <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                              <label className="text-xs font-sans font-semibold ml-3">Cedula Cliente</label>
                              <input defaultValue={venta.cedulaCliente} required name='cedulaCliente' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                          </div>
                          <button className="inline-block w-[280px] border-2 rounded-2xl py-3 px-2">
                              <div className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 text-center" placeholder="Camisa blabla">Ver Productos</div>
                      </button>
                      <button className="inline-block w-[280px] border-2 rounded-2xl py-3 px-2">
                              <div className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0 text-center" placeholder="Camisa blabla">+Añadir Producto</div>
                      </button>
                      <button className="mb-3 self-center mr-7 border-2 rounded-lg px-11 py-1 text-lg tracking-widest">Editar</button>
                  </form>
              </dialog>
        </>
      )
}


function RenderData({data,setEdit, setListP}){
    return(
        <>
        <tbody>
{data.map((venta)=>(
        <tr key={venta.id}>
            <td className="max-w-[250px] text-center break-words">{venta.id}</td>
            <td className="max-w-[250px] text-center break-words">{venta.fecha}</td>
            <td className="max-w-[250px] text-center break-words">{venta.cedulaEmpleado}</td>
            <td className="max-w-[250px] text-center break-words">{venta.cedulaCliente}</td>
            <td className="max-w-[250px] text-center break-words">0</td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faSocks} style={{color: "#404e67"}} onClick={()=>(setListP((prev)=>([!prev[0],venta.productos])))}  /></button></div></td>
            <td><div className="flex justify-center"><input type='checkbox'></input></div></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=>(setEdit((prev)=>([!prev[0],venta])))} /></button></div></td>
        </tr>

        ))
        }
        </tbody>
        </>
    )
}

export default function Ventas({dialog, setDialog}) {

    const[ventas, setVentas]=useState([
        {id: '2', fecha: '2023-08-28', cedulaEmpleado: '4', cedulaCliente: '2', 
        productos:[{id: '1', tallas: {Small: 6, Medium: 9, Large: 6, 'X-Large': 9, 'XX-Large': 264353453}}], 
        cantidad: 5}
    ])

    const [detalle, setDetalle]=useState([
    {
        id:4545,
        cantidad:4854,
        tallas:{Small: 32, Medium: 0, Large: 0, 'X-Large': 0, 'XX-Large': 0},
    }
])

    const [edit,setEdit]=useState([false,null])

    const [showProdu,setShowProdu]=useState(false)
    const [listP, setListP]=useState([false, null])

    console.log(ventas)

    const [renderP,setRenderP]=useState(false)

  return (
    <>
        <div className="CONTENT inline-flex pt-7 h-full w-[70%] grow basis-0 flex-col overflow-y-auto relative">
            <div className="flex grow-0 basis-0 w-full">
                <input className="SEARCH max-lg:w-[60%] max-md:w-[50%] self-center ml-8 px-3 w-3/4 h-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300" placeholder="Id,Cedula..."></input>
                <button className="FILTER max-md:pt-[5px] max-md:pb-[5px] max-md:w-[30%] max-md:pl-0 max-md:pr-0  self-center ml-auto mr-7 border-2 rounded-lg px-11 py-3.5 text-lg tracking-widest">Filtrar</button>
            </div>

<div className="table-container h-96 flex flex-col">
    {dialog &&  <Dialog detalle={detalle} setDetalle={setDetalle} setVentas={setVentas} setDialog={setDialog} setShowProdu={setShowProdu} setRenderP={setRenderP}></Dialog>}
    {edit[0] && <DialogEdit setVentas={setVentas} edit={edit} setEdit={setEdit} setShowProdu={setShowProdu}></DialogEdit>}
    {showProdu && <AddProdu setShowProdu={setShowProdu} setDetalle={setDetalle}></AddProdu>}
    {listP[0] && <RenderProductos data={listP[1]} setRenderP={setListP} setShowProdu={setShowProdu} setDetalle={setDetalle}></RenderProductos>}
    {renderP && <RenderProductos data={detalle} setRenderP={setRenderP} ></RenderProductos>}

<table className="">
    <tr>
        <th className="rounded-tl-md">Id</th>
        <th className="">Fecha</th>
        <th className="">Cedula del Empleado</th>
        <th className="">Cedula del Cliente</th>
        <th className="">Valor Total</th>
        <th className="">Productos</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>
    <RenderData data={ventas} setEdit={setEdit} setShowProdu={setShowProdu} setListP={setListP}></RenderData>


</table>
</div>
<div className='self-center'><Pagination></Pagination></div>  
        </div>
    
    </>
  )
}

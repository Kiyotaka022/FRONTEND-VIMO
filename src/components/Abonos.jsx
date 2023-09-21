import './table.css'
import Button from './Button'
import Pagination from './Pagination'
import Toggle from './Toggle.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {useState } from 'react'


function Dialog({setCategorias, setDialog}) {

    function handleSubmit(event){
        event.preventDefault()
        const {id, codigoPedido, valor}= Object.fromEntries(new FormData(event.currentTarget))

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;


        
        setCategorias((prev)=>{
            return(
                [...prev,
                {
                    id:id,
                    fecha:currentDate,
                    valor:valor,
                    codigoPedido:codigoPedido
                }]
            )
        })

        setDialog(false)
    }


    return (
      <>
      <dialog className="AMODAL container border-2 border-blue-700 rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
      <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark}  onClick={()=>(setDialog(false))} /></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Abono</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1   rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input required type="number" min="0" name='id' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1  rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">valor a Abonar</label>
                            <input required type="number" min="0" name='valor' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>


                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Código del Pedido</label>
                            <input required type="number" min="0" name='codigoPedido' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>
                        <div className=" inline-block w-[280px] border-none rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3"></label>
                       </div>
                    
                       <Button msg={"+Añadir"}></Button>
                       </form>
                </dialog>
      </>
    )
}

function DialogEdit({setCategorias, edit, setEdit}) {
    const categoria=edit[1]
    
    function handleSubmit(event){
        event.preventDefault()
        const {codigoPedido, valor}= Object.fromEntries(new FormData(event.currentTarget))

    setCategorias((prev)=>{
        return prev.map((prevP) => {
            if(prevP.id===categoria.id){
                return({
                    ...prevP,
                    valor:valor,
                    codigoPedido:codigoPedido
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
      <dialog className="AMODAL container border-2 border-blue-700 rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
      <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-xl' icon={faCircleXmark} onClick={()=>(setEdit(((prev)=>!prev)))} /></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Abono</span>
                    <form className="bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>
                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input value={categoria.id} required type="number" name='id' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">valor a Abonar</label>
                            <input defaultValue={categoria.valor} required type="number" name='valor' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Fecha</label>
                            <input value={categoria.fecha} required name='fecha' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Código del Pedido</label>
                            <input value={categoria.codigoPedido} required name='codigoPedido' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>
                    <Button msg={"Editar"}></Button>
                </form>
            </dialog>
      </>
    )
}

function RenderData({data, setEdit}){
    return(
        <>
        <tbody>
{        data.map((categoria)=>(
        <tr key={categoria.id}>
            <td className="max-w-[250px] text-center break-words">{categoria.id}</td>
            <td className="max-w-[250px] text-center break-words">{categoria.valor}</td>
            <td className="max-w-[250px] text-center break-words">{categoria.fecha}</td>
            <td className="max-w-[250px] text-center break-words">{categoria.codigoPedido}</td>
            <td><div className="flex justify-center"><Toggle></Toggle></div></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=>(setEdit((prev)=>([!prev[0],categoria])))} /></button></div></td>
        </tr>

        ))
        }
        </tbody>
        </>
    )
}


export default function Abonos({dialog, setDialog}) {
    const[categorias, setCategorias]=useState([
    ])  
    const [edit,setEdit]=useState([false,null])

  return (
    <>
        <div className="CONTENT inline-flex pt-7 h-full w-[70%] grow basis-0 flex-col overflow-y-auto relative">
            <div className="flex grow-0 basis-0 w-full">
                <input className="SEARCH max-lg:w-[60%] max-md:w-[50%] self-center ml-8 px-3 w-3/4 h-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300" placeholder="Id,Cedula..."></input>
                <button className="FILTER max-md:pt-[5px] max-md:pb-[5px] max-md:w-[30%] max-md:pl-0 max-md:pr-0  self-center ml-auto mr-7 border-2 rounded-lg px-11 py-3.5 text-lg tracking-widest">Filtrar</button>
            </div>

<div className="table-container h-96 flex flex-col">
    {dialog && <Dialog setCategorias={setCategorias} setDialog={setDialog}></Dialog>}
    {edit[0] && <DialogEdit setCategorias={setCategorias} edit={edit} setEdit={setEdit}></DialogEdit>}


<table className="">
    <tr>
        <th className="rounded-tl-md text-2xl">Id</th>
        <th className="text-2xl">Valor Abonado</th>
        <th className="text-2xl">Fecha</th>
        <th className="text-2xl">Codigo del Pedido</th>
        <th className="text-2xl">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>

    <RenderData data={categorias} setEdit={setEdit}></RenderData>
</table>

</div>  
<div className='self-center'><Pagination></Pagination></div>         
        </div>
    
    </>
  )
}

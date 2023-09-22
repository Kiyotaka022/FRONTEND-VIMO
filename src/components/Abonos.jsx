import './table.css';
import Button from './Button'
import Toggle from './Toggle.jsx'
import Pagination from './Pagination';
import Fail from './FailMenssage'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState } from 'react';

import { useFetch } from '../hooks/useFetch';
import { PromiseFetchGET, PromiseFetchPOST, PromiseFetchPUT } from '../logic/fetchs';


function Dialog({setAbonos, setDialog, setEdit, setError, edit}) {
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

    async function handleSubmit(event){
        event.preventDefault()
        const {id, idVentaPedido, valorAbonado}= Object.fromEntries(new FormData(event.currentTarget))

        const date = new Date();
        let fecha=parseData(date)

        let res=null
        console.log(edit)
        if(edit[0]){
            res = await PromiseFetchPUT(`https://api-vimo-production.up.railway.app/abonos`,{id, idVentaPedido, valorAbonado, fecha})
        } else{
                    
         res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/abonos/${id}`)
        if(res.one!=null){
            setError('Este Id ya existe en la base de datos')
            return
        }
        res = await PromiseFetchPOST(`https://api-vimo.onrender.com/abonos`,{id, idVentaPedido, valorAbonado, fecha})
        console.log(res)

        }
        res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/abonos`)
        setDialog(false)
        setEdit([false,null])
        setAbonos(res.allData)
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
                            <input required type="number" min="0" name='valorAbonado' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                    </div>


                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Código del Pedido</label>
                            <input required type="number" min="0" name='idVentaPedido' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
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

function RenderData({data, setEdit}){
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
    return(
        <>
        <tbody>
{        data.map((categoria)=>(
        <tr key={categoria.id}>
            <td className="max-w-[250px] text-center break-words">{categoria.id}</td>
            <td className="max-w-[250px] text-center break-words">{categoria.valorAbonado}</td>
            <td className="max-w-[250px] text-center break-words">{parseData(categoria.fecha)}</td>
            <td className="max-w-[250px] text-center break-words">{categoria.idVentaPedido}</td>
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
    const {data, loading} = useFetch('https://api-vimo-production.up.railway.app/abonos')
    const [edit,setEdit]=useState([false,null])
    const[abonos, setAbonos]=useState([]) 
    const [error, setError]=useState("")


    

    useEffect(()=>{
        if(data!=null){

            setAbonos(data.allData)
        }
    },[data])

  return (
    <>
        <div className="CONTENT inline-flex pt-7 h-full w-[70%] grow basis-0 flex-col overflow-y-auto relative">
            <div className="flex grow-0 basis-0 w-full">
                <input className="SEARCH max-lg:w-[60%] max-md:w-[50%] self-center ml-8 px-3 w-3/4 h-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300" placeholder="Id,Cedula..."></input>
                <button className="FILTER max-md:pt-[5px] max-md:pb-[5px] max-md:w-[30%] max-md:pl-0 max-md:pr-0  self-center ml-auto mr-7 border-2 rounded-lg px-11 py-3.5 text-lg tracking-widest">Filtrar</button>
            </div>

<div className="table-container h-96 flex flex-col">
    {(dialog || edit[0]) && <div className='OVERLAY fixed w-screen h-screen top-0 left-0 opacity-25 bg-black'></div>}
    {(dialog || edit[0])  && <Dialog setAbonos={setAbonos} setDialog={setDialog} setEdit={setEdit} edit={edit} setError={setError}></Dialog>}
    {error!=""  && <Fail setError={setError} msg={error}></Fail>}


<table className="">
    <tr>
        <th className="rounded-tl-md text-2xl">Id</th>
        <th className="text-2xl">Valor Abonado</th>
        <th className="text-2xl">Fecha</th>
        <th className="text-2xl">Codigo del Pedido</th>
        <th className="text-2xl">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>
    {!loading ? (
        <RenderData data={abonos} setEdit={setEdit}></RenderData>
    ): <h1 className='text-4xl'>Cargando</h1>}
</table>

</div>  
<div className='self-center'><Pagination></Pagination></div>         
        </div>
    
    </>
  )
}

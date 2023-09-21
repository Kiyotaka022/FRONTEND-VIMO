import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import Button from './Button';
import Toggle from './Toggle'
import Fail from './FailMenssage'

import { useFetch } from '../hooks/useFetch';
import { PromiseFetchGET, PromiseFetchPOST, PromiseFetchPUT } from '../logic/fetchs';


function Dialog({setClientes, setDialog, setEdit, edit, setError}) {

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

    if(edit[0]){
        feche= parseData(edit[1].fechaNacimiento)
    }
    
     function handleClose(){
        setDialog(false)
        if (edit[0]){
            setEdit(false)
        }
    }

    async function handleSubmit(event){
    event.preventDefault()
    let {cedula, nombres, apellidos ,correo, telefono, direccion, fechaNacimiento }= Object.fromEntries(new FormData(event.currentTarget))

    let res=null
    if(edit[0]){
        res = await PromiseFetchPUT(`https://api-vimo-production.up.railway.app/clientes`,{cedula, nombres, apellidos ,correo, telefono, direccion, fechaNacimiento})
    } else{
                
     res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/clientes/${cedula}`)
    if(res.one!=null){
        setError('Esta cedula ya existe en la base de datos')
        return
    }
    res = await PromiseFetchPOST(`https://api-vimo-production.up.railway.app/clientes`,{cedula, nombres, apellidos ,correo, telefono, direccion, fechaNacimiento})

    }
    res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/clientes`)
    setDialog(false)
    setEdit(false)
    setClientes(res.allData)
}


return (
  <>
  <dialog className="AMODAL container border-2 border-blue-700 rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
    <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose} /></button>
                <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Clientes</span>
                <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>

                <div className="inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Cedula</label>
                        <input value={edit[0]? edit[1].cedula:null} type='number' min="0" name='cedula' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className="inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Nombre</label>
                        <input defaultValue={edit[0]? edit[1].nombres:null} required name='nombres' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className="inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Apellido</label>
                        <input defaultValue={edit[0]? edit[1].apellidos:null} required name='apellidos' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>
                    
                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Correo Electronico</label>
                        <input defaultValue={edit[0]? edit[1].correo:null} required type='email' name='correo' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Telefono</label>
                        <input defaultValue={edit[0]? edit[1].telefono:null} required type='number' min="0" name='telefono' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Direccion</label>
                        <input defaultValue={edit[0]? edit[1].direccion:null} required name='direccion' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Fecha de nacimiento</label>
                        <input defaultValue={edit[0]? feche :null} required name='fechaNacimiento' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" type='date' placeholder="Camisa blabla"></input>
                    </div>
                    <div className="RELLENO inline-block w-[280px] border-none rounded-2xl py-1 px-2">
                            </div>
                <Button msg={edit[0]?"Editar":"+ Añadir"}></Button>
            </form>
            </dialog>
  </>
)
}


function RenderData({data, setEdit, setDialog}){
    function parseData(date){
        let fechaNacimiento=new Date(date)
        fechaNacimiento=[fechaNacimiento.getFullYear(), fechaNacimiento.getMonth()+1, fechaNacimiento.getDate()+1].join("-")
        return fechaNacimiento
    }

    return(
        <>
        <table>
            <tr>
        <th className="rounded-tl-md">Cedula</th>
        <th className="">Nombres</th>
        <th className="">Apellidos</th>
        <th className="">Correo Electronico</th>
        <th className="">Telefono</th>
        <th className="">Direccion</th>
        <th className="">Fecha de nacimiento</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>
        <tbody>
{        data.map((cliente)=>(
        <tr key={cliente.id}>
            <td className="max-w-[100px] text-center break-words">{cliente.cedula}</td>
            <td className="max-w-[150px] text-center break-words">{cliente.nombres}</td>
            <td className="max-w-[250px] text-center break-words">{cliente.apellidos}</td>
            <td className="max-w-[200px] text-center break-words">{cliente.correo}</td>
            <td className="max-w-[90px] text-center break-words">{cliente.telefono}</td>
            <td className="max-w-[250px] text-center break-words">{cliente.direccion}</td>
            <td className="max-w-[250px] text-center break-words">{parseData(cliente.fechaNacimiento)}</td>
            <td><div className="flex justify-center"><Toggle></Toggle></div></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=> {
                setEdit((prev)=>([!prev[0],cliente]))
                setDialog((prev)=>!prev)}}/></button></div></td>
        </tr>

        ))
        }
        </tbody>
                </table>
        </>
    )
}



export default function Clientes({dialog, setDialog}) {
    const[clientes, setClientes]=useState([])  
    const {data, loading, setRerender} = useFetch('https://api-vimo-production.up.railway.app/clientes')
    const [edit,setEdit]=useState([false,null])
    const [error, setError]=useState("")


    useEffect(()=>{
        if(data!=null){
            setClientes(data.allData)
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
    {dialog && <div className='OVERLAY fixed w-screen h-screen top-0 left-0 opacity-25 bg-black'></div>}
    {dialog && <Dialog setClientes={setClientes} setDialog={setDialog} edit={edit} setEdit={setEdit} setError={setError}></Dialog>}
    {error!=""  && <Fail setError={setError} msg={error}></Fail>}
    {!loading ? (
    <RenderData data={clientes} setEdit={setEdit} setDialog={setDialog}></RenderData>
    ): <h1 className='text-4xl'>Cargando</h1>}

</div>

<div className='self-center'><Pagination></Pagination></div>         

</div>

    </>
  )
}

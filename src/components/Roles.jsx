import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faCircleXmark, faSocks } from '@fortawesome/free-solid-svg-icons'

import Button from './Button';
import Toggle from './Toggle'
import Fail from './FailMenssage'

import { useState, useEffect, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';
import { PromiseFetchGET, PromiseFetchPOST, PromiseFetchPUT } from '../logic/fetchs';



function Dialog({setRoles, setDialog, setError, edit, setEdit}){
    const modulosD = useRef(null)

    function handleClose(){
        setDialog(false)
        if (edit[0]){
            setEdit(false)
        }
    }
    async function handleSubmit(event){
        event.preventDefault()
        const {id, nombre}= Object.fromEntries(new FormData(event.currentTarget))
        const inputs=modulosD.current.querySelectorAll('input');
        let res={compras:false, ventas: false, usuarios:false, configuracion:false}
        let modulos=res
        let reString=""
        let first=0

        let zeros=0
        for(let i=0; i<inputs.length;i++){
            if(inputs[i].checked===false){
                zeros+=1
            }
        }

        if(zeros===inputs.length){
            setError("Selecciona al menos un modulo")
            return
        }
    
        if(inputs[0].checked){
            first+=1
            res.compras=true
            reString="Compras"
        }
        if(inputs[1].checked){
            if(first>0){
                
                reString+=", Ventas"
            }else{
                            first+=1
                reString="Ventas"
            }
            res.ventas=true
        }
        if(inputs[2].checked){
            if(first>0){
                
                reString+=", Usuarios"
            }else{
                            first+=1
                reString="Usuarios"
            }
            res.usuarios=true
        }
        if(inputs[3].checked){
            if(first>0){
                
                reString+=", configuracion"
            }else{
                            first+=1
                reString="configuracion"
            }
            res.configuracion=true
        }
        
        if(!edit[0]){
            let res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/roles/${id}`)
            if(res.one!=null){
                setError("El id de este Rol ya existe!")
                return
            }
             res = PromiseFetchGET(`https://api-vimo-production.up.railway.app/roles/${id}`,{id:id,nombre:nombre})
             if(res.one!=null){
                setError("El nombre de este Rol ya existe!")
                return
            }
             await PromiseFetchPOST(`https://api-vimo-production.up.railway.app/roles`,{id:id,nombre:nombre, modulos:modulos})

        }else{
            let res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/roles/${id}`,{id:id,nombre:nombre})
            if(res.one!=null && res.one.id!=id){
               setError("El nombre de este Rol ya existe!")
               return
           }

          await PromiseFetchPUT(`https://api-vimo-production.up.railway.app/roles`,{id:id,nombre:nombre, modulos:modulos})


        }
        res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/roles`)
        setDialog(false)
        setRoles(res.allData)
        setEdit(false)
    }



    return (
      <>
      <dialog className="AMODAL container border-blue-600 border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
      <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose} /></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Rol</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>

                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input value={edit[0]? edit[1].id:null}  required name='id' type='number' min="0" className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                        </div>
                        
                        <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Nombre del Rol</label>
                            <input defaultValue={edit[0]? edit[1].nombre:null}  required min="1" name='nombre' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>

                        <div ref={modulosD} className=" block w-[90%] h-[200px] border-2 rounded-2xl py-1 px-2">
                            <span className="text-lg font-sans font-semibold ml-3 block">Modulos permitidos</span>
                                <label value="compras" className="text-md font-sans font-semibold ml-3">Compras</label>
                                <input className='block ml-3' defaultChecked={edit[0]? edit[1].modulos.compras:null} type='checkbox'  ></input>
                                <label value="compras" className="text-md font-sans font-semibold ml-3">Ventas</label>
                                <input className='block ml-3' defaultChecked={edit[0]? edit[1].modulos.ventas:null}  type='checkbox' ></input>
                                <label value="compras" className="text-md font-sans font-semibold ml-3">Usuarios</label>
                                <input className='block ml-3' defaultChecked={edit[0]? edit[1].modulos.usuarios:null} type='checkbox'  ></input>
                                <label value="compras" className="text-md font-sans font-semibold ml-3">Configuracion</label>
                                <input className='block ml-3' defaultChecked={edit[0]? edit[1].modulos.configuracion:null} type='checkbox' ></input>    
                        </div>

                        <Button msg={edit[0]?"Editar":"+ Añadir"}></Button>
                </form>
                </dialog>
      </>
    )
}


function RenderData({data, setEdit, setDialog}){
    function StringJoin(modulos){
        let first = 0;
        let reString=""
        if(modulos.compras){
            if(first>0){
                
                reString+=", comrpas"
            }else{
                            first+=1
                reString="Compras"
            }
        }
        if(modulos.ventas){
            if(first>0){
                
                reString+=", Ventas"
            }else{
                            first+=1
                reString="Ventas"
            }
        }
        if(modulos.usuarios){
            if(first>0){
                
                reString+=", Usuarios"
            }else{
                            first+=1
                reString="Usuarios"
            }

        }
        if(modulos.configuracion){
            if(first>0){
                
                reString+=", configuracion"
            }else{
                    first+=1
                reString="configuracion"
            }
        }
    
    return reString
}
    return(
        <>
    <tr>
        <th className="rounded-tl-md text-2xl">Id</th>
        <th className="text-2xl">Nombre</th>
        <th className="text-2xl">Modulos</th>
        <th className="text-2xl">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>


        <tbody>
{        data.map((rol)=>(
        <tr key={rol.id}>
            <td className="max-w-[250px] text-center break-words">{rol.id}</td>
            <td className="max-w-[250px] text-center break-words">{rol.nombre}</td>
            <td className="max-w-[250px] text-center break-words">{StringJoin(rol.modulos)}</td>
            <td><div className="flex justify-center"><Toggle></Toggle></div></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=>{
                setDialog((prev)=>!prev)
                setEdit((prev)=>([!prev[0],rol]))}} /></button></div></td>
        </tr>

        ))
        }
        </tbody>
        </>
    )
}

export default function Roles({dialog, setDialog}) {

    const {data, loading} = useFetch('https://api-vimo-production.up.railway.app/roles')
    const [edit,setEdit]=useState([false,null])
    const[roles, setRoles]=useState([]) 
    const [error, setError]=useState("")

    useEffect(()=>{
        if(data!=null){

            setRoles(data.allData)
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
    {dialog && <Dialog setRoles={setRoles} setDialog={setDialog} setError={setError} edit={edit} setEdit={setEdit}></Dialog>}
    {error!=false  && <Fail setError={setError} msg={error}></Fail>}


<table className="">
{!loading ? (
    <RenderData data={roles} setEdit={setEdit} setDialog={setDialog}></RenderData>
    ): <h1 className='text-4xl'>Cargando</h1>}
</table>


</div>         
        </div>
    
    </>
  )
}

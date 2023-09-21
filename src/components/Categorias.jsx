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


function Dialog({setCategorias, setDialog, setEdit, edit, reRender, setError}) {

    let categoria= edit[1]


    function handleClose(){
        setDialog(false)
        if (edit[0]){
            setEdit(false)
        }
    }
    
    async function handleSubmit(event){
        event.preventDefault()
        const {id, nombre}= Object.fromEntries(new FormData(event.target))
        let res=null
        if(edit[0]){
            res = await PromiseFetchPUT(`https://api-vimo-production.up.railway.app/categorias`,{id,nombre})
        } else{
                    
         res= await PromiseFetchGET(`https://api-vimo-production.up.railway.app/categorias/${id}`)
        if(res.one!=null){
            setError('Este Id ya existe en la base de datos')
            return
        }
        res = await PromiseFetchPOST(`https://api-vimo-production.up.railway.app/categorias`,{id,nombre})

        }
        res = await PromiseFetchGET(`https://api-vimo-production.up.railway.app/categorias`)
        setDialog(false)
        setEdit(false)
        setCategorias(res.allData)
    }




    return (
      <>
      <dialog className="AMODAL container border-2 border-blue-700 rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
      <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={handleClose} /></button>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Categoría</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>

                    <div className=" inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Id</label>
                            <input  value={edit[0]? edit[1].id:null} required type='number' min="1" name='id' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="1,352,2,4"></input>
                        </div>
                        
                        <div className="inline-block w-[280px] border-2 hover:border-formInputs1 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Nombre de la categoría</label>
                            <input defaultValue={edit[0]? edit[1].nombre:""} required min="0" name='nombre' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                    <Button msg={edit[0]?"Editar":"+ Añadir"}></Button>
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
            <td className="max-w-[250px] text-center break-words">{categoria.nombre}</td>
            <td><div className="flex justify-center"><Toggle setEdit={setEdit}></Toggle></div></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=>(setEdit((prev)=>([!prev[0],categoria])))} /></button></div></td>
        </tr>

        ))
        }
        </tbody>
        </>
    )
}


export default function Categoria({dialog, setDialog}) {
    const {data, loading} = useFetch('https://api-vimo-production.up.railway.app/categorias')
    const [edit,setEdit]=useState([false,null])
    const[categorias, setCategorias]=useState([]) 
    const [error, setError]=useState("")


    

    useEffect(()=>{
        if(data!=null){

            setCategorias(data.allData)
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
    {(dialog || edit[0])  && <Dialog setCategorias={setCategorias} setDialog={setDialog} setEdit={setEdit} edit={edit} reRender={setRerender} setError={setError}></Dialog>}
    {error!=""  && <Fail setError={setError} msg={error}></Fail>}

<table className="">
    <tr>
        <th className="rounded-tl-md text-2xl">Id</th>
        <th className="text-2xl">Nombre</th>
        <th className="text-2xl">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>
    {!loading ? (
    <RenderData data={categorias} setEdit={setEdit}></RenderData>
    ): <h1 className='text-4xl'>Cargando</h1>}
</table>
</div>  
<div className='self-center mt-5'><Pagination></Pagination></div>         
        </div>
    </>
    )
}
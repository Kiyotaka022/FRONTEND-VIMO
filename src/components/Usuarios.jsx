import './table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Pagination from './pagination';

function Dialog({setEmpleados, setDialog}) {

    function handleSubmit(event){
    event.preventDefault()
    const {cedula, nombre, apellido ,correo, telefono, direccion, fecha, rol }= Object.fromEntries(new FormData(event.currentTarget))
    
    setEmpleados((prev)=>{
        return(
            [...prev,
            {
                cedula:cedula,
                nombre:nombre,
                apellido:apellido,
                correo:correo,
                telefono:telefono,
                direccion:direccion,
                fecha:fecha,
                rol:rol
            }]
        )
    })
    setDialog(false)
}


return (
  <>
  <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
    <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={()=>(setDialog(false))} /></button>
                <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Usuario</span>
                <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>

                            <div className=" inline-block w-[270px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Rol</label>
                            <select name='rol' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0">
                                <option value="Empleado">Empleado</option>
                                <option value="Cliente">Cliente</option>
                              </select>            
                        </div>
                <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Cedula</label>
                        <input type='number' min="0" name='cedula' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Nombre</label>
                        <input required name='nombre' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Apellido</label>
                        <input required name='apellido' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>
                    
                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Correo Electronico</label>
                        <input required type='email' name='correo' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Telefono</label>
                        <input required type='number' min="0" name='telefono' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Direccion</label>
                        <input required name='direccion' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Fecha de nacimiento</label>
                        <input required name='fecha' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" type='date' placeholder="Camisa blabla"></input>
                    </div>
                <button className="mb-3 self-center mr-7 border-2 rounded-lg px-11 py-1 text-lg tracking-widest">+Añadir</button>
            </form>
            </dialog>
  </>
)
}

function DialogEdit({setEmpleados, edit, setEdit}) {
    const empleado=edit[1]
    
    function handleSubmit(event){
        event.preventDefault()
        const {cedula, nombre, apellido ,correo, telefono, direccion, fecha, rol}= Object.fromEntries(new FormData(event.currentTarget))

    
    setEmpleados((prev)=>{
        return prev.map((prevP) => {
            if(prevP.id===empleado.id){
                return({
                    cedula:cedula,
                    nombre:nombre,
                    apellido:apellido,
                    correo:correo,
                    telefono:telefono,
                    direccion:direccion,
                    fecha:fecha,
                    rol:rol
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
  <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
  <button className='ml-auto mr-[10px] block'><FontAwesomeIcon className='fa-2xl' icon={faCircleXmark} onClick={()=>(setEdit(false))} /></button>
                <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Empleados</span>
                <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center" onSubmit={handleSubmit}>

                    
                <div className=" inline-block w-[270px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Rol</label>
                        <select name='rol' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0">
                                <option value="Empleado">Empleado</option>
                                <option value="Cliente">Cliente</option>
                        </select>    
                </div>

                <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Cedula</label>
                        <input value={empleado.cedula} type='number' min="0" name='cedula' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Nombre</label>
                        <input defaultValue={empleado.nombre} name='nombre' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Apellido</label>
                        <input defaultValue={empleado.apellido}  name='apellido' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>
                    
                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Correo Electronico</label>
                        <input defaultValue={empleado.correo}  type='email' name='correo' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Telefono</label>
                        <input defaultValue={empleado.telefono}  type='number' min="0" name='telefono' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Direccion</label>
                        <input defaultValue={empleado.direccion}  name='direccion' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                    </div>

                    <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                        <label className="text-xs font-sans font-semibold ml-3">Fecha de nacimiento</label>
                        <input defaultValue={empleado.fecha}  name='fecha' className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" type='date' placeholder="Camisa blabla"></input>
                    </div>
                <button className="mb-3 self-center mr-7 border-2 rounded-lg px-11 py-1 text-lg tracking-widest">Editar</button>
            </form>
            </dialog>
      </>
    )
}


function RenderData({data, setEdit}){

    return(
        <>
        <tbody>
{        data.map((empleado)=>(
        <tr key={empleado.id}>
            <td className="max-w-[250px] text-center break-words">{empleado.cedula}</td>
            <td className="max-w-[250px] text-center break-words">{empleado.nombre}</td>
            <td className="max-w-[250px] text-center break-words">{empleado.apellido}</td>
            <td className="max-w-[250px] text-center break-words">{empleado.correo}</td>
            <td className="max-w-[250px] text-center break-words">{empleado.telefono}</td>
            <td className="max-w-[250px] text-center break-words">{empleado.direccion}</td>
            <td className="max-w-[250px] text-center break-words">{empleado.fecha}</td>
            <td className="max-w-[250px] text-center break-words">{empleado.rol}</td>
            <td><div className="flex justify-center"><input type='checkbox'></input></div></td>
            <td><div className="flex justify-center"><button><FontAwesomeIcon className='fa-lg' icon={faPen} style={{color: "#404e67"}} onClick={()=>(setEdit((prev)=>([!prev[0],empleado])))}/></button></div></td>
        </tr>

        ))
        }
        </tbody>
        </>
    )
}


export default function Usuarios({dialog, setDialog}) {
    const[empleados, setEmpleados]=useState([
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
    {dialog && <Dialog setEmpleados={setEmpleados} setDialog={setDialog}></Dialog>}
    {edit[0] && <DialogEdit setEmpleados={setEmpleados} edit={edit} setEdit={setEdit} empleado={empleados}></DialogEdit>}

<table className="">
<tr>
        <th className="rounded-tl-md">Cedula</th>
        <th className="">Nombres</th>
        <th className="">Apellidos</th>
        <th className="">Correo Electronico</th>
        <th className="">Telefono</th>
        <th className="">Direccion</th>
        <th className="">Fecha de nacimiento</th>
        <th className="">Rol</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>

    <RenderData data={empleados} setEdit={setEdit}></RenderData>


</table>
</div>


<div className='self-center'><Pagination></Pagination></div>  



            
        </div>
    
    </>
  )
}


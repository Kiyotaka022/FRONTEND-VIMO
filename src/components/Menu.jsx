import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp, faBagShopping, faDollarSign, faUsers, faGear, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'



export default function Menu({state, setPage, setLogin}) {
    const [drop, setDrop] = useState([false, false, false,false])

  return (
    <>
        <nav className="NAVBAR min-w-[190px] bg-navGray text-white border-0 flex flex-col" style={state? {display:'flex'}: {display:'none'}}>
            <span className="font-sans block text-[1.2rem] ml-3 mb-3 mt-3 font-semibold text-[#999]">Menu</span>
                <div className="Item-Nav py-3">
                <ul>
                    <button className=" group flex items-center min-w-[100%] py-2 text-left hiddenn" style={drop[0]? {borderLeft:"solid"}: {borderLeft:"none"}}     onClick={()=>(setDrop((prev)=>([!prev[0],prev[1],prev[2],prev[3]])))}>
                        <FontAwesomeIcon className="fa-solid fa-bag-shopping ml-4 fa-lg" style={{color: "#c3c3c3"}} icon={faBagShopping} />
                        <span className="inline text-1xl font-sans font-semibold ml-4 text-[#dcdcdc] group-hover:text-white">Compras</span>
                        <FontAwesomeIcon className="fa-solid fa-chevron-down ml-auto mr-3 mt-1 max-w-[12px]fa-lg"  style={{color: "#c3c3c3"}} icon={faChevronDown} />
                        <div className="hidden ml-auto mr-4 mt-1 max-w-[12px]"><FontAwesomeIcon className="fa-solid fa-chevron-up ml-auto mr-4 mt-1 max-w-[12px]"  style={{color: "#c3c3c3"}} icon={faChevronUp} /></div>
                    </button>
                    <div className="Links" style={drop[0]? {display:'block', borderLeft:"solid"}: {display:'none'}}>
                        <button className='block' onClick={()=>(setPage("Compras"))}><li className="text-1xl font-sans font-semibold ml-12 text-[#dcdcdc] hover:text-white">Compras</li></button>
                        <button className='block' onClick={()=>(setPage("Productos"))}><li className="text-1xl font-sans font-semibold ml-12 text-[#dcdcdc] hover:text-white">Productos</li></button>
                        <button className='block' onClick={()=>(setPage("Categorias"))}><li className="text-1xl font-sans font-semibold ml-12 text-[#dcdcdc] hover:text-white">Categorías</li></button>
                    </div>
                </ul>
            </div>


            <div className="Item-Nav py-3">
                <ul>
                    <button className="group flex items-center min-w-[100%] py-2 text-left" style={drop[1]? {borderLeft:"solid"}: {borderLeft:"none"}}  onClick={()=>(setDrop((prev)=>([prev[0],!prev[1],prev[2],prev[3]])))}>
                        <FontAwesomeIcon className="fa-solid fa-dollar-sign ml-4 fa-lg" style={{color: "#c3c3c3"}} icon={faDollarSign} />
                        <span className="inline text-1xl font-sans font-semibold ml-5 text-[#dcdcdc] group-hover:text-white">Ventas</span>
                        <FontAwesomeIcon className="fa-solid fa-chevron-down ml-auto mr-3 mt-1 max-w-[12px]fa-lg"  style={{color: "#c3c3c3"}} icon={faChevronDown} />
                    </button>
                    <div className="Links" style={drop[1]? {display:'block', borderLeft:"solid"}: {display:'none'}}>
                        <button className='block' onClick={()=>(setPage("Ventas"))}><li className="text-1xl font-sans font-semibold ml-11 text-[#dcdcdc] hover:text-white">Ventas</li></button>
                        <button className='block' onClick={()=>(setPage("Clientes"))}><li className="text-1xl font-sans font-semibold ml-11 text-[#dcdcdc] hover:text-white">Clientes</li></button>
                        <button className='block' onClick={()=>(setPage("Empleados"))}><li className="text-1xl font-sans font-semibold ml-11 text-[#dcdcdc] hover:text-white">Empleados</li></button>
                         <button className='block' onClick={()=>(setPage("Abonos"))}><li className="text-1xl font-sans font-semibold ml-11 text-[#dcdcdc] hover:text-white">Abonos</li></button>
                        <button className='block' onClick={()=>(setPage("Pedidos"))}><li className="text-1xl font-sans font-semibold ml-11 text-[#dcdcdc] hover:text-white">Pedidos</li></button>
                    </div>


                </ul>
            </div>


            <div className="Item-Nav py-3">
                <ul>
                    <button className=" group flex items-center min-w-[100%] py-2 text-left" style={drop[2]? {borderLeft:"solid"}: {borderLeft:"none"}} onClick={()=>(setPage("Usuarios"))}>
                        <FontAwesomeIcon className="fa-solid fa-users ml-3 fa-lg" style={{color: "#c3c3c3"}} icon={faUsers} />
                        <span className="inline text-1xl font-sans font-semibold ml-4 text-[#dcdcdc] group-hover:text-white">Usuarios</span>
                    </button>
                </ul>
            </div>

            <div className="Item-Nav py-3">
                <ul>
                    <button className=" group flex items-center min-w-[100%] py-2 text-left" style={drop[3]? {borderLeft:"solid"}: {borderLeft:"none"}}  onClick={()=>(setDrop((prev)=>([prev[0],prev[1],prev[2],!prev[3]])))}>
                        <FontAwesomeIcon className="fa-solid fa-users ml-3 fa-lg" icon={faGear} style={{color: "#c3c3c3",}} />
                        <span className="inline text-1xl font-sans font-semibold ml-4 text-[#dcdcdc] group-hover:text-white">Configuración</span>
                        <FontAwesomeIcon className="fa-solid fa-chevron-down ml-auto mr-3 mt-1 max-w-[12px]fa-lg"  style={{color: "#c3c3c3"}} icon={faChevronDown} />
                    </button>
                    <div className="Links" style={drop[3]? {display:'block', borderLeft:"solid"}: {display:'none'}}>
                        <button className='block' onClick={()=>(setPage("Roles"))}><li className="text-1xl font-sans font-semibold ml-11 text-[#dcdcdc] hover:text-white">Roles</li></button>
                    </div>


                </ul>
            </div>

            <div className="Item-Nav py-3 mt-auto mb-3">
                    <button className="group flex items-center min-w-[100%] py-2 text-left" onClick={()=>(setLogin(false))}>
                    <FontAwesomeIcon className="fa-solid fa-users ml-3 fa-lg border-2 py-3 ml-1 px-3 rounded-full" icon={faUser} style={{color: "#c3c3c3",}} />
                        <div className="flex flex-col">
                            <span className="inline text-base font-sans font-semibold ml-3 text-[#dcdcdc] group-hover:text-white">NombreXXXXX</span>
                            <span className="inline text-base font-sans font-semibold ml-3 text-[#dcdcdc] group-hover:text-white">Empleado</span>
                        </div>
                    </button>
            </div>


            
        </nav>
    </>
  )
}


import './table.css';
import Pagination from './pagination';

export default function Pedidos({dialog}) {
  return (
    <>
        <div className="CONTENT inline-flex pt-7 h-full w-[70%] grow basis-0 flex-col overflow-y-auto relative">
            <div className="flex grow-0 basis-0 w-full">
                <input className="SEARCH max-lg:w-[60%] max-md:w-[50%] self-center ml-8 px-3 w-3/4 h-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300" placeholder="Id,Cedula..."></input>
                <button className="FILTER max-md:pt-[5px] max-md:pb-[5px] max-md:w-[30%] max-md:pl-0 max-md:pr-0  self-center ml-auto mr-7 border-2 rounded-lg px-11 py-3.5 text-lg tracking-widest">Filtrar</button>
            </div>

<div className="table-container h-96 flex flex-col">
<table className="">
<tr>
        <th className="rounded-tl-md">Id</th>
        <th className="">Fecha</th>
        <th className="">Cedula del Cliente</th>
        <th className="">Valor</th>
        <th className="">Monto Adeudado</th>
        <th className="">Productos</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>

    <tr>
        <td className="max-w-[250px] text-center break-words">null</td>
        <td className="max-w-[250px] text-center break-words">null</td>
        <td className="max-w-[250px] text-center break-words">null</td>
        <td className="max-w-[250px] text-center break-words">null@gmail.com</td>
        <td className="max-w-[250px] text-center break-words">null</td>
        <td className="max-w-[250px] text-center break-words">null</td>
        <td className="max-w-[250px] text-center break-words">null</td>
        <td><div className="flex justify-center">null</div></td>
    </tr>


</table>
</div>

<div className='self-center'><Pagination></Pagination></div>  




            
        </div>
    
    </>
  )
}

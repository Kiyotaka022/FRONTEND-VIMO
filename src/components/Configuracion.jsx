import './table.css';

function Dialog() {
    return (
      <>
      <dialog className="AMODAL container border-2 border-black rounded-2xl w-[650px] bg-Rwhite py-3 top-[10px]" open>
                    <span className="block text-4xl font-sans font-semibold text-center mb-[30px]">Producto</span>
                    <form className=" bg-Rwhite rounded-2xl py-2 px-3 flex items-start flex-wrap content-start gap-y-4 gap-x-4 justify-center">
                        <div className="inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Nombre del Producto</label>
                            <input className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                        
                        <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Valor por Unidad</label>
                            <input className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0" placeholder="Camisa blabla"></input>
                        </div>
                        
                        <div className=" inline-block w-[280px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Talla</label>
                            <select className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0">
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="x-large">X-Large</option>
                                <option value="xx-large">XX-Large</option>
                              </select>
                        </div>
                
                        <div className=" inline-block w-[270px] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Categoria</label>
                            <select className="block w-[95%] text-1xl font-sans font-semibold px-3 w-3/4 h-10 py-2 outline-0">
                                <option value="shirts">Shirts</option>
                                <option value="pants">Pants</option>
                                <option value="dresses">Dresses</option>
                                <option value="jackets">Jackets</option>
                                <option value="shoes">Shoes</option>
                              </select>            
                        </div>
                
                        <div className=" inline-block h-[150px] w-[90%] border-2 rounded-2xl py-1 px-2">
                            <label className="text-xs font-sans font-semibold ml-3">Descripción</label>
                            <textarea className="block h-[85%] w-[95%] text-1xl font-sans font-semibold break-normal px-3 w-3/4 h-10 py-2 outline-0 break-words overflow-y-auto" placeholder="Camisa blabla"></textarea>
                    </div>
                    <button className="mb-3 self-center mr-7 border-2 rounded-lg px-11 py-1 text-lg tracking-widest">+Añadir</button>
                </form>
                </dialog>
      </>
    )
  }




export default function Productos({dialog}) {
  return (
    <>
        <div className="CONTENT inline-flex pt-7 h-full w-[70%] grow basis-0 flex-col overflow-y-auto relative">
            <div className="flex grow-0 basis-0 w-full">
                <input className="SEARCH max-lg:w-[60%] max-md:w-[50%] self-center ml-8 px-3 w-3/4 h-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300" placeholder="Id,Cedula..."></input>
                <button className="FILTER max-md:pt-[5px] max-md:pb-[5px] max-md:w-[30%] max-md:pl-0 max-md:pr-0  self-center ml-auto mr-7 border-2 rounded-lg px-11 py-3.5 text-lg tracking-widest">Filtrar</button>
            </div>

<div className="table-container h-96 flex flex-col">
    {dialog && <Dialog></Dialog>}

<table className="">
    <tr>
        <th className="rounded-tl-md">Id</th>
        <th className="">Nombre</th>
        <th className="">Descripción</th>
        <th className="">Categoría</th>
        <th className="">ValorPorUnidad</th>
        <th className="">Cantidad</th>
        <th className="">Talla</th>
        <th className="">Estado</th>
        <th className="rounded-tr-md">Editar</th>
    </tr>

    <tr>
        <td className="max-w-xs text-center">1</td>
        <td className="text-center">Pantalon</td>
        <td className="max-w-sm text-center break-words">AAAAAAAAAAAABAAAAAAAAAAAABAAAAAAAAAAAABAAAAAAAAAAAAB</td>
        <td className="text-center">5</td>
        <td className="text-center">15000</td>
        <td className="text-center">50</td>
        <td><div className="flex justify-center">sfsd</div></td>
        <td><div className="flex justify-center">asda</div></td>
        <td><div className="flex justify-center">asda</div></td>
    </tr>


</table>
</div>






            
        </div>
    
    </>
  )
}

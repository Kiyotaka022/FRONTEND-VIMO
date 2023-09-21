import { useState } from "react"

export function Confirm({ask, setAsk}){

    return(
        <>
        {ask!="" && (    <dialog id="defaultModal" open className= 'w-[40%] bg-slate-100 rounded-lg mt-[2%]  z-20'>
        <div className="w-full rounded-lg border-2 shadow bg-slate-100 border-blue-700 py-[50px] px-[80px] flex flex-col h-[100%]" >
        <svg className="mx-auto mb-4 text-black w-12 h-12 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
            <div className="rounded-lg p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center text-black font-bold leading-tight tracking-tight md:text-2xl" >
                    {ask}
                </h1>
            </div>
            <div className="flex gap-3 justify-center">
                    <button className='border-2 rounded-lg py-2 px-5 text-2xl' onClick={()=>(setAsk("si"))}>Sí</button>
                    <button className='border-2 rounded-lg py-2 px-5 text-2xl' onClick={()=>(setAsk("no"))}>No</button>
            </div>
        </div>
  
    </dialog>)}
    </>
    )
}



export default function Toggle(){
    const [checked, setChecked]=useState(true)
    const [ask, setAsk]= useState("")
    const [edit, setEdit] = useState(false)

    if(ask==="si"){
        setChecked((prev)=>(!prev))
        setAsk("")
        setEdit(false)
    }else if(ask==="no"){
        setEdit(false)
        setAsk("")
    }
    function handleClik(){
        if(ask===""){
            setAsk("Estás seguro de cambiar el estado?")
            setEdit(true)
        }
    }
    return(
    <>
   {(edit) && <div className='OVERLAY fixed w-screen h-screen top-0 left-0 opacity-25 bg-black z-10'></div>}
    <Confirm ask={ask} setAsk={setAsk}></Confirm>
    <label className="relative inline-flex items-center cursor-pointer ">
    <input type="checkbox" checked={checked} defaultChecked value="" className="sr-only peer" onClick={handleClik}></input>
    <div className="-z-50 w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
   </label>
   </>
    )
}
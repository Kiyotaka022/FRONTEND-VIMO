import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation,faCircleXmark } from '@fortawesome/free-solid-svg-icons'



export default function Fail({msg, setError, dark}){
    if(dark===undefined){
        dark=false
    }
    return(
    <dialog id="defaultModal" open className= 'w-[40%] bg-slate-100 rounded-lg mt-[2%] z-50' style={dark? {"background-color":"#1f2937", "border":"none", "color":"white"}:{"color":"black"}}>
      <div className="w-full rounded-lg border-2 shadow bg-slate-100 border-blue-700 py-[50px] px-[80px] flex flex-col" style={dark? {"background-color":"#1f2937", "border":"none"}:{"color":"black"}}>
      <FontAwesomeIcon className='fa-6x' icon={faCircleExclamation} style={{color: "#FF0000",}} />
          <div className="rounded-lg p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center text-black font-bold leading-tight tracking-tight md:text-2xl" style={dark? { "color":"white"}:{"color":"black"}}>
                  {msg}
              </h1>
          </div>
          <div className="rounded-lg p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  <button className='border-2 rounded-lg py-2 px-5' style={dark? { "color":"white"}:{"color":"black"}} onClick={()=>(setError(""))}>Ok</button>
              </h1>
          </div>
      </div>

  </dialog>
    )
}
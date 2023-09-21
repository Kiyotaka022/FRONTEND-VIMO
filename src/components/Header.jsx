import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './table.css';

export default function Header({setDeploy,setDialog,page}) {

  function handleClick(){
    setDeploy((prev)=>!prev)
  }
  
  return (
    <>
<header className="min-w-screen flex h-16 bg-Rwhite text-white m-0 z-0 ">
<div className="2xl:min-w-[290px] inline-flex items-center h-full min-w-[190px] bg-navGray text-white w-44 2xl:h-20 ">
    <h1 className="font-sans inline text-3xl ml-4 mb-1 bg-navGray">VIMO</h1>
    <button className="ml-auto mr-3" onClick={handleClick}>
    <FontAwesomeIcon className="fa-solid fa-bars fa-xl" icon={faBars} style={{color: "white"}}/>
    </button>
</div>

<div className="bg-Rwhite inline-flex items-center grow text-white shadow-xl h-17 2xl:h-20">
    <h1 className="font-sans font-semibold inline text-3xl ml-10 text-textGray">{page}</h1>
    {page!="Pedidos"&& <button className="ml-auto mr-6 font-sans font-semibold text-textGray" onClick={()=>(setDialog((prev)=>(!prev)))}>+ Añadir {page}</button>}
</div>
</header>
    </>
  )
}


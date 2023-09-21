export default function Button({action,msg}){
    return(
        <button onClick={()=>action()} className="inline-flex items-center px-11 py-4   text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{msg}</button>
    )
}

export default function Paginacion(){
    return(
<nav aria-label="Page navigation example">
  <ul className="inline-flex -space-x-px text-base h-10">
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-600 bg-white border border-gray-600 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 a">Previous</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-600 bg-white border border-gray-600 hover:bg-gray-100 hover:text-gray-700 a">1</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-600 bg-white border border-gray-600 hover:bg-gray-100 hover:text-gray-700 a">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">3</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-600 bg-white border border-gray-600 hover:bg-gray-100 hover:text-gray-700 a">4</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-600 bg-white border border-gray-600 hover:bg-gray-100 hover:text-gray-700 a">5</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-600 bg-white border border-gray-600 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 a">Next</a>
    </li>
  </ul>
</nav>


    )
}
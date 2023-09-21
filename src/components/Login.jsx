import { useState } from 'react'
import Fail from './FailMenssage.jsx'
import './table.css';

export default function Login({setLogin}){
    const[error, setError]=useState(false)

    function handleSubmit(event){
        event.preventDefault()
        const {email, password}= Object.fromEntries(new FormData(event.currentTarget))
        if(email==="admin@gmail.com" && password==="admin123"){
            setLogin(true)
        }else{
            setError(true)
        }

    }

    return(
        <>
        {error && <Fail setError={setError} dark={true} msg={"Contraseña y/o Correo incorrectos"}></Fail>}
        <section className="bg-gray-50  bg-gray-900 h-full">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white">
        VIMO
      </a>
      <div className="w-full rounded-lg shadow  border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800  border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  text-white">
                  Ingresa a tu cuenta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900  text-white">Correo</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" placeholder="name@company.com" required="">
                 </input>
                      </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900  text-white">Contraseña</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" required="">
                  </input></div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                      </div>
                      <a href="#" className="text-sm text-[white] font-medium text-primary-600 hover:underline">Olvidaste tu contraseña?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-primary-600  hover:bg-primary-700  focus:ring-primary-800">Ingresar</button>
                  <p className="text-sm font-light text-gray-500  text-gray-400">
                      No tienes una cuenta? <a href="#" className="font-medium text-primary-600 hover:underline  text-primary-500">Registrate</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</>
    )
}
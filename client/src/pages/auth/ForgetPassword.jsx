import React from 'react'
import { Link } from 'react-router-dom';

//Icons
import { RiMailLine} from "react-icons/ri";

const ForgetPassword = () => {

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]'>
          <h1 className='text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8'>Recuperar <span className='text-primary'>Contraseña</span></h1>
        <form className='mb-8'>
            <div className='relative mb-8'>
              <RiMailLine className='absolute top-1/2 -translate-y-1/2 left-2 text-primary' />
              <input type="email" className='py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary'
              placeholder='Correo electronico'
              /> 
            </div>
            
            <div>
              <button type='submit' 
              className='bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors'
              >Enviar Instrucciones</button>
            </div>
        </form>
        <div className='flex flex-col items-center gap-4 text-gray-100'>
          <span className='flex items-center gap-2'>
          ¿Ya tienes cuenta?
          <Link to="/login" className='hover:text-primary transition-colors'>Iniciar sesión</Link>
          </span>
      
          <span className='flex items-center gap-2'>
          ¿No tienes cuenta?
           <Link to="/register" className='text-primary hover:text-gray-100 transition-colors'>Registrate</Link>
          </span>
        </div>
      </div>
    </div>
  )
  
} 

export default ForgetPassword
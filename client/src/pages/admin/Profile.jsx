import React from 'react'
import imagePerfil from "../../assets/carlos.jpg"
import { RiEdit2Line, RiErrorWarningLine, RiShieldCheckLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'


const Profile = () => {
  return (
    <>
    {/* Profile */}
    <div className='bg-secondary-100 p-8 rounded-xl mb-8'>
        <h1 className='text-xl text-gray-100'>Perfil</h1>
        <hr className='my-8 border-gray-500/30'/>
        <form>
            <div className='flex items-center mb-8 '>
                <div className='w-1/4'>
                    <p>Avatar</p>
                </div>
                <div className='flex-1'>
                    <div className='relative mb-2'>
                        <img src={imagePerfil} alt="photo-perfil" 
                        className='w-28 h-28 object-cover rounded-lg' />
                        <label htmlFor="avatar" className='absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-4 left-24'><RiEdit2Line/></label>
                        <input type="file" id='avatar' className='hidden' />
                    </div>
                    <p className='text-gray-500 text-sm'>Allowed file types: png, jpg, jpeg</p>
                </div>
            </div>
            <div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-8'>
                <div className='w-full md:w-1/4'>
                    <p>Nombre Completo <span className='text-red-500'>*</span></p>
                </div>
                <div className='flex-1 flex items-center gap-4'>
                    <div className='w-full'>
                        <input type="text" placeholder='Nombre(s)' className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900'/>
                    </div>
                    <div className='w-full'>
                        <input type="text" placeholder='Apellido(s)' className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900'/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center mb-8 gap-y-2'>
                <div className='w-full md:w-1/4'>
                    <p>Nombre de la empresa <span className='text-red-500'>*</span></p>
                </div>
                <div className='flex-1 flex items-center gap-4'>
                    <div className='w-full'>
                        <input type="text" placeholder='Empresa...' className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900'/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center mb-8 gap-y-2'>
                <div className='w-full md:w-1/4'>
                    <p>Numero de contacto <span className='text-red-500'>*</span></p>
                </div>
                <div className='flex-1 flex items-center gap-4'>
                    <div className='w-full'>
                        <input type="text" placeholder='Numero...' className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900'/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center mb-8 gap-y-2'>
                <div className='w-full md:w-1/4'>
                    <p>Sitio Web <span className='text-red-500'>*</span></p>
                </div>
                <div className='flex-1 flex items-center gap-4'>
                    <div className='w-full'>
                        <input type="text" placeholder='Direccion web' className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900'/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center mb-8 gap-y-2'>
                <div className='w-1/4'>
                    <p>Pais<span className='text-red-500'>*</span></p>
                </div>
                <div className='flex-1 flex items-center gap-4'>
                    <div className='w-full'>
                        <select name="pais" id="pais" className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none'>
                            <option value="argentina">Argentina</option>
                            <option value="colombia">Colombia</option>
                            <option value="peru">Peru</option>
                            <option value="mexico">Mexico</option>
                            <option value="venzuela" selected>Venzuela</option>

                        </select>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:items-center mb-8 gap-y-2'>
                <div className='w-full md:w-1/4'>
                    <p>Estado<span className='text-red-500'>*</span></p>
                </div>
                <div className='flex-1 flex items-center gap-4'>
                    <div className='w-full'>
                        <select name="pais" id="pais" className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none'>
                            <option value="Cordoba">Cordoba</option>
                            <option value="Bogota">Bogota</option>
                            <option value="Lima">Lima</option>
                            <option value="Monterey">Monterey</option>
                            <option value="Zulia" selected>Zulia</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
        <hr className='my-8 border-gray-500/30'/>
        <div className='flex justify-end'>
            <button className='bg-primary/80 text-black py-2 px-2 rounded-lg hover:bg-primary transition-colors'>
                Guardar
            </button>
        </div>
    </div> 
    {/* Change password */}
    <div className='bg-secondary-100 p-8 rounded-xl mb-8'>
        <h1 className='text-xl text-gray-100'>Usuario y contraseña</h1>
        <hr className='my-8 border-gray-500/30'/>
        <form>
            <div className='flex flex-col md:flex-row me:items-center gap-y-4 justify-between'>
                <div>
                    <h5 className='text-gray-100 mb-1'>Correo Electronico</h5>
                    <p className='text-gray-500 text-sm'>Carlos96@gmail.com</p>
                </div>
                <div>
                    <button className='w-full md:w-auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors'>Cambiar email</button>
                </div>
            </div>
        <hr className='my-8 border-gray-500/30 border-dashed'/>
        <div className='flex flex-col md:flex-row md:items-center gap-y-4 justify-between mb-8'>
                <div>
                    <h5 className='text-gray-100'>Contraseña</h5>
                    <p className='text-gray-500 text-sm'>*************</p>
                </div>
                <div>
                    <button className='w-full md:w-auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors'>Cambiar contraseña</button>
                </div>
            </div>
        </form>
        <div className='flex flex-col md:flex-row items-center gap-y-4 justify-between bg-green-600/10 p-4 rounded-lg border border-dashed border-green-600'>
            <div className='flex gap-x-2'>
                <RiShieldCheckLine className='text-5xl text-green-600'/>
            <div>
                <h5 className='text-gray-100 text-xl'>Secure Your Account</h5>
                <p className='text-gray-500'>Two-factor authentication adds an extra layer of security to your account. To log in, in additional you'll need to provide a 6 digit code</p>
            </div>
            </div>
            <div>
                <button className='bg-green-600/70 hover:bg-green-600 py-2 px-4 rounded-lg text-gray-100 transition-colors'>Enabel</button>
            </div>
        </div>
    </div> 
    {/*Desactive account*/}
    <div className='bg-secondary-100 p-8 rounded-xl'>
        <h1 className='text-xl text-gray-100'>Desactive accout</h1>
        <hr className='my-8 border-gray-500/30'/>
        <div className='flex items-center justify-between bg-yellow-600/10 p-4 rounded-lg border border-dashed border-yellow-600 mb-2'>
            <div className='flex gap-x-2'>
                <RiErrorWarningLine className='text-5xl text-yellow-600'/>
            <div className='flex-1'>
                <h5 className='text-gray-100 text-xl'>You are desctivating your account</h5>
                <p className='text-gray-500'>FOr extra security, this requires you to confirm your email or phone number when you reset yousignr password.{" "}
                <Link className='text-blue-500 font-bold'>Learn more.</Link>
                </p>
            </div>
            </div>
        </div>
        <form className='flex gap-4'>
            <input type="checkbox" className='accent-primary' id='idInactive'/>
            <label htmlFor="idInactive" className='text-gray-500'>I confirme my account desactivation</label>
        </form>
        <hr className='my-8 border-gray-500/30'/>
        <div className='flex justify-end'>
            <button className='bg-red-500/80 text-gray-100 py-2 px-2 rounded-lg hover:bg-red-500 transition-colors'>
                Desactive account
            </button>
        </div>
    </div> 
    </>
  )
}

export default Profile
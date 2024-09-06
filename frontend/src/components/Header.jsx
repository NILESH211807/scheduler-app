import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='w-full h-14 bg-white shadow-sm flex items-center justify-around'>
            <h1 className=' text-[15px] uppercase font-bold tracking-wide'>Scheduler App</h1>
            <div className='flex font-bold uppercase gap-3 md:gap-5'>
                <NavLink to='/'>
                    <h6 className='text-[15px] tracking-wider hover:text-teal-600 duration-500'>Home</h6>
                </NavLink>
                <NavLink to='/dashboard'>
                    <h6 className='text-[15px] tracking-wider hover:text-teal-600 duration-500'>dashboard</h6>
                </NavLink>
                <NavLink to='/admin'>
                    <h6 className='text-[15px] tracking-wider hover:text-teal-600 duration-500'>Admin</h6>
                </NavLink>
            </div>
        </div>
    )
}

export default Header

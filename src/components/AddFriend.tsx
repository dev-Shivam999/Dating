"use client"

import { AddFriendProps } from '@/utils/types/types';
import React, { FC, useState } from 'react';
import Button from './Button';
import { addFriend } from '@/lib/val/add-friend';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


type FormData =z.infer<typeof addFriend>
const AddFriend: FC<AddFriendProps> = ({ }) => {
    const [showData, setShowData] = useState<boolean>(false)
    const {register,handleSubmit,setError, formState:{errors}}=useForm<FormData>({
        resolver:zodResolver(addFriend)
    })

    const AddFri = async (name: string) => {
        try {
            const valName = addFriend.parse({ name })
            await axios.post('/api/friend/add', {
                name: name,
            })
            setShowData(true)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError("name",{message:error.message})
            }
        if (error instanceof AxiosError) {
            
            setError("name",{message:error.response?.data} )
        }

        setError("name",{message:"try again"})

        }
    }

    const onSubmit=(data:FormData)=>{
        AddFri(data.name)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm'>
            <label htmlFor="email" className='block text-sm  font-medium leading-6 text-zinc-300 '>
                AddFriend
            </label>

            <div className='mt-2 flex gap-4'>
                <input type=" text"  {...register('name')}className='block w-full border-none outline-none rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  px-3 sm: text-sm sm:leading-6 ' placeholder='lol' />
                <button    className=' bg-white px-3 rounded text-black py-2'  >
                Find
                </button>
            </div>
            <p className='mt-1 text-sm text-red-600 '>
            {errors.name?.message}{
            showData?
                        <p className='mt-1 text-sm text-green-600'>
                        Send request
                        </p>
            :""
            }</p>
        </form>
    );
};

export default AddFriend;
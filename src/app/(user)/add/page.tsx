import AddFriend from '@/components/AddFriend';
import React, { FC } from 'react';

const page:FC = () => {
    return (
        <main  className='p-3'>
            <h1 className='font-bold text-5xl mb-8'>Add Friend</h1>
            <AddFriend/> 
        </main>
    );
};

export default page;
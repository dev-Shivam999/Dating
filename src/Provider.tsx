import React, { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
interface ProviderType{
    children:ReactNode
}

const Provider:FC<ProviderType> = ({children}) => {
    return (
        <>
        <Toaster  position='top-center' reverseOrder={false}/>
        {children}
        </>
    )
    };

export default Provider;
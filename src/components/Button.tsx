import { ButtonProps } from '@/utils/types/types';
import React, { FC } from 'react';
import { Loader2 } from 'lucide-react';

const Button: FC<ButtonProps> = ({ isLoading, Text, Img, Click, className }) => {
    return (
        <div className={className} onClick={Click}>

            <div  > {
                isLoading ? <Loader2 className='animate-spin' /> : Img
            }</div>
            {
                " "
            }
            <div>
                {
                    Text
                }
            </div>
        </div>

    );
};

export default Button;
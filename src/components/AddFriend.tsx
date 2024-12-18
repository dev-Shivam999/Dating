"use client";

import { AddFriendProps } from '@/utils/types/types';
import React, { FC, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addFriend } from '@/lib/val/add-friend';
import { Add } from '@/lib/actions/Add';

type FormData = z.infer<typeof addFriend>;

const AddFriend: FC<AddFriendProps> = memo(() => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(addFriend),
    });

    const handleAddFriend = async (name: string) => {
        try {
            setIsSubmitting(true);
            const validated = addFriend.parse({ name });
            const response = await Add(validated.name);

            if (!response.success) {
                throw new Error(response.error || 'Unexpected error occurred.');
            }

            setShowSuccess(true);
        } catch (error:any) {
            if (error instanceof z.ZodError) {
                setError('name', { message: error.errors[0]?.message || 'Invalid input' });
            } else {
                setError('name', { message: error.message || 'An error occurred. Please try again.' });
            }
            setShowSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = (data: FormData) => {
        handleAddFriend(data.name);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                Add a Friend
            </label>
            <div className="mt-2 flex gap-4">
                <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    placeholder="Enter friend's name"
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-3 py-2 rounded"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Finding...' : 'Find'}
                </button>
            </div>
            {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
            {showSuccess && (
                <p className="mt-1 text-sm text-green-600">Friend request sent successfully!</p>
            )}
        </form>
    );
});

export default AddFriend;

"use server";

import prisma from "@/db/mainDb";

export const Add = async (name: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: { name },
        });

        if (!user) {
            return {
                success: false,
                error: 'User not found',
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Database error:', error);
        return {
            success: false,
            error: 'An error occurred while searching for the user.',
        };
    }
};

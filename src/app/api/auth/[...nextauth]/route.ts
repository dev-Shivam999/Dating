import NextAuth from "next-auth";
import { authOption } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOption);
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOption);
};

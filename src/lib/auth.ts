import { AuthOptions, User } from "next-auth";
import Client from "@/utils/db/mainDb"
import GoogleProvider from "next-auth/providers/google";

export const authOption: AuthOptions = {
    session: {
        strategy: "jwt",

    },
    pages: { signIn: "/login" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_SECRET || "",
            clientSecret: process.env.GOOGLE_CLIENT_ID || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
    callbacks: {
        async jwt({ token, user }) {
            console.log(token);


            const UserDb = (await Client.user.findFirst({
                where: {
                    email: String(token.email)
                }
            })) as User | null

            if (!UserDb) {

                token.id = user.id
                if (token.email && token.id&&token.name&&token.picture) {
                    
                    await Client.user.create({
                        data: {
                            email: token.email,
                            image: token.picture,
                            name: token.name,
                            
                            id: token.id
                        }
                    })
                }
                return token

            }

            return {
                id: UserDb.id,
                name: UserDb.name,
                email: UserDb.email,
                picture: UserDb.image

            }
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = (token.id)
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
            return session
        },
        redirect() {
            return '/dashboard'
        }
    }
}
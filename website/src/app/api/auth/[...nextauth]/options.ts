import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                let user = null
                const { email, password }: any = credentials
                try {
                    const response: any = await fetch(`http://localhost:8000/api/v1/auth/user/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email_or_phone: email,
                            password
                        })
                    })
                    if (response) {
                        const data = await response.json()
                        user = data?.data
                    }
                    return user
                } catch (err) {
                    // console.log(err)
                    return user
                    throw new Error("Http e")
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: '/signout'
    },
    callbacks: {
        async jwt({ token, user }:any) {
            if (user) {
                token = { ...token, ...user }
                token.sub = user.id
            }
            return token
        },
        async session({ session, token }:any) {
            if (session?.user) session.user = { ...session.user, ...token }
            return session
        },
    }

}
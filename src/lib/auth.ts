import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  callbacks: {

    async signIn({ profile }: any) {

      const allowedEmail = "arifw.affandi@gmail.com"

      if (profile?.email === allowedEmail) {
        return true
      }

      return false
    }

  },

  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
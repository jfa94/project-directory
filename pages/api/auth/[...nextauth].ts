import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export default NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
        })
    ]
})
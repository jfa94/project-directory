import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export default NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
            idToken: true,
        })
    ],
    callbacks: {
        session: async function ({session, token}) {
            session.user['sub'] = token.sub ?? session.sub
            session.user['token'] = token.bearerToken ?? session.bearerToken
            return session
        },
        async jwt({token, account}) {
            token.bearerToken = account?.id_token ?? token.bearerToken;
            return token;
        },
    },
})
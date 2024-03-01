// @ts-nocheck
import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export default NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID ?? '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET ?? '',
            issuer: `https://cognito-idp.${process.env.CLOUD_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
            idToken: true,
            authorization: {params: {scope: "openid aws.cognito.signin.user.admin"}},
            checks: ['none'],
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, token}) {
            return new Promise((Resolve, Reject) => {
                session.user['bearerToken'] = token?.bearerToken
                Resolve(session)
            })
        },
        async jwt({token, account}) {
            return new Promise(async (Resolve, Reject) => {
                if (Date.now() > token?.expires) {
                    const refreshedToken = await refreshAccessToken(token)
                    token.accessToken = refreshedToken.accessToken
                    token.bearerToken = refreshedToken.bearerToken
                    token.refreshToken = refreshedToken.refreshToken
                    token.expires = refreshedToken.bearerTokenExpires
                } else {
                    token.accessToken = account?.access_token ?? token.accessToken
                    token.bearerToken = account?.id_token ?? token.bearerToken
                    token.refreshToken = account?.refresh_token ?? token.refreshToken
                    token.expires = account?.expires_at ?? token.expires
                }
                Resolve(token)
            })
        },
    },
})

async function refreshAccessToken(token) {
    try {
        const url = `https://${process.env.COGNITO_USER_POOL}.auth.${process.env.CLOUD_REGION}.amazoncognito.com/oauth2/token?` +
            new URLSearchParams({
                grant_type: "refresh_token",
                client_id: process.env.COGNITO_CLIENT_ID,
                client_secret: process.env.COGNITO_CLIENT_SECRET,
                refresh_token: token.refreshToken,
            })

        const headerString = process.env.COGNITO_CLIENT_ID + ':' + process.env.COGNITO_CLIENT_SECRET
        const buff = Buffer.from(headerString, 'utf-8')
        const authHeader = buff.toString('base64')

        const refreshedTokensResponse = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + authHeader
            },
            method: "POST",
        })

        const refreshedTokens = await refreshedTokensResponse.json()

        return {
            bearerToken: refreshedTokens.id_token,
            accessToken: refreshedTokens.access_token,
            bearerTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        }
    } catch (error) {
        return error
    }
}

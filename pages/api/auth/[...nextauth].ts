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
                    // const account = {
                    //     provider: 'cognito',
                    //     type: 'oauth',
                    //     providerAccountId: token.sub,
                    //     id_token: refreshedToken.bearerToken,
                    //     access_token: refreshedToken.accessToken,
                    //     refresh_token: refreshedToken.refreshToken,
                    //     expires_at: refreshedToken.bearerTokenExpires,
                    //     token_type: 'Bearer',
                    // }
                    token.bearerToken = refreshedToken.bearerToken
                    token.expires = refreshedToken.bearerTokenExpires
                } else {
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
        const url = `https://${process.env.COGNITO_USER_POOL}.auth.${process.env.AWS_REGION}.amazoncognito.com/oauth2/token?` +
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

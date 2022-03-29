import {CognitoUserPool} from 'amazon-cognito-identity-js'

function logout() {
    const userPool = new CognitoUserPool({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_CLIENT_ID,
    })

    const cognitoUser = userPool.getCurrentUser()

    return new Promise((resolve, reject) => {
        if (cognitoUser) {
            cognitoUser.signOut()
            resolve(true)
        } else {
            reject(false)
        }
    })
}

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        try {
            await logout()
            res.status(200).json({success: 'successfully logged out'})
        } catch (err) {
            res.status(500).json({error: 'failed to log out'})
        }
    } else {
        res.status(405).json({error: 'method not allowed'})
    }
}

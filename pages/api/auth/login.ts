import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUser
} from 'amazon-cognito-identity-js'
import {NextApiRequest, NextApiResponse} from "next"

function authenticate(username: string, password: string) {
    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    })

    const userPool = new CognitoUserPool({
        UserPoolId: `${process.env.COGNITO_USER_POOL_ID}`,
        ClientId: `${process.env.COGNITO_CLIENT_ID}`,
    })

    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
    })

    return new Promise((success, error) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => success(result),
            onFailure: err => error(err)
        })
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const result = await authenticate(req.body.username, req.body.password)
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json({error: err})
        }
    } else {
        res.status(405).json({error: 'method not allowed'})
    }
}
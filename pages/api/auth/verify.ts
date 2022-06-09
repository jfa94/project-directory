import {NextApiRequest, NextApiResponse} from "next"
import {getToken} from "next-auth/jwt"
import AWS from "aws-sdk"

export default async function verify(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const token = await getToken({req})

    if (token && req.method === 'PUT') {
        const params = {
            // @ts-ignore
            AccessToken: token?.accessToken ?? '',
            AttributeName: 'email',
            Code: req.body.verificationCode ?? ''
        }

        try {
            const cognitoClient = new AWS.CognitoIdentityServiceProvider()

            // @ts-ignore
            const resp = await cognitoClient.verifyUserAttribute(params).promise()
            console.log(JSON.stringify(resp))
            res.status(200).json({success: true})
        } catch (error) {
            if (error instanceof Error) {
                console.log('error: ', error)
                // @ts-ignore
                res.status(error.status || 400).end(error.message)
            } else {
                console.error('Unknown error: ', error)
            }
        }
    } else {
        res.status(405).end('Method not allowed')
    }
}
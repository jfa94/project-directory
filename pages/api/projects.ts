import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/react"
import AWS from "aws-sdk"

export default async function getProjects(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req})

    if (session && ['GET', 'POST', 'PUT'].includes(req.method)) {
        const login = `cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`

        AWS.config.region = process.env.AWS_REGION
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
            Logins: {
                // @ts-ignore
                [login]: session.user.bearerToken
            }
        })

        try {
            // @ts-ignore
            await AWS.config.credentials.getPromise()

            const db = await new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION})

            switch (req.method) {
                case 'GET':
                    const params = {
                        TableName: process.env.DYNAMODB_TABLE,
                        KeyConditionExpression: "userid = :userId",
                        // @ts-ignore
                        ExpressionAttributeValues: {":userId": `${AWS.config.credentials.data.IdentityId}`}
                    }

                    const data = await db.query(params).promise()
                    res.status(200).json(data)
                    break
                case 'POST':

            }

        } catch (err) {
            res.status(err.statusCode).json({error: err})
            res.end()
        }
    } else {
        res.status(403).json({error: 'unauthorized'})
        res.end()
    }
}

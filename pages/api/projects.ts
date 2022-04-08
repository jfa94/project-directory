import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/react"
import AWS from "aws-sdk"

export default async function getProjects(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req})
    const login = `cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`

    if (session) {
        AWS.config.region = process.env.AWS_REGION
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
            Logins: {
                // @ts-ignore
                [login]: session.user.token
            }
        })
        // @ts-ignore
        AWS.config.credentials.get(err => {
            if (!err) {
                const db = new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION})
                const params = {
                    TableName: process.env.DYNAMODB_TABLE,
                    KeyConditionExpression: "userid = :userId",
                    ExpressionAttributeValues: {
                        // @ts-ignore
                        ":userId": `${process.env.AWS_REGION}:${session.user.sub}`
                    }
                }
                console.log(params)

                db.query(params, function (err, data) {
                    if (err) {
                        res.status(500).json({error: err})
                    } else {
                        res.status(200).json(data)
                    }
                })
            } else {
                res.status(500).json({error: err})
                res.end()
            }
        })
    } else {
        res.status(403).json({
            message: 'unauthorized'
        })
        res.end()
    }
}
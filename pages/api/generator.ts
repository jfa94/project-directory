// @ts-nocheck
import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/react"
import AWS from "aws-sdk"

// TODO: create TS interfaces for ddb request params

export default async function getGeneratorWaitlist(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({req})

    if (session && ['PUT', 'DELETE'].includes(req.method ?? '')) {
        const login = `cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`

        AWS.config.region = process.env.AWS_REGION
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID ?? '',
            Logins: {
                // @ts-ignore
                [login]: session.user.bearerToken
            }
        })

        try {
            // @ts-ignore
            await AWS.config.credentials.getPromise()

            const ddb = await new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION})
            const params = {TableName: process.env.DYNAMODB_WAITLIST_TABLE ?? ''}

            switch (req.method) {
                case 'PUT' :
                    // TODO: Add validation (e.g. has project name, start date)
                    params['ReturnValues'] = 'ALL_OLD'
                    params['Item'] = {
                        // @ts-ignore
                        'userid': AWS.config.credentials.data.IdentityId,
                        'email': req.body.email,
                        'name': req.body.name
                    }
                    try {
                        // @ts-ignore
                        const response = await ddb.put(params).promise()
                        res.status(response.Attributes ? 200 : 201).json({projectId: response?.Attributes?.projectid ?? req.body.projectid})
                    } catch (error) {
                        console.log(error)
                        res.status(error.statusCode).json({error: error})
                    }
                    break
                case 'DELETE':
                    params['Key'] = {
                        // @ts-ignore
                        'email': req.body.email
                    }
                    try {
                        // @ts-ignore
                        await ddb.delete(params).promise()
                        res.status(204).end()
                    } catch (error) {
                        res.status(error.statusCode).json({error: error})
                    }
                    break
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

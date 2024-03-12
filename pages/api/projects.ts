// @ts-nocheck
import {NextApiRequest, NextApiResponse} from "next"
import {getServerSession} from "next-auth/next"
import AWS from "aws-sdk"
import {authOptions} from "./auth/[...nextauth]"

// TODO: create TS interfaces for ddb request params

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export default async function getProjects(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getServerSession(req, res, authOptions)

    if (session && ['GET', 'PUT', 'DELETE'].includes(req.method ?? '')) {
        const login = `cognito-idp.${process.env.CLOUD_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`
        const iam_sub = parseJwt(session.user.bearerToken).sub

        AWS.config.region = process.env.CLOUD_REGION
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

            const ddb = await new AWS.DynamoDB.DocumentClient({region: process.env.CLOUD_REGION})
            const params = {TableName: process.env.DYNAMODB_TABLE ?? ''}

            switch (req.method) {
                case 'GET':
                    params['KeyConditionExpression'] = "userid = :userId"
                    // @ts-ignore
                    params['ExpressionAttributeValues'] = {":userId": `${AWS.config.credentials.data.IdentityId}`}

                    try {
                        const data = await ddb.query(params).promise()
                        const processed = {}
                        data.Items.forEach(item => {
                            processed[item.projectid] = {...item}
                            delete processed[item.projectid].userid
                            delete processed[item.projectid].projectid
                        })

                        res.status(200).json(processed)
                    } catch (error) {
                        res.status(error.statusCode).json({error: error})
                    }
                    break
                case 'PUT' :
                    // TODO: Add validation (e.g. has project name, start date)
                    params['ReturnValues'] = 'ALL_OLD'
                    params['Item'] = {
                        // @ts-ignore
                        'userid': AWS.config.credentials.data.IdentityId,
                        'sub': iam_sub,
                        'projectid': req.body.projectid,
                        'title': req.body.title,
                        'category': req.body.category,
                        'message': req.body.message,
                        'context': req.body.context,
                        'actions': req.body.actions,
                        'impact': req.body.impact,
                        'learnings': req.body.learnings,
                        'startDate': req.body.startDate,
                        'endDate': req.body.endDate,
                        'tags': req.body.tags,
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
                        'userid': AWS.config.credentials.data.IdentityId,
                        'projectid': req.body.projectid
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

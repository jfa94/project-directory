import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/react"
import AWS from "aws-sdk"

// TODO: create TS interfaces for ddb request params

export default async function getProjects(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({req})

    if (session && ['GET', 'PUT', 'DELETE'].includes(req.method)) {
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

            const ddb = await new AWS.DynamoDB.DocumentClient({region: process.env.AWS_REGION})
            const params = {TableName: process.env.DYNAMODB_TABLE}

            switch (req.method) {
                case 'GET':
                    params['KeyConditionExpression'] = "userid = :userId"
                    // @ts-ignore
                    params['ExpressionAttributeValues'] = {":userId": `${AWS.config.credentials.data.IdentityId}`}

                    const data = await ddb.query(params).promise()
                    const processed = {}
                    data.Items.forEach(item => {
                        processed[item.projectid] = {...item}
                        delete processed[item.projectid].userid
                        delete processed[item.projectid].projectid
                    })

                    res.status(200).json(processed)
                    break
                case 'PUT' :
                    const formattedTags = req.body.tags.map(tag => {return {S: tag}})
                    params['Item'] = {
                        // @ts-ignore
                        'userid': {S: AWS.config.credentials.data.IdentityId},
                        'projectid': {S: req.body.projectid},
                        'title': {S: req.body.title},
                        'category': {S: req.body.category},
                        'message': {S: req.body.message},
                        'context': {S: req.body.context},
                        'actions': {S: req.body.actions},
                        'impact': {S: req.body.impact},
                        'learnings': {S: req.body.learnings},
                        'startDate': {S: req.body.startDate},
                        'endDate': {S: req.body.endDate},
                        'tags': {L: formattedTags},
                    }
                    // TODO: implement using ddb.putItem()
                    break
                case 'DELETE':
                    // TODO: implement delete
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

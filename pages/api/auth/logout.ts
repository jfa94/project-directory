export default async function logout(req, res) {
    try {
        await res.redirect(`https://${process.env.COGNITO_USER_POOL}.auth.${process.env.AWS_REGION}.amazoncognito.com/logout?client_id=${process.env.COGNITO_CLIENT_ID}&logout_uri=${process.env.CANONICAL_URL}/`);
    } catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}
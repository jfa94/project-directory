import GlobalStyle from "../styles/globalStyles"
import {AuthProvider} from "../context/AuthContext"
import Layout from "../components/layout/Layout"

function MyApp({Component, pageProps}) {
    return <>
        <GlobalStyle/>
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    </>
}

export default MyApp

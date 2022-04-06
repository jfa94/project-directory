import {SessionProvider} from "next-auth/react"
import GlobalStyle from "../styles/globalStyles"
import Layout from "../components/layout/Layout"

function MyApp({Component, pageProps}) {
    return <>
        <SessionProvider session={pageProps.session}>
            <GlobalStyle/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    </>
}

export default MyApp

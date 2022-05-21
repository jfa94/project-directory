import {SessionProvider} from "next-auth/react"
import GlobalStyle from "../styles/globalStyles"
import Layout from "../components/layout/Layout"
import {AppProps} from "next/app"

function MyApp({Component, pageProps}: AppProps) {
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

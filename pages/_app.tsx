import {SessionProvider} from "next-auth/react"
import GlobalStyle from "../styles/globalStyles"
import Layout from "../components/layout/Layout"
import {AppProps} from "next/app"
import {theme} from "../styles/theme"
import {ThemeProvider} from "styled-components"

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </SessionProvider>
    </>
}

export default MyApp

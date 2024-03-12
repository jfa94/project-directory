import {SessionProvider} from "next-auth/react"
import GlobalStyle from "../styles/globalStyles"
import Layout from "../components/layout/Layout"
import {AppProps} from "next/app"
import {theme} from "../styles/theme"
import {ThemeProvider} from "styled-components"
import Script from "next/script"

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-XHHY0PB2VV"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-XHHY0PB2VV');
        `}
        </Script>
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

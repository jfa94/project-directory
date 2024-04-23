import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document"
import {ServerStyleSheet} from "styled-components"

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8"/>
                    <title>Uncovered: Achievement Tracker and Cover Letter Generator</title>
                    <meta name="description" content="Achievement tracker and cover letter generator empowering professionals to effectively showcase their skills and experiences. Uncovered uses AI to create unique cover letters that address what recruiters are looking for. Stand out from other applicants, be better prepared for interviews, and make a bulletproof case for promotion."/>

                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    <meta property="og:title" content="Uncovered: Achievement Tracker and Cover Letter Generator"/>
                    <meta property="og:description" content="Uncovered helps showcase your skills and experience by keeping track of your achievements and using AI to generate unique cover letters." />
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://uncoveredapp.com/"/>
                    {/*<meta property="og:image" content="img/indie-engineering-banner.png"/>*/}
                    <link rel="icon" href="logo/favicon.ico"/>

                    <meta name="keywords" content="achievement tracking, cover letter generator, career development, job application, interview preparation, AI cover letters, promotion help"/>
                    <meta name="author" content="Uncovered"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }

    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                    sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}

import Document, {DocumentContext, Head, Html, Main, NextScript} from "next/document"
import {ServerStyleSheet} from "styled-components"

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8"/>
                    <title>Uncovered: Achievement Tracker and Cover Letter Generator</title>
                    <meta name="description"
                          content="Track your projects and create custom cover letters using AI."/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                    <meta property="og:title"
                          content="Uncovered: track your achievements and generate custom cover letters"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://uncoveredapp.com/"/>
                    {/*<meta property="og:image" content="img/indie-engineering-banner.png"/>*/}
                    {/*<link rel="shortcut icon" href="/logo/favicon.ico"/>*/}
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
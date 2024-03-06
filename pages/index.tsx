import {FC, MouseEvent} from "react"
import Image from "next/image"
import {useRouter} from "next/router"
import styled from "styled-components"
import Button from "../components/shared/Button"
import Card from "../components/shared/Card"
import Highlight from "../components/shared/Highlight"

interface Props {
}

const Home: FC<Props> = () => {
    const router = useRouter()
    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        router.push("/directory")
    }

    return <Container>
        <Welcome>
            <WelcomeText>
                <H2>Choose great interview examples</H2>
                <P>
                    Project Directory helps you keep track of your achievements to prepare for interviews or negotiate
                    your next promotion.<br/>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    {/*Stay confident when asked to "talk about a time when..."*/}
                </P>

                <H2>Automate your cover letters</H2>
                <P>
                    Use the Cover Letter Generator to turn your achievements into a custom letter for each application.
                </P>

                <ButtonContainer>
                    <Button onClick={handleClick} size="large">
                        Get Started
                    </Button>
                    {/*<Button filled={false} onClick={handleClick}>Learn More</Button>*/}
                </ButtonContainer>
            </WelcomeText>

            <WelcomeImage>
                <Image src="/images/welcome.svg"
                       alt="Welcome"
                    // height={550}
                    // width={550}
                       priority={true}
                       fill={true}
                />
            </WelcomeImage>
        </Welcome>

        <FeatureIconSection>
            <IconCarousel primary={false}>
                <IconContainer>
                    <h2>Keep track of your achievements</h2>
                </IconContainer>
                <IconContainer>
                    <h2>Effortlessly prepare for interviews</h2>
                </IconContainer>
                <IconContainer>
                    <h2>Leverage AI to write custom cover letters</h2>
                </IconContainer>
            </IconCarousel>
        </FeatureIconSection>

        <InformationSection>

            <FeatureCard>
                <FeatureHeader>Remember all the <Highlight>important details</Highlight></FeatureHeader>
                <div>
                    <p>
                        Working on an amazing project? Keep track of your work, the context surrounding it, the impact
                        it had, and more, so you never forget an important detail.
                    </p>
                    <p>
                        The Project Directory template prompts you to think of important factors ahead of time.
                        What are you trying to communicate with each example? What was the impact of your work? Did you
                        learn anything new?
                    </p>
                </div>
            </FeatureCard>

            <FeatureCard>
                <FeatureHeader>Always find the <Highlight>perfect example</Highlight></FeatureHeader>
                <div>
                    <p>
                        Don&rsquo;t let tough interview questions catch you off guard. Use the search feature to
                        easily find the perfect example from your saved stories to answer any
                        question with confidence.
                    </p>
                    <p>
                        Adding tags makes it easy to find the perfect interview example, or put together a bulletproof
                        case for promotion. Stand out in your interviews and impress hiring managers with your
                        preparedness and expertise.
                    </p>
                </div>
            </FeatureCard>

            <FeatureCard>
                <FeatureHeader>A <Highlight>custom letter</Highlight> for every application</FeatureHeader>
                <div>
                    <p>
                        Leverage the power of storytelling to stand out in a crowded job market. Impress recruiters and
                        hiring managers with a personalized, unique cover letter that showcases your skills and
                        experiences.
                    </p>
                    <p>
                        The Cover Letter Generator uses your saved success stories to create a tailored cover letter
                        that speaks directly to the hiring manager&rsquo;s needs.
                    </p>
                </div>
            </FeatureCard>

            {/*<FeatureCard>*/}
            {/*    <FeatureHeader>Get reminders to stay consistent</FeatureHeader>*/}
            {/*    /!* eslint-disable-next-line react/no-unescaped-entities *!/*/}
            {/*    <p>Still working on a project? Set reminders so you don't forget to log your latest work.</p>*/}
            {/*</FeatureCard>*/}

        </InformationSection>

        <HowSection>
            <H2>How does it work?</H2>
            <p>
                The Cover Letter Generator uses a fine-tuned large language model based on Google&rsquo;s
                <a href="https://huggingface.co/docs/transformers/model_doc/flan-t5">FLAN-T5</a>. The model runs on a
                private AWS server, so your data is protected from third parties. We will never sell any of your
                personal information.
            </p>
        </HowSection>

        <FooterSection>
            <h3>UNCOVERED</h3>
        </FooterSection>
    </Container>
}

const Container = styled.div`
`

const Section = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 850px) {
        flex-direction: column;
        gap: 2rem;
    }
`

const Welcome = styled(Section)`
    justify-content: space-around;
    padding: 0 5rem;
    background: linear-gradient(to bottom,
    white 0%,
    white 50%,
    whitesmoke 100%);

    @media (min-width: 1950px) {
        justify-content: center;
        gap: 15rem;
    }

    @media (max-width: 1250px) {
        padding: 0 2rem;
    }

    @media (max-width: 750px) {
        padding: 0;
    }
`

const WelcomeText = styled.div`
    padding: 1.5rem;
    max-width: 750px;
    min-width: 0;
`

const H2 = styled.h2`
    font-size: ${props => props.theme.fontSizes.xxlarge};
    line-height: 2.8rem;
    //min-height: 5.6rem;
    margin: 0;
`

const P = styled.p`
    font-size: ${props => props.theme.fontSizes.xlarge};
    margin: 0.5rem 0 2rem 0;
`

const WelcomeImage = styled.div`
    height: 500px;
    width: 500px;
    min-width: 400px;
    position: relative;
    display: flex;
    justify-content: center;
    margin: 0 1.5rem;

    @media (max-width: 650px) {
        height: 350px;
        width: 350px;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2.5rem;
    font-size: ${props => props.theme.fontSizes.large};
`

const FeatureIconSection = styled(Section)`
    background: linear-gradient(0deg, white 50%, whitesmoke 50%);
    padding: 4rem 0;

    @media (max-width: 850px) {
        padding: 3rem 1rem;
    }
`

const IconCarousel = styled(Card)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;
    max-width: 70rem;
    padding: 2rem 0;
    margin: 0 2rem;

    & div:not(:first-child) {
        border-left: 1px solid grey;
    }

`

const IconContainer = styled.div`
    //width: 100%;
    //height: 80%;
    padding: 1rem 2rem;
    background: white;
    font-size: ${props => props.theme.fontSizes.medium};

    @media (max-width: 850px) {
        font-size: ${props => props.theme.fontSizes.small};
        padding: 0.7rem 1.4rem;
    }

    @media (max-width: 500px) {
        font-size: ${props => props.theme.fontSizes.xsmall};
    }
`

const InformationSection = styled(Section)`
    flex-direction: column;
    margin: auto;
    max-width: 1250px;
    padding: 0;
`

const FeatureCard = styled.div`
    max-width: 100%;
    margin: 0 4rem 2rem;

    & > div {
        font-size: ${props => props.theme.fontSizes.large};
        line-height: 1.7rem;
    }

    @media (max-width: 650px) {
        margin: 0 1rem;
    }

    @media (min-width: 1000px) {
        display: grid;
        grid-template-columns: 2fr 5fr;
        gap: 2rem;

    }
`

const FeatureHeader = styled.h2`
`

const HowSection = styled(Section)`
    background: ${props => props.theme.colors.backgroundAlt};
`

const FooterSection = styled(Section)`
    color: white;
    background: ${props => props.theme.colors.backgroundNegative};
`

export default Home;

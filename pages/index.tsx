import {FC} from "react"
import Link from "next/link"
import Image from "next/image"
import styled from "styled-components"
import Button from "../components/shared/Button"
import Card from "../components/shared/Card";

interface Props {
}

const handleClick = () => {
    alert('Click')
}

const Home: FC<Props> = () => {
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
                    <Button onClick={handleClick} size="large">Get Started</Button>
                    {/*<Button filled={false} onClick={handleClick}>Learn More</Button>*/}
                </ButtonContainer>
            </WelcomeText>

            <WelcomeImage>
                <Image src="/images/welcome.svg"
                       alt="Welcome"
                       height={550}
                       width={550}
                />
            </WelcomeImage>
        </Welcome>

        <Information>
            <CardCarousel>
                <FeatureCard primary={false}>
                    <h2>Remember all the important details</h2>
                    <p>
                        Working on an amazing project? Keep track of your work, the context surrounding it, the impact
                        it had, and more, so you never forget an important detail.
                    </p>
                    <p>
                        The Project Directory template prompts you to think of important factors ahead of time, such as:
                        What are you trying to communicate with each example? What was the impact of your work? Did you
                        learn anything new?
                    </p>
                </FeatureCard>

                <FeatureCard primary={false}>
                    <h2>Find</h2>
                    <p>
                        Adding tags makes it easy to find the perfect interview example, or put together a bulletproof
                        case for promotion.
                    </p>
                </FeatureCard>

                <FeatureCard primary={false}>
                    <h2>A custom cover letter for every application</h2>
                    <p>Feature description</p>
                </FeatureCard>

                <FeatureCard primary={false}>
                    <h2>Get reminders to stay consistent</h2>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>Still working on a project? Set reminders so you don't forget to log your latest work.</p>
                </FeatureCard>

            </CardCarousel>
        </Information>
    </Container>
}

const Container = styled.div`
`

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 2rem;
  }
`

const Welcome = styled(Section)`
  background: linear-gradient(to bottom,
  white 0%,
  white 90%,
  whitesmoke 100%)
`

const WelcomeText = styled.div`
  padding: 1.5rem;
  max-width: 600px;
`

const H2 = styled.h2`
  font-size: 2.5rem;
  line-height: 2.8rem;
  margin: 0;
`

const P = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0 2rem 0;
`

const WelcomeImage = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 2rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  font-size: 1.5rem;
`

const Information = styled(Section)`
  background-color: whitesmoke;
  padding: 4rem 0;
`

const CardCarousel = styled.div`
  width: 100%;
  padding: 0 4rem;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  @media (max-width: 1250px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1rem;
  }
`

const FeatureCard = styled(Card)`
  width: 100%;
`

export default Home;
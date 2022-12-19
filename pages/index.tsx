import {FC} from "react"
import Link from "next/link"
import Image from "next/image"
import styled from "styled-components"
import Button from "../components/shared/Button"

interface Props {
}

const handleClick = () => {
    alert('Click')
}

const Home: FC<Props> = () => {
    return <Container>
        <Section>
            <WelcomeText>
                <h2>
                    Choose great interview examples<br/>
                    Automate your cover letters
                </h2>
                <p>
                    Project Directory helps you keep track of your achievements and prepare for interviews. <br/>
                    Use the Cover Letter Generator to turn your achievements into a custom letter for each application.
                </p>
                <ButtonContainer>
                    <Button onClick={handleClick}>Get Started</Button>
                    <Button filled={false} onClick={handleClick}>Learn More</Button>
                </ButtonContainer>
            </WelcomeText>

            <WelcomeImage>
                <Image src="/images/welcome.svg"
                       alt="Welcome"
                       height={350}
                       width={350}
                />
            </WelcomeImage>
        </Section>
    </Container>
}

const Container = styled.div`
  background-color: aqua;
`

const Section = styled.div`
  background-color: blueviolet;
  display: flex;
  flex-direction: row;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`

const WelcomeText = styled.div`
    max-width: 450px;
`

const WelcomeImage = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonContainer = styled.div`

`

export default Home;
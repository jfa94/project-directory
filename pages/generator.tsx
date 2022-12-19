import {FC, FormEvent, useReducer} from "react"
import styled from "styled-components"
import {signIn, useSession} from "next-auth/react"
import Card from "../components/shared/Card"
import {
    FullWidthDiv,
    HalfWidthDiv,
    Input,
    Label,
    LayoutContainer,
    P,
    QuarterWidthDiv,
    ThreeQuartersWidthDiv
} from "../components/shared/styledComponents";
import Button from "../components/shared/Button";

interface Props {

}

const reducer = (state: { name: string, email: string }, {field, value}: { field: string, value: string }) => {
    return {
        ...state,
        [field]: value
    }
}

const Generator: FC<Props> = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            signIn('cognito', {callbackUrl: '/generator'})
        }
    })
    const [state, dispatch] = useReducer(reducer, {name: '', email: ''})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // alert('submitted')
    }

    const onChange = (e: FormEvent<HTMLDivElement> | FormEvent<HTMLTextAreaElement>) => {
        dispatch({field: (e.target as HTMLFormElement).name, value: (e.target as HTMLFormElement).value})
    }

    const handleClick = async () => {
        const validEmail = state.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (validEmail && state.name != '') {
            const response = await fetch('/api/generator', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: state.name, email: state.email})
            })
            const responseData = await response.json()
            console.log(responseData)
            alert(`${state.name} submitted a form with email: ${state.email}`)
            dispatch({field: 'name', value: ''})
            dispatch({field: 'email', value: ''})
        } else {
            alert('Invalid name or email address.')
        }
    }

    return <Page>
        <CardContainer>
            <Card style={{padding: '3rem'}} primary={false}>
                <form onSubmit={handleSubmit}>
                    <LayoutContainer>
                        <FullWidthDiv>
                            <P style={{fontWeight: 'bold'}}>Welcome to the Cover Letter Generator!</P>
                        </FullWidthDiv>
                        <FullWidthDiv>
                            <P>This feature isn&rsquo;t quite ready yet. For updates, please sign up with your email
                                below:</P>
                        </FullWidthDiv>
                        <QuarterWidthDiv>
                            <Label htmlFor="name">Name </Label>
                            <Input type="text" id="name" name="name" value={state.name} onChange={onChange}/><br/>
                        </QuarterWidthDiv>
                        <ThreeQuartersWidthDiv>
                            <Label htmlFor="email">Email </Label>
                            <Input type="text" id="email" name="email" value={state.email} onChange={onChange}/><br/>
                        </ThreeQuartersWidthDiv>
                        <ButtonDiv>
                            <Button onClick={handleClick}>
                                Submit
                            </Button>
                        </ButtonDiv>
                    </LayoutContainer>
                </form>
            </Card>
        </CardContainer>
    </Page>
}

const Page = styled.div`
  width: 100%;
  margin-top: 10rem;
  display: flex;
  justify-content: center;
`

const CardContainer = styled.div`
  max-width: 35rem;
`

const ButtonDiv = styled(FullWidthDiv)`
  display: flex;
  justify-content: flex-end;
`

export default Generator;
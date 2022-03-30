import {FC, useContext, useState} from "react"
import {useRouter} from "next/router"
import styled from "styled-components"

import Card from '../components/shared/Card'
import {AuthContext} from "../context/AuthContext"

interface Props {}

const Login: FC<Props> = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [waiting, setWaiting] = useState(false)

    const {login} = useContext(AuthContext)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setWaiting(true)

        const data = await login(email, password)

        if (data.success) {
            const reroute = router.query.redirect ? router.query.redirect : '/'
            await router.push(reroute as string)
        } else {
            setWaiting(false)
            console.log(data)
            data.data.error.code === 'NotAuthorizedException' ? alert('Invalid email or password') : alert('Something went wrong')
            setPassword('')
        }
    }

    return <FormContainer>
        <h1>Login</h1>
        <CardExtended>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {waiting ? <SubmitButton disabled>...</SubmitButton> :
                    <SubmitButton type="submit">Submit</SubmitButton>}
            </Form>
        </CardExtended>
    </FormContainer>
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CardExtended = styled(Card)`
  padding: 3rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`

const Label = styled.label`
  width: 100%;
  text-align: left;
`

const Input = styled.input`
  margin-bottom: 1.5rem;
`

const SubmitButton = styled.button`
  align-self: flex-end;
`

export default Login;
// TODO: Fix rendering of correct email after changing
import {FC, useCallback, useState} from "react"
import styled from "styled-components"
import {signIn, useSession} from "next-auth/react"

interface Props {
}

const Profile: FC<Props> = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            signIn('cognito', {callbackUrl: '/profile'})
        }
    })

    const [isEditing, setIsEditing] = useState<Boolean>(false)
    const [nameValue, setNameValue] = useState<string>(session?.user?.name ?? '')
    const [emailValue, setEmailValue] = useState<string>(session?.user?.email ?? '')
    const [pendingVerification, setPendingVerification] = useState<Boolean>(false)
    const [currentPasswordValue, setCurrentPasswordValue] = useState<string>('')
    const [proposedPasswordValue, setProposedPasswordValue] = useState<string>('')

    const updateValue = useCallback(async (attributeName: 'email' | 'name', value: string) => {
            const response = await fetch('/api/auth/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({attributeName: attributeName, newValue: value})
            })

            if (response.status === 200 && attributeName === 'email') {
                alert('Pending verification - please check your email.')
                setPendingVerification(true)
            } else if (response.status === 200 && attributeName === 'name') {
                alert('Name updated!')
                setIsEditing(false)
            } else {
                alert('Error updating value.')
                setIsEditing(false)
            }
        }, []
    )

    const changePassword = useCallback(async (currentPassword: string, proposedPassword: string) => {
        const response = await fetch('/api/auth/changePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({currentPassword: currentPassword, proposedPassword: proposedPassword})
        })

        if (response.status === 200) {
            alert('Password updated!')
            setIsEditing(false)
        } else {
            alert('Error updating value.')
            setIsEditing(false)
        }
    }, [])

    const verifyEmail = useCallback(async (verificationCode: string) => {
        const response = await fetch('/api/auth/verify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({verificationCode})
        })

        if (response.status === 200) {
            alert('Email updated!')
            setPendingVerification(false)
            setIsEditing(false)
            // document.dispatchEvent(new Event("visibilitychange"))
        } else {
            alert('Error verifying email. Please check the code and try again.')
        }
    }, [])

    return <Background>
        <Container>
            <h1>Profile</h1>
            <div>
                {isEditing ?
                    <>
                        <div>
                            <Label htmlFor='name'><b>Name</b></Label>
                            <Input id='name'
                                   type="text"
                                   value={nameValue}
                                   onChange={(e) => setNameValue(e.target.value)}
                            />
                            <Button
                                onClick={() => updateValue('name', nameValue)}>
                                Update
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>

                        <div>
                            <Label htmlFor='email'><b>Email</b></Label>
                            <Input id='email'
                                   type="text"
                                   value={emailValue}
                                   onChange={(e) => setEmailValue(e.target.value)}
                            />
                            <Button
                                onClick={() => pendingVerification ? verifyEmail(emailValue) : updateValue('email', emailValue)}>
                                {pendingVerification ? 'Verify' : 'Update'}
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>

                        <div>
                            <Label htmlFor='password'><b>Current Password</b></Label>
                            <Input id='password'
                                   type='password'
                                   value={currentPasswordValue}
                                   onChange={(e) => setCurrentPasswordValue(e.target.value)}
                            />
                            <Label htmlFor='proposedPassword'>New Password</Label>
                            <Input id='proposedPassword'
                                   type='password'
                                   value={proposedPasswordValue}
                                   onChange={(e) => setProposedPasswordValue(e.target.value)}
                            />
                            <Button onClick={() => changePassword(currentPasswordValue, proposedPasswordValue)}>
                                Update
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                    </> :

                    <>
                        <div>
                            <P><b>Name</b></P>
                            <P>{nameValue}</P>
                            <Button onClick={() => setIsEditing(true)}>Edit</Button>
                        </div>
                        <div>
                            <P><b>Email</b></P>
                            <P>{emailValue}</P>
                            <Button onClick={() => setIsEditing(true)}>Edit</Button>
                        </div>
                        <div>
                            <P><b>Password</b></P>
                            <P>******</P>
                            <Button onClick={() => setIsEditing(true)}>Edit</Button>
                        </div>
                    </>}
            </div>
        </Container>
    </Background>
}

const Background = styled.div`
  background-color: ${props => props.theme.backgroundAlt};
  border-top: 1px solid ${props => props.theme.backgroundAlt};
  min-height: calc(100vh - 6rem);
`

const Container = styled.div`
  background-color: white;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
  padding: 2rem;
  border-radius: 0.5em;
`

const Input = styled.input`
  width: 15rem;
  margin: 1rem;
`

const Label = styled.label`
`

const P = styled.p`
  display: inline-block;
  margin-right: 0.8rem;
`

const Button = styled.button``

export default Profile;
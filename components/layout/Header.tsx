import {FC} from "react"
import styled from "styled-components"
import {useSession, signOut, signIn} from "next-auth/react"
import Link from "next/link"

interface Props {
}

const Header: FC<Props> = () => {
    const {data: session} = useSession()

    return <CustomHeader>
        <Link href="/" passHref>
            <Logo>
                <p>Logo</p>
            </Logo>
        </Link>
        <Navigation>
            <Link href="/">Home</Link>
            <Link href="/directory">Directory</Link>
            <Link href="/generator">Generator</Link>
            {session ?
                <>
                    <Link href="/profile">Profile</Link>
                    <button onClick={() => signOut({callbackUrl: "/api/auth/logout"})}>Logout</button>
                </> :
                <button onClick={() => signIn('cognito')}>Login</button>
            }
        </Navigation>
    </CustomHeader>
}

const CustomHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const Logo = styled.div`
  cursor: pointer;
  height: 4rem;
  display: flex;
  align-items: center;
`

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;

  a, button {
    margin-left: 1rem;
  }
`

export default Header;
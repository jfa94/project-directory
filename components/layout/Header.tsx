import {FC} from "react"
import styled from "styled-components"
import {useSession, signOut, signIn} from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import Button from "../../components/shared/Button"

interface Props {
}

const Header: FC<Props> = () => {
    const {data: session} = useSession()

    return <CustomHeader>
        <Link href="/" passHref>
            <Logo>
                <Image src="/logo/uncovered_logo.svg" alt="UNCOVERED" width={200} height={35}/>
            </Logo>
        </Link>
        <Navigation>
            <Link href="/">HOME</Link>
            <Link href="/directory">DIRECTORY</Link>
            <Link href="/generator">GENERATOR</Link>
            {session ?
                <>
                    <Link href="/profile">PROFILE</Link>
                    <Button filled={false} onClick={() => signOut({callbackUrl: "/api/auth/logout"})}>LOGOUT</Button>
                </> :
                <Button onClick={() => signIn('cognito')}>LOGIN</Button>
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
  //height: 4rem;
  display: flex;
  align-items: center;
`

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;

  a, button {
    margin: 0.5rem;

    font-weight: bold;
    font-size: 0.9rem;

  }

  a {
    &:hover {
      transform: translate(0, -0.1rem);
      text-decoration: wavy underline;
    }
  }
`

export default Header;
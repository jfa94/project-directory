import {FC, useContext} from "react"
import styled from "styled-components"
import Link from "next/link"

import {AuthContext} from "../../context/AuthContext"

interface Props {}

const Header:FC<Props> = () => {
    const {user, login, logout} = useContext(AuthContext)

    return <CustomHeader>
        <Link href="/" passHref>
            <Logo>
                <p>Logo</p>
            </Logo>
        </Link>
        <Navigation>
            <Link href="/">Home</Link>
            <Link href="/directory">Directory</Link>
            {user ?
                <button onClick={logout}>Logout</button> :
                <button onClick={login}>Login</button>
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
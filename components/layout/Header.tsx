import React, {FC, useEffect, useRef, useState} from "react"
import styled, { css } from "styled-components"
import {useSession, signOut, signIn} from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import Button from "../../components/shared/Button"

interface Props {
}

const Header: FC<Props> = () => {
    const {data: session} = useSession()
    const [mobileNavShown, setMobileNavShown] = useState(false)
    let onMobile: React.MutableRefObject<boolean> = useRef(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 850px)')
        onMobile.current = mediaQuery.matches
    }, [])

    const hideShowNav = () => {
        if (onMobile.current) {
            setMobileNavShown(prevState => !prevState)
        }
    }

    return <CustomHeader>
        <Link href="/" passHref>
            <Logo>
                <Image src="/logo/uncovered_logo.svg" alt="UNCOVERED" width={200} height={35}/>
                <P>BETA</P>
            </Logo>
        </Link>
            <Navigation onClick={hideShowNav} hidden={onMobile.current && !mobileNavShown}>
                <Link href="/">HOME</Link>
                <Link href="/directory">DIRECTORY</Link>
                <Link href="/generator">GENERATOR</Link>
                {session ?
                    <>
                        <Link href="/profile">PROFILE</Link>
                        <Button filled={false}
                                onClick={() => signOut({callbackUrl: "/api/auth/logout"})}>LOGOUT</Button>
                    </> :
                    <Button onClick={() => signIn('cognito')}>LOGIN</Button>
                }
            </Navigation>
        {onMobile.current && <MenuButton onClick={hideShowNav}>menu</MenuButton>}
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

const P = styled.p`
    position: relative;
    top: 10px;
    font-weight: bold;
    color: indianred;
`

const MenuButton = styled.div`
    padding: 0.4rem 1rem;
    font-weight: bold;
    color: white;
    background-color: ${props => props.theme.colors.primary};
    border-radius: .4rem;
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

    @media (max-width: 850px) {
        flex-direction: column;
        width: 100vw;
        padding: 2rem 0;
        position: fixed;
        top: ${( {hidden} ) => hidden ? '-100vh' : 0};
        left: 0;
        background-color: white;
        border-radius: 0 0 1rem 1rem;
        box-shadow: 0 0.5rem 9rem lightgray;
        
        transition: all 0.25s ease-in-out;
        
        a, button {
            font-size: 2rem;
        }
        
    }

`

export default Header;
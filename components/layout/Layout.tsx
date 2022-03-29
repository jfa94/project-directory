import {FC} from "react"
import styled from "styled-components"

import Header from "./Header"
import {useRouter} from "next/router"
// import Footer from "./Footer"

interface Props {
    children: JSX.Element | null
}
const Layout:FC<Props> = (props) => {
    const router = useRouter()

    return <Wrapper>
        {router.pathname === "/login" ?
            null :
            <Header/>
        }
        {props.children}
        {/*<Footer/>*/}
    </Wrapper>
}

const Wrapper = styled.div`
  height: 100vh;
`

export default Layout
import Header from './Header'
import styled from 'styled-components'

// import Footer from './Footer'

function Layout(props) {
    return <Wrapper>
        <Header/>
        {props.children}
        {/*<Footer/>*/}
    </Wrapper>
}

const Wrapper = styled.div`
  height: 100vh;
`

export default Layout;
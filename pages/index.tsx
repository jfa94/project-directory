import Link from 'next/link'
import styled from 'styled-components'

export default function Home() {
    return <Link href='/directory' passHref>
        <Wrapper>
            Directory
        </Wrapper>
    </Link>
}

const Wrapper = styled.div`
  display: inline-block;
  margin: 1rem;
  padding: 2rem;
  border: 2px solid black;
  cursor: pointer;
`
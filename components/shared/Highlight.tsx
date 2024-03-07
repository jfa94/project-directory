import styled from "styled-components"

const Highlight = styled.span`
    margin: 0 -0.2em;
    padding: 0.1em 0.2em;
    border-radius: 0.8em 0.3em;
    background: transparent;
    background-image: linear-gradient(to right,
    rgba(255, 225, 0, 0.1),
    rgba(255, 225, 0, 0.7) 4%,
    rgba(255, 225, 0, 0.3));
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
`

export default Highlight;
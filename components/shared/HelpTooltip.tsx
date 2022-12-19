import {FC, ReactNode} from "react"
import styled from "styled-components"
import Image from 'next/image'

interface Props {
    children: ReactNode,
    size?: number,
    text: string
}

const HelpTooltip: FC<Props> = ({children, size = 15, text}) => {
    return <div>
        {children}
        <Span dataText={text}>
            <HelpIcon src="/icons/help.svg"
                      alt="help"
                      height={size}
                      width={size}
            />
        </Span>
    </div>
}

const Span = styled.span<{ dataText: string }>`
  position: relative;
  //border-bottom: 1px dashed #000;

  &:before {
    content: attr(${props => props.dataText});
    position: absolute;

    /* vertically center */
    top: 50%;
    transform: translateY(-50%);

    /* move to right */
    left: 100%;
    margin-left: 15px;

    /* basic styles */
    width: 200px;
    padding: 10px;
    border-radius: 10px;
    background: #000;
    color: #fff;
    text-align: center;

    display: none; /* hide by default */
  }
  
  &:hover:before {
    display: block;
  }
`

const HelpIcon = styled(Image)`
  cursor: pointer;
`

export default HelpTooltip;
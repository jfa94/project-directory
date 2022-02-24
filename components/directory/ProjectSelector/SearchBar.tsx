import {Dispatch, FC, SetStateAction, useState} from "react"
import styled from "styled-components"

interface Props {
    setFilterTerms: Dispatch<SetStateAction<string[]>>,
}

const SearchBar: FC<Props> = ({setFilterTerms}) => {
    const [value, setValue] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (value === '') {
            setFilterTerms([])
        } else {
            setFilterTerms(value.split(' '))
        }
    }

    return <Form onSubmit={handleSubmit}>
        <Input type='search'
               name='project-search'
               id='project-search'
               ariaLabel='search for specific projects'
               placeholder='Search projects...'
               spellcheck={true}
               value={value}
               onChange={e => {
                   e.target.value === '' && setFilterTerms([])
                   setValue(e.target.value)
               }}
        />
    </Form>
}

const Form = styled.form`
  flex-grow: 1;
`

const Input = styled.input`
  width: 100%;
`

export default SearchBar;
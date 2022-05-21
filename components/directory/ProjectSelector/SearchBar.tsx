import {Dispatch, FC, FormEvent, SetStateAction, useState} from "react"
import styled from "styled-components"

interface Props {
    setFilterTerms: Dispatch<SetStateAction<string[]>>,
}

const SearchBar: FC<Props> = ({setFilterTerms}) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
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
               aria-label='search for specific projects'
               placeholder='Search projects...'
               spellCheck={true}
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
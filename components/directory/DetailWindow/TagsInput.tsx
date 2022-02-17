import {FC, useState} from "react"
import styled from "styled-components"
import Image from "next/image"

interface Props {
    tags: string[],
    syncTags: (newTags: string[]) => void
}

const TagsInput: FC<Props> = ({tags, syncTags}) => {
    const [inputVal, setInputVal] = useState('')

    const handleInput = (e) => {
        setInputVal(e.target.value)
    }

    const handleCreate = (e) => {
        if (e.key === 'Enter') {
            syncTags([...tags, e.target.value])
            setInputVal('')
        }
    }

    const handleDelete = (tag) => {
        syncTags([...tags].filter(val => val != tag))
    }

    return <TagsField>
        {tags.map((tag, index) => (
            <TagContainer key={index}>
                <TagText>{tag}</TagText>
                <DeleteIcon src="/icons/close-circle.svg"
                            alt="close"
                            height={17}
                            width={17}
                            onClick={() => handleDelete(tag)}
                />
            </TagContainer>
        ))}
        <Input id="tag"
               name="newTag"
               type="text"
               placeholder="Press enter to add a tag"
               value={inputVal}
               onChange={handleInput}
               onKeyPress={handleCreate}
        />
    </TagsField>
}

const TagsField = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  align-items: center;
  border: solid 1px black;
  padding: 0.3rem;
`

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 5px;
  background-color: darkgrey;
`

const TagText = styled.span`
  margin: 0 0.3rem;
  font-size: 0.9rem;
`

const DeleteIcon = styled(Image)`
    cursor: pointer;
`

const Input = styled.input`
    border: none;
  &:focus {
    outline: none;
  }
`

export default TagsInput;
import {Dispatch, SetStateAction} from "react"

export interface Props {
    _id: string,
    data: {
        title: string,
        description: string,
        startDate: string,
        endDate: string,
        tags: string[]
    },
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    updateProject?: (action: 'add' | 'update' | 'remove', data: {} | string) => void
}
import {Dispatch, SetStateAction} from "react"

export interface ProjectProps {
    title: string,
    category: 'Project' | 'Anecdote',
    message: string,
    context: string,
    actions: string,
    impact: string,
    learnings: string,
    startDate: string,
    endDate: string,
    tags: string[],
}

export interface DetailWindowProps {
    _id: string,
    data: ProjectProps,
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    updateProject?: (action: 'add' | 'update' | 'remove', data: {} | string) => void
}
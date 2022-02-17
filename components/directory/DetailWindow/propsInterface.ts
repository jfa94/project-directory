export interface Props {
    _id: string,
    data: {
        title: string,
        description: string,
        startDate: string,
        endDate: string,
        tags: string[]
    },
    updateProject?: (action: 'add' | 'update' | 'remove', data: {} | string) => void
}
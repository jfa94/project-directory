const projectList = {
    'project1': {
        title: 'Project example 1',
        description: 'This is the description for an example project',
        startDate: '2021-12-01',
        endDate: '2022-01-01',
        tags: ['leadership', 'invention'],
    },
    'project2': {
        title: 'Project example 2',
        description: 'This is the description for an example project',
        startDate: '2021-12-01',
        endDate: '2022-01-01',
        tags: ['leadership', 'invention'],
    },
    'project3': {
        title: 'Project example 3',
        description: 'This is the description for an example project',
        startDate: '2021-12-01',
        endDate: '2022-01-01',
        tags: ['leadership', 'invention'],
    },
    'project4': {
        title: 'Project example 4',
        description: 'This is the description for an example project',
        startDate: '2021-12-01',
        endDate: '2022-01-01',
        tags: ['leadership', 'invention'],
    },
    'project5': {
        title: 'Project example 5',
        description: 'This is the description for an example project',
        startDate: '2021-12-01',
        endDate: '2022-01-01',
        tags: ['leadership', 'invention'],
    },
    'project6': {
        title: 'Project example 6',
        description: 'This is the description for an example project',
        startDate: '2021-12-01',
        endDate: '2022-01-01',
        tags: ['leadership', 'invention'],
    }
}

export const getDummyProjects: () => Promise<object> = async () => {
    return await new Promise((resolve) => setTimeout(() => {
        resolve(projectList)
    }, 3000))
}
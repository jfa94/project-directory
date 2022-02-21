const projectList = {
    'project6': {
        title: 'Project example 6',
        description: 'This is the description for an example project',
        startDate: '2022-02-01',
        endDate: '2022-02-11',
        tags: ['leadership', 'invention'],
    },
    'project5': {
        title: 'Project example 5',
        description: 'This is the description for an example project',
        startDate: '2022-01-01',
        endDate: '2022-02-01',
        tags: ['leadership', 'invention'],
    },
    'project4': {
        title: 'Project example 4',
        description: 'This is the description for an example project',
        startDate: '2021-12-31',
        endDate: '2021-12-31',
        tags: ['leadership', 'invention'],
    },
    'project3': {
        title: 'Project example 3',
        description: 'This is the description for an example project',
        startDate: '2021-12-01',
        endDate: '2021-12-20',
        tags: ['leadership', 'invention'],
    },
    'project2': {
        title: 'Project example 2',
        description: 'This is the description for an example project',
        startDate: '2021-11-30',
        endDate: '2021-12-10',
        tags: ['leadership', 'invention'],
    },
    'project1': {
        title: 'Project example 1',
        description: 'This is the description for an example project',
        startDate: '2021-11-01',
        endDate: '2021-12-02',
        tags: ['leadership', 'invention'],
    }
}

export const getDummyProjects: () => Promise<object> = async () => {
    return await new Promise((resolve) => setTimeout(() => {
        resolve(projectList)
    }, 3000))
}
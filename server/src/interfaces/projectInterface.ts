interface IProject {
    id: string
    name: string,
    creatorID: string,
    description: string,
    ticketIDs: string[],
    contributorIDs: string[]
}

export default IProject;
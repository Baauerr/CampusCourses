export const statusColorHelper = (status: string) => {
    switch (status){
        case "Created":
            return "grey"
        case "Finished":
            return "red"
        case "Started":
            return "blue"
        case "OpenForAssigning":
            return "green"
    }       
}

export default statusColorHelper
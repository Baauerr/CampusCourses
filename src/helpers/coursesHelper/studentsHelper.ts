export const markTranslator = (status: string) => {
    switch (status){
        case "Failed":
            return "Провалена"
        case "Passed":
            return "Сдана"
        case "NotDefined":
            return "Нет оценки"
    }       
}

export const markColor = (status: string) => {
    switch (status){
        case "Failed":
            return "red"
        case "Passed":
            return "green"
        case "NotDefined":
            return "grey"
    }       
}

export const acceptanceTranslator = (status: string) => {
    switch (status){
        case "InQueue":
            return "в очереди"
        case "Declined":
            return "отклонен"
        case "Accepted":
            return "принят в группу"
    }       
}

export const acceptanceColor = (status: string) => {
    switch (status){
        case "Declined":
            return "red"
        case "Accepted":
            return "green"
        case "InQueue":
            return "blue"
    }       
}
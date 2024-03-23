export const statusTranslator = (status: string) => {
    switch (status){
        case "Created":
            return "Создан"
        case "Finished":
            return "Закрыт"
        case "Started":
            return "В процессе обучения"
        case "OpenForAssigning":
            return "Открыт для записи"
    }       
}

export default statusTranslator
export const seasonTranslator = (season: string) => {
    switch (season){
        case "Spring":
            return "Весна"
        case "Summer":
            return "Лето"
        case "Autumn":
            return "Осень"
        case "Winter":
            return "Зима"
    }       
}

export default seasonTranslator
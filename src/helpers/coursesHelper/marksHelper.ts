import { MarkType } from "../../types/coursesTypes/courseTypes"

export const markTypeTranslator = (markType?: MarkType): string => {
    switch (markType) {
        case MarkType.Midterm:
            return "Промежуточная аттестация"
        case MarkType.Final:
            return "Финальная аттестация"
        default:
            return ""
    }
}
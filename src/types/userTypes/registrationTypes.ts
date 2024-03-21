export interface IResponseRegistrationData {
    fullName: string,
    birthDate: string,
    email: string, 
    password: string,
    confirmPassword: string
} 

export interface IResponseLoginData {
    email: string, 
    password: string 
}

export interface IAuthRequestData{
    token: string
}
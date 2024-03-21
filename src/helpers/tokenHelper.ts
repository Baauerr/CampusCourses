export const setTokenToLocalStorage = (token: string): void => {
    localStorage.setItem("token", token);
}

export const getTokenFromLocalStorage = (): string => {
    const token = localStorage.getItem("token");
    return token ? token : "";
}

export const removeTokenFromLocalStorage = (): void => {
    const token = getTokenFromLocalStorage();
    localStorage.removeItem(token);
}
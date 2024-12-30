const _apiUrl = "/api/UserProfile"

export const getUsers = () => {
    return fetch(`${_apiUrl}`).then((r) => r.json())
}
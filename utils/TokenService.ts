export function getToken():string|null{
    const authToken = localStorage.getItem("authToken");
    if (authToken)
    {
        const authTokenJSON = JSON.parse(authToken);
        return authTokenJSON.token;
    }
    return null;
}

const TokenService = { getToken };

export default TokenService;

class API {
    // the keyword static allows the api methods to be used, without an instance of the class
    static signin(user) {
        return fetch("http://localhost:3000/api/v1/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }

    static signup(user) {
        return fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }

}

export default API
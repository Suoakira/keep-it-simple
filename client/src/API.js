
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

    static postSavingsTarget(saving_target) {
        return fetch("http://localhost:3000/api/v1/saving_targets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({saving_target})
        }).then(resp => resp.json())
    }
    // deconstructed objects
    static postUserSavingsTarget(user_saving_target) {
        return fetch("http://localhost:3000/api/v1/user_saving_targets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user_saving_target})
        }).then(resp => resp.json())
    }
}

export default API


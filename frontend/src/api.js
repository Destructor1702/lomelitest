const apiURL = "localhost:3000/";

class Api {
    constructor(baseUrl) {
        this.apiURL = baseUrl;
    }

    buildRequestUrl = (urlString, params) => {
        const url = new URL(`${this.apiURL}${urlString}`);
        Object.keys(params).forEach(key =>
            ((typeof params[key] !== 'undefined') && (params[key] !== null)) &&
            url.searchParams.append(key, params[key]));
        return url;
    };


    // --------------------------------------- functions  ---------------------------------------

    login = async (name, pass) => {
        const params = {  };
        const config = {
            method: 'POST',
            body: JSON.stringify({name, pass})
        };
        const request = await fetch(this.buildRequestUrl('/users', params).toString(), config);
        if (request.status > 399) {
            throw new Error(request.status.toString());
        }
        return request.json();
    };

    logout = async (token) => {
        const params = {    };
        const config = {
            method: 'POST',
            authorization: token
        };
        const request = await fetch(this.buildRequestUrl('/logout', params).toString(), config);
        if (request.status > 399) {
            throw new Error(request.status.toString());
        }
        return request.json();
    };

    getUsers = async (id, token) => {
        const params = {  id  };
        const config = {
            method: 'POST',
            authorization: token
        };
        const request = await fetch(this.buildRequestUrl('/users', params).toString(), config);
        if (request.status > 399) {
            throw new Error(request.status.toString());
        }
        return request.json();
    };

    updateUser = async (id, token, name=undefined, pass=undefined) => {
        const params = {  };
        const config = {
            method: 'POST',
            body: JSON.stringify({id, name, pass}),
            authorization: token
        };
        const request = await fetch(this.buildRequestUrl('/users', params).toString(), config);
        if (request.status > 399) {
            throw new Error(request.status.toString());
        }
        return request.json();
    };

    createUser = async (token, name=undefined, pass=undefined) => {
        const params = {  };
        const config = {
            method: 'POST',
            body: JSON.stringify({name, pass}),
            authorization: token
        };
        const request = await fetch(this.buildRequestUrl('/add', params).toString(), config);
        if (request.status > 399) {
            throw new Error(request.status.toString());
        }
        return request.json();
    };

    removeUser = async (id, token) => {
        const params = {  };
        const config = {
            method: 'POST',
            body: JSON.stringify({id}),
            authorization: token
        };
        const request = await fetch(this.buildRequestUrl('/delete', params).toString(), config);
        if (request.status > 399) {
            throw new Error(request.status.toString());
        }
        return request.json();
    };

}


export default new Api(apiURL);

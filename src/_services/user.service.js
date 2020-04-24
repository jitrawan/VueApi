import config from 'config';
import { authHeader } from '../_helpers';



export const userService = {
    login,
    logout,
    getAll
}




// function login(username, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//     };

//     return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // login successful if there's a user in the response
//             if (user) {
//                 // store user details and basic auth credentials in local storage 
//                 // to keep user logged in between page refreshes
//                 user.authdata = window.btoa(username + ':' + password);
//                 localStorage.setItem('user', JSON.stringify(user));
//             }

//             return user;
//         });
// }

function login(username, password) {
   const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`http://localhost:9095/employees/Login`, requestOptions)
    .then(handleResponseLogin)
    .then(user => {
        
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });

      
   
}

function logout(username, password) {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll(username, password) {
   console.log(username)
   console.log(password)
   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
//    return fetch(`http://localhost:9095/employees/Login`, requestOptions).then(handleResponse);
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponseLogin(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log("handleResponse")
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data.resultContent.user;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("handleResponse")
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function checklogin(){

}
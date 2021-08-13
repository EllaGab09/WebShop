export class UserService {
   currentUser='';
   token;
   apiUrl;
   endpoints;

   // Authorization: Bearer <token>

   constructor(apiUrl, endpoints) {
      this.apiUrl = apiUrl;
      this.endpoints = endpoints;
      console.log(apiUrl, endpoints);
      this.setToken = this.setToken.bind(this);
      this.userArrayFromJson = this.userArrayFromJson.bind(this);
   }

   createUser(email, password, onComplete) {
      const requestUrl = this.apiUrl + this.endpoints.createUser;
      let requestBody = `{ "email": "${email}", "password": "${password}" }`;
      let requestHeaders = new Headers();
      requestHeaders.append('Content-Type', 'application/json');
      let requestSettings = {
         method: 'POST',
         headers: requestHeaders,
         body: requestBody
      };
      let request = new Request(requestUrl, requestSettings);

      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            onComplete(response);
         });
   }

   login(email, password, onComplete) {
      const endpoint = this.endpoints.login;
      let request = this.getRequest(email, password, endpoint);
      let me = this;
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
         })
         .then(function (response) {
            me.currentUser=email;
            me.token = response;
            onComplete();
         });
   }

   getRequest(email, password, endpoint) {
      const requestUrl = this.apiUrl + endpoint;
      let requestBody = `{ "email": "${email}", "password": "${password}" }`;
      let requestHeaders = new Headers();
      requestHeaders.append('Content-Type', 'application/json');
      requestHeaders.append('Authorization', 'Bearer <token>');
      let requestSettings = {
         method: 'POST',
         headers: requestHeaders,
         body: requestBody
      };
      return new Request(requestUrl, requestSettings);
   }

   getUsers(onComplete, onError) {
      const requestUrl = this.apiUrl + this.endpoints.getUsers;
      const requestHeaders = this.makeTokenJsonHeaders();
      const requestSettings = {
         method: 'POST',
         headers: requestHeaders
      };
      const request = new Request(requestUrl, requestSettings);
      // const userArrayFromJson = this.userArrayFromJson;
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               if (onError != null) {
                  onError(response);
                  return null;
               } else {
                  throw new Error(`HTTP error! Status: ${response.status}`);
               }
            }
            return response.json();
         })
         .then(function (response) {
            onComplete(response);
         });
   }

   getRoles(onComplete, onError) {
      const requestUrl = this.apiUrl + this.endpoints.getRoles;
      const headers = this.makeTokenJsonHeaders();
      const requestSettings = {
         method: 'POST',
         headers: headers
      };
      const request = new Request(requestUrl, requestSettings);
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               if (onError != null) onError();
               return null;
            }
            return response.json();
         })
         .then(function (response) {
            onComplete(response);
         });
   }

   getRolesOfUser(userName, onComplete) {
      const requestUrl = this.apiUrl + this.endpoints.getUserRoles;
      const headers = this.makeTokenJsonHeaders();
      const requestBody = `{ "email": "${userName}"}`;
      const requestSettings = {
         method: 'POST',
         headers: headers,
         body: requestBody
      };
      const request = new Request(requestUrl, requestSettings);
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            response.splice(0, 1);
            console.log(userName, response[0]);
            onComplete(response);
         });
   }

   makeTokenJsonHeaders() {
      const headers = new Headers();
      const token = this.token;
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);
      return headers
   }

   setToken(token) {
      this.token = token;
   }

   userArrayFromJson(jsonUsers) {
      const userArray = [];
      for (let n in jsonUsers) {
         userArray.push(jsonUsers[n]);
      }
      return userArray;
   }

   deleteUser(userId, onComplete) {
      const requestUrl = this.apiUrl + this.endpoints.removeUser;
      const headers = this.makeTokenJsonHeaders();
      const requestBody = `{ "email": "${userId}"}`;
      const requestSettings = {
         method: 'POST',
         headers: headers,
         body: requestBody
      };
      const request = new Request(requestUrl, requestSettings);
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
         })
         .then(function (response) {
            onComplete();
         });
   }

}
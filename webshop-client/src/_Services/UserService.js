export class UserService {
   user = {
      email: '',
      password: ''
   };
   apiUrl;
   endpoints;

   // Authorization: Bearer <token>

   constructor(apiUrl, endpoints) {
      this.apiUrl = apiUrl;
      this.endpoints = endpoints;
      console.log(apiUrl, endpoints);
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

}
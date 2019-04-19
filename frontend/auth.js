const username = document.getElementById("uname");
const email = document.getElementById("email");
const password = document.getElementById("password")


const RegisterUser = () =>{
    const data = {
        username : username.value,
        email : email.value,
        password : password.value
    }
    postData(`http://localhost:5000/auth/register`, data)
    .then(data => {
        console.log(JSON.stringify(data))
        document.cookie =`user=${data.username};path=/`
        window.location.href = 'http://127.0.0.1:5500/frontend/selection.html';
    }) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
  
   
}

const LoginUser = () =>{
    const data = {
        username : username.value,
        password : password.value
    }
    postData(`http://localhost:5000/auth/login`, data)
    .then(data => {
        console.log(JSON.stringify(data))
        document.cookie =`user=${data.username};path=/`
        window.location.href = 'http://127.0.0.1:5500/frontend/selection.html';


    }) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
  
}

function postData(url = ``, data = {}) {
    // Default options are marked with *
    console.log(data)
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native Javascript objects 
  }
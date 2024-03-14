
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBVdusr62Q1kxhDkrzY3nTu-8Q0uWa3y0Q",
    authDomain: "it--safal.firebaseapp.com",
    projectId: "it--safal",
    storageBucket: "it--safal.appspot.com",
    messagingSenderId: "168175754162",
    appId: "1:168175754162:web:a5687fa734529f03f022ab"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

let loginemail = document.getElementById("loginemail");
let loginpassword = document.getElementById("loginpassword");

let signupemail = document.getElementById("signupemail");
let signuppassword = document.getElementById("signuppassword");

window.signup = function(e){
  e.preventDefault();
  var obj = {
    email: signupemail.value,
    password: signuppassword.value,


  };
  createUserWithEmailAndPassword(auth, obj.email, obj.password)
  .then(function(success){
    alert("You have Created successfuly account");
  }) 
  .catch(function(err){
    alert("Error:" + err.message)
  })

  
}


window.login = function(e){
  e.preventDefault();
  var obj = {
    email: loginemail.value,
    password: loginpassword.value,


  };
  signInWithEmailAndPassword(auth, obj.email, obj.password)
  .then(function(success){
    alert("You are logggggeedddd inininin ululu")
    window.location.replace("index.html")
  }) 
  .catch(function(err){
    alert("Login Error")
  });

  
}



  
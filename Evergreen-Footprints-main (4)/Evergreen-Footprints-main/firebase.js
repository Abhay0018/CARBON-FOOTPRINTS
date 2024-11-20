const firebaseConfig = {
    apiKey: "AIzaSyBNRnXguurpF-OZMSYWUXXu3GLji_k2HqE",
    authDomain: "carbon-5432f.firebaseapp.com",
    databaseURL: "https://carbon-5432f-default-rtdb.firebaseio.com",
    projectId: "carbon-5432f",
    storageBucket: "carbon-5432f.firebasestorage.app",
    messagingSenderId: "854775991367",
    appId: "1:854775991367:web:63ff82d125b5e5c4e27562",
    measurementId: "G-3W4R2T94MM"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage(); 

function register(){
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or password is invalid');
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential){
        var user = userCredential.user;
        var database_ref = database.ref();
        var user_data = {
            email: email,
            username: username,
            last_login: Date.now()
        }

        database_ref.child('users/' + user.uid).set(user_data)
        .then(function(){
            alert('User Created!!');
        })
        .catch(function(error){
            console.error("Error writing user data to database: ", error);
        });
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error creating user:", errorMessage);
        alert(errorMessage);
    })
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or password is not valid');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userUid = user.uid;

            localStorage.setItem('uid', userUid);

            const database_ref = database.ref();
            const user_data = {
                email: email,
                last_login: Date.now()
            };
            database_ref.child('users/' + userUid).update(user_data);
            alert('User Logged In!!');
        })
        .catch(function (error) {
            const error_message = error.message;
            alert(error_message);
        });
}

function logout() {
    auth.signOut().then(function() {
        alert('User logged out successfully');
    }).catch(function(error) {
        console.error("Error logging out:", error);
        alert('An error occurred while logging out. Please try again.');
    });
}


function validate_email(email){
    var expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return expression.test(email);
}

function validate_password(password){
    return password.length >= 6;
}

function analyzeFurther() {
    const energyConsumption = parseFloat(document.getElementById('energyConsumption').value);
    const dailyCalories = parseFloat(document.getElementById('dailyCalories').value);
    const fuelType = document.getElementById('fuelType').value;
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);

    const url = `analysis.html?energyConsumption=${energyConsumption}&dailyCalories=${dailyCalories}&fuelType=${fuelType}&fuelConsumption=${fuelConsumption}`;
    window.location.href = url;
}


module.exports.validateRegisterInput = (username, email, password, confirmPasswords) => {
    const errors = {};
    if(username.trim() === ""){
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === ""){
        errors.email = "Email must not be empty";
    }else{
        const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }

    if(password === ""){
        errors.password = 'Password must not empty';
    }else if(password !== confirmPasswords){
        errors.password = 'Password must be match'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports.validateLoginInput = (username, passwords) => {
    const errors = {};
    console.log("Check the response", username, passwords)
    if(username.trim() === ""){
        errors.username = 'Username must not be empty';
    }
    if(passwords.trim() === ""){
        errors.passwords = 'Passwords must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
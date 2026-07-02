window.validatePhone = function(phone){

    return /^\+998\d{9}$/.test(phone);

};

window.validatePassport = function(passport){

    return /^[A-Z]{2}[0-9]{7}$/.test(passport);

};

window.validateJSHSHIR = function(jshshir){

    return /^\d{14}$/.test(jshshir);

};

window.validateEmail = function(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

};
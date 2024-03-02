function isEmpty(value){
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password){
    return (
        email.includes('@') && password && password.trim().length >=6
    )
}

function userPostalAreValid(postal){
    const regx = /\D/g
    return (
        postal.match(regx)
    )
}

function userNameAreValid(username){
    return username.match(/[\u3400-\u9FBF]/);
}



function userDetailsAreValid(username, email, password){
    return(
        !isEmpty(email) &&
        !isEmpty(password)  &&
        !isEmpty(username) 
        // !isEmpty(city) &&
        // !isEmpty(street)&&
        // !isEmpty(postal)
    )
}

///////////////商品建立表格檢查////

function arrayIsNotValid(array){
    return array.includes('');
}

function pricesAreValid(price){
    return price.match(/\s\d|[\u3400-\u9FBF]/g);
    
}



function categoryIsValid(category){
    
    if(category = ''){
        return false
    }else{
        return true
    };
}


function productDataAreValid(name, price, description){
    return(
        !isEmpty(name) &&
        !isEmpty(price)  &&
        !isEmpty(description) 
    )

    
}


/////收件人/////

function receiverEamilAreValid(email){
    return (
        email.includes('@')
    )
}

function receiverPhoneAreValid(phone){
    const regx = /^09\d{8}$/
    return (
        phone.match(regx)
    )
}

function receiverDataAreValid(name, email, phone, address, postal){
    return(
        !isEmpty(name) &&
        !isEmpty(email)  &&
        !isEmpty(phone) &&
        !isEmpty(address)  &&
        !isEmpty(postal)  
    )

    
}


module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    userCredentialsAreValid: userCredentialsAreValid,
    userPostalAreValid: userPostalAreValid,
    userNameAreValid: userNameAreValid,
    arrayIsNotValid: arrayIsNotValid,
    productDataAreValid: productDataAreValid,
    pricesAreValid: pricesAreValid,
    categoryIsValid: categoryIsValid,
    receiverEamilAreValid: receiverEamilAreValid,
    receiverPhoneAreValid: receiverPhoneAreValid,
    receiverDataAreValid: receiverDataAreValid

}
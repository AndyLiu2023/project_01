const User = require('../models/user.model');
const sessionFlash = require('../util/session-flash');
const authctrl = require('../util/validation');
const authutil = require ('../util/auth.util');



function getSignup(req, res){
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData ={
            username: '',
            email: '',
            password: '',
            city: '',
            street: '',
            postal: ''
        };
    }

    

    res.render('./signup', {inputData: sessionData});
}

async function signup(req, res, next){

    const enteredData ={
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // city: req.body.city,
        // street: req.body.street,
        // postal: req.body.postal

    }


    if(authctrl.userNameAreValid(req.body.username)){

        sessionFlash.flashDataToSession(req, {
            errorMessage: '使用者名稱僅能用英數字元',
            ...enteredData},
            function (){
                res.redirect('./signup')
            }
        );
        return

    }else if (!authctrl.userCredentialsAreValid(
        req.body.email, req.body.password
            )){
        sessionFlash.flashDataToSession(req, {
            errorMessage: '需填入正確的電子郵件格式，密碼字數不得小於6。',
            ...enteredData},
            function (){
                res.redirect('./signup')
            }
        );
        return

    // }else if(authctrl.userPostalAreValid(req.body.postal)){

    //     sessionFlash.flashDataToSession(req, {
    //         errorMessage: '郵遞區號只能為數字，必為3碼',
    //         ...enteredData},
    //         function (){
    //             res.redirect('./signup')
    //         }
    //     );
    //     return

    }else if (!authctrl.userDetailsAreValid(
            req.body.username,
            req.body.email,
            req.body.password,
            // req.body.city,
            // req.body.street,
            // req.body.postal
        )
    
        ){
            sessionFlash.flashDataToSession(req, {
                errorMessage: '欄位未填寫完整，請確認欄位無留空',
                ...enteredData},
                function (){
                    res.redirect('./signup')
                }
            );
            return;
    
        }


    



    const user = new User(
        req.body.username,
        req.body.email,
        req.body.password,
        // req.body.city,
        // req.body.street,
        // req.body.postal

    )
        try {
            const existAlready = await user.existAlready();
            if(existAlready) {
                sessionFlash.flashDataToSession(req, {
                    errorMessage: '電子信箱重複，請使用其他電子信箱',
                    ...enteredData,
                }, function (){
                    res.redirect('./signup');
                }
            );
                
                return;
            }


            await user.signup();
           

        } catch (error) {
            next(error);
            return;
        }

        res.redirect('./login');

}

    function getlogin(req, res){
        let sessionData = sessionFlash.getSessionData(req);

        if(!sessionData){
            sessionData = {
                username: '',
                email: '',
                password: ''
            }
        };
        res.render('./login', { inputData: sessionData});

    }

    async function login(req, res, next){
        const user = new User(req.body.username, req.body.email, req.body.password);
        let existingUser;
        

        try{
            existingUser = await user.getUserWithSameEmail();
        }catch(error){
            next(error);
            return;
        }


        const sessionErrorData = {
            errorMessage: '請確認您的電子信箱、密碼有無錯誤',
            email: user.email,
            password: user.password
        };

        if(!existingUser){
            sessionFlash.flashDataToSession(req, sessionData, function(){
                res.redirect('./login');
            });
            return
        }
        const passwordIsCorrect = await user.matchingPassword(existingUser.password);


        if(!passwordIsCorrect){
            sessionFlash.flashDataToSession(req, sessionErrorData, function(){
                res.redirect('./login');
            });
            return;
        }



        authutil.createUserSession(req, existingUser, function(){
            res.redirect('/');
        });


    }


     function logout(req, res) {
            authutil.destoryUserAuthSession(req);
            req.session.destroy(()=>{res.redirect('/');});
            
            
      };



module.exports = {
    signup: signup,
    getSignup: getSignup,
    getlogin: getlogin,
    login: login,
    logout: logout
}
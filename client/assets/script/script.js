var app = new Vue({
    el:"#app",
    data: {
        loginBtn : true,
        registBtn : true,
        emailForm : true,
        passwordForm : true,
        logoutBtn : false,
        notifWarn : false,
        notifSucc : false,

        formEmail : "",
        formPassword : "",
        notifWarnVal : "",
        notifSuccVal : ""

    },
    methods : {
        login : function () {
            let self = this

            axios({
                method : "post",
                url : "http://localhost:3000/users/login",
                data : {
                    email : this.formEmail,
                    password : this.formPassword
                }
            })
            .then(response => {
                console.log(response);
                
                let token = response.data.token
                window.localStorage.setItem("token",token)

                self.emailForm = false
                self.passwordForm = false
                self.loginBtn = false
                self.registBtn = false

                self.logoutBtn = true

                self.formEmail = ""
                self.formPassword = ""
                self.notifSucc = true
                self.notifSuccVal = ` Welcome~`

            })
            .catch(error => {
                console.log(error.response.data.message);
                self.notifWarn = true
                self.notifWarnVal = `${error.response.data.message} !`
            })
        },
        logout : function() {
            let self = this

            window.localStorage.removeItem("token")

            self.emailForm = true
            self.passwordForm = true
            self.loginBtn = true
            self.registBtn = true

            self.logoutBtn = false
        }
    }
})
Template.register.events({
   'submit #register-form' : function(e, t) {
     e.preventDefault();
     var email = t.find('#account-email').value
       , password = t.find('#account-password').value
       , username = t.find('#account-username').value;
       //todo add validation
     Accounts.createUser({username: username,  password : password, email: email}, function(err){
         if (err) {
           window.alert("Account Creation Failed");
         } else {
           document.getElementById("login-form").reset();
         }
       });

     return false;
   }
 });

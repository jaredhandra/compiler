Template.register.events({
   'submit #register-form' : function(e, t) {
     e.preventDefault();
     var email = t.find('#account-email').value
       , password = t.find('#account-password').value.trim()
       , username = t.find('#account-username').value.trim();
       //todo add validation
     Accounts.createUser({username: username,  password : password, email: email}, function(err){
         if (err) {
           window.alert(err.reason);
         } else {
           document.getElementById("login-form").reset();
           $('#signUp').modal('hide');
         }
       });

     return false;
   }
 });

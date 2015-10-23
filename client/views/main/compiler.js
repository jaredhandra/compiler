if (Meteor.isClient) {

 Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login-username').value.trim()
        , password = t.find('#login-password').value.trim();
        //todo add validation
        Meteor.loginWithPassword(username, password, function(err){
        if (err){
          window.alert("Account Login Failed");
        }
        else{

        windlow.alert("Login Succesful " + username);
        }
      });
         return false; 
      }
  });
 Template.register.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value.trim()
        , username = t.find('#account-username').value.trim();
        //todo add validation

      Accounts.createUser({username: username,  password : password, email: email}, function(err){
          if (err) {
            window.alert("Account Creation Failed");
          } else {
            window.alert("Thanks For Registering " + username);
          }

        });

      return false;
    }
  });

 Template.userDashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
}

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }

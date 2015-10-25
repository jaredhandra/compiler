Template.register.events({
   'submit #register-form' : function(e, t) {
     e.preventDefault();
     var user;
     // Collect data and validate it.
     var email = t.find('#account-email').value
      , username = t.find('#account-username').value.trim()
      , password = t.find('#account-password').value.trim();
     // Format User data into JSON
     user = {
       username: username,
       password: password,
       email: email
     }
     // Validate new users
     if (user.username.length >=5) {
       if (user.password.length >=6){
         Accounts.createUser(user, function(err){
             if (err) {
               window.alert(err.reason);
             } else {
               document.getElementById("register-form").reset();
               $('#signUp').modal('hide');
             }
           });
       } else {
         document.getElementById('error').className += 'alert alert-danger';
         document.getElementById('error').innerHTML = 'Enter a valid password!';
       }
     } else {
       document.getElementById('error').className += 'alert alert-danger';
       document.getElementById('error').innerHTML = 'Enter a valid username!';
     }
     return false;
   }
 });

Template.register.events({
   "click #github": function(e,t){
    Meteor.loginWithGithub({
    requestPermissions: ['user', 'public_repo']
}, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
});
     $('#signUp').modal('hide');
   }
 });

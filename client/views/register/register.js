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
         $(".error").addClass('alert alert-danger').append('Enter a valid password!');
         $('#signUp').on('hidden.bs.modal', function () {
            document.getElementById("register-form").reset();
            $(".error").removeClass('alert alert-danger').empty();
          });
       }
     } else {
       $(".error").addClass('alert alert-danger').append('Enter a valid username!');
       $('#signUp').on('hidden.bs.modal', function () {
          document.getElementById("register-form").reset();
          $(".error").removeClass('alert alert-danger').empty();
        });
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

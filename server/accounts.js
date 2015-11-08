Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services': 1}});
});

Accounts.onCreateUser(function (options, user) {
        //Github oauth
    if(user.services.github != null){
    var accessToken = user.services.github.accessToken,
        result,
        profile;
        result = Meteor.http.get("https://api.github.com/user", {
        headers: {"User-Agent": "Meteor/1.0"},
        params: {
            access_token: accessToken
  }
});
    if (result.error)
        throw result.error;

    profile = _.pick(result.data,
        "login",
        "name",
        "avatar_url",
        "url",
        "company",
        "blog",
        "location",
        "email",
        "bio",
        "html_url");

    user.profile = profile;
    user.name = profile.name;
    user.username = profile.login;
    user.avatar = profile.avatar_url;
    user.email = user.services.github.email;

    return user;
}
    //End github oauth
    if (user.services) {
        if (options.profile) {
            user.profile = options.profile
        }
        var service = _.keys(user.services)[0];
        var email = user.services[service].email;
        if (!email) {
            if (user.emails) {
                email = user.emails.address;
            }
        }
        if (!email) {
            email = options.email;
        }
        if (!email) {
            // if email is not set, there is no way to link it with other accounts
            return user;
        }

        // see if any existing user has this email address, otherwise create new
        var existingUser = Meteor.users.findOne({'emails.address': email});
        if (!existingUser) {
            // check for email also in other services
            var existingGitHubUser = Meteor.users.findOne({'services.github.email': email});
            var existingGoogleUser = Meteor.users.findOne({'services.google.email': email});
            var doesntExist = !existingGitHubUser && !existingGoogleUser;
            if (doesntExist) {
                // return the user as it came, because doesn't exist in the DB yet
                if(user.services.google != null){
                    user.name = user.services.google.name;
                    user.username = user.services.google.name;
                    user.avatar = user.services.google.picture;
                    user.email = user.services.google.email;
            }
                return user;
            } else {
                existingUser = existingGitHubUser || existingGoogleUser
                if (existingUser) {
                    if (user.emails) {
                        // user is signing in by email, we need to set it to the existing user
                        existingUser.emails = user.emails;
                    }
                }
            }
        }

        // precaution, these will exist from accounts-password if used
        if (!existingUser.services) {
            existingUser.services = { resume: { loginTokens: [] }};
        }

        // copy accross new service info
        existingUser.services[service] = user.services[service];
        existingUser.services.resume.loginTokens.push(
            user.services.resume.loginTokens[0]
        );
        Meteor.users.remove({_id: existingUser._id}); // remove existing record
        return existingUser;                  // record is re-inserted
    }
});
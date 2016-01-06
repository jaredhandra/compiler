Template.questionUser.helpers({
  userAvatar: function() {
    var asker = Meteor.users.findOne({'_id':userId});
    if (asker.avatar != null) {
        return asker.avatar;
    }
    if (asker.profile.avatar_url != null) {
        return asker.profile.avatar_url;
    }
    if (asker.services.google.picture != null) {
        return asker.services.google.picture;
    }
  }
});

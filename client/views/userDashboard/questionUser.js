Template.questionUser.helpers({
  userAvatar: function(userId) {
    var asker = Meteor.users.findOne({userId});
    if (asker.avatar != null) {
      return asker.avatar;
    } else if (asker.profile.avatar_url != null) {
      return asker.profile.avatar_url;
    } else if (asker.services.google.picture != null) {
        return asker.services.google.picture;
    } else {
      return null;
    }
  }
});

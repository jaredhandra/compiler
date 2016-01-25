Template.questionUser.helpers({
  userAvatar: function(userId) {
    // var asker = Meteor.users.findOne({'_id':userId});
    var asker = Meteor.users.findOne();
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

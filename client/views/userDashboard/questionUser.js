Template.questionUser.helpers({
  userAvatar: function() {
    var question = Questions.findOne(this._id);
    var asker = Meteor.users.findOne(question.userId);
    if (asker.avatar != null) {
      return asker.avatar;
    } else if (asker.profile != null && asker.profile.avatar_url != null) {
      return asker.profile.avatar_url;
    } else if (asker.services != null && asker.services.google != null && asker.services.google.picture != null) {
        return asker.services.google.picture;
    } else {
      return null;
    }
  }
});

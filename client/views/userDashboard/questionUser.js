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
  },
  emailAccount: function(userId){
    if(this.emails != null){
      return this.emails[0].address;
  }
    if (this.email != null){
      return this.email;
    } else if(this.profile != null && this.profile.email != null){
      return this.profile.email;
    } else if(this.services != null && this.services.google != null && this.services.google.email != null){
      return this.services.google.email;
    }
  },
  both: function(){
    if (this.services.github != null){
      if (this.email != null){
        return true;
      } else if(this.profile.email != null){
        return true;
      } else if(this.services.google.family_name != null){
        return true;
      } else {
        return false;
      }
    }
  }
});

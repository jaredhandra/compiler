Template.questionUser.helpers({
  profile: function(){
    var question = Questions.findOne(this._id);
    var asker = Meteor.users.findOne(question.userId);
    return asker;
  },
  username: function(){
    return this.username;
  },
  userAvatar: function() {
    // var question = Questions.findOne(this._id);
    // var asker = Meteor.users.findOne(question.userId);
    if (this.avatar != null) {
      return this.avatar;
    } else if (this.profile != null && this.profile.avatar_url != null) {
      return this.profile.avatar_url;
    } else if (this.services != null && this.services.google != null && this.services.google.picture != null) {
        return this.services.google.picture;
    } else {
      return null;
    }
  },
  githubAccount: function(userId){
    if (this.services.github != null){
      return this.profile.html_url;
    }
  },
  emailAccount: function(userId){
    if (this.email != null){
      return this.email;
    } else if(this.profile.email != null){
      return this.profile.email;
    } else if(this.services.google.family_name != null){
      console.log(this.services.google.family_name);
      return this.services.google.family_name;
    }
  },
  both: function(){
    if (this.services.github != null){
      if (this.email != null){
        return true;
      } else if(this.profile.email != null){
        return true;
      } else if(this.services.google.family_name != null){
        console.log(this.services.google.family_name);
        return true;
      } else {
        return false;
      }
    }
  }
});

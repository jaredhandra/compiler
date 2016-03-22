Template.findAnExpert.helpers({
  expertUserAvatar: function(){
    var expertUser = Session.get("expert");
    if(expertUser != null && expertUser.avatar != null){
    return expertUser.avatar;
  }
  },
  expertUserReputation: function(){
    var expertUser = Session.get("expert");
    if(expertUser != null && expertUser.avatar != null){
      return expertUser.reputation;
    }
  },
  expertEmail: function(){
    var expertUser = Session.get("expert");
    if(expertUser != null && expertUser.email != null){
      return expertUser.email;
      }
    if(expertUser != null && expertUser.services != null && expertUser.services.google != null && expertUser.services.google.email != null){
      return expertUser.services.google.email;
    }
  },
  expertName: function(){
    var expertUser = Session.get("expert");
    if(expertUser != null && expertUser.username != null){
      return expertUser.username;
    }
  },
  expertAvailability: function(){
    var expertUser = Session.get("expert");
    if(expertUser != null && expertUser.availability != null){
      return expertUser.availability;
    }
  },
});

function findUserAvatar(user){
  if (user.avatar != null) {
      return user.avatar;
  }
  else if (user.profile != null && user.profile.avatar_url != null) {
      return user.profile.avatar_url;
  }
  else if (user.service != null && user.services.google != null && user.services.google.picture != null) {
      return user.services.google.picture;
  }
  else if(user.services.google.picture != null){
      return user.services.google.picture;
  }
  return "";
}

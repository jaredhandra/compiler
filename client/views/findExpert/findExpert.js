Template.findAnExpert.helpers({
  expertUserAvatar: function(){
    if(this.expertUser != null && this.expertUser.avatar != null){
      return this.expertUser.avatar;
    }
  }

})

Template.editProfile.helpers({
  user: function() {
   return Meteor.user().username || Meteor.user().profile.login || Meteor.user().profile.name
  },
  avatarURL: function(){
		if(Meteor.user().avatar != null){
			return Meteor.user().avatar;
		}
		if(Meteor.user().profile.avatar_url != null){
			return  Meteor.user().profile.avatar_url;
		}
		if(Meteor.user().services.google.picture !=null){
			return Meteor.user().services.google.picture;
		}
	},
});
Template.editProfile.events({
  'submit #edit-profile': function(event){
    // Get user object
    var userProfile = UserExtensions.findOne({'userId':user.userId});
    console.log(userProfile);
    // Get values from form
    var languages = $(".selectLanguages").val();
    var availability = $(".selectDays").val();
    // Add them to the UserExtensions collection
    UserExtensions.update({_id:userProfile._id}, {$set:{languages:languages, availability: availability}});
    // Reroute back to the dashboard
    Router.go('/dashboard');
    return false;
  }
})
Template.editProfile.rendered = function(){
  function formatTags(tag){
    if(!tag.id){ return tag.text; }
    var $tag = $('<div class="tagBlock">' + tag.text + '<br>' + '</div>');
    return $tag;
  }
  var options = { templateResult: formatTags, placeholder: "Select a category",
  allowClear: true, multiple: true}
  $(".select2").select2(options);
  return "";

  var options2 = {placeholder: "Select days",
  allowClear: true, multiple: true}
  $(".select2 .selectDays").select2(options2);
  return "";
};

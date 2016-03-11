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
    // Get values from form
    // Add them to the UserExtensions collection
    // Reroute back to the dashboard
    var languages: [];
    var availability: [];


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
};

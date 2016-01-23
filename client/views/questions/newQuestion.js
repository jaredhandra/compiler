//Template.newQuestion.helpers({
//  tags: function() {
//    return Tags.find().fetch().map(function(it){ return it.name; });
//  }
//});
//Template.newQuestion.rendered = function() {
//	Meteor.typeahead.inject($('.typeahead'));
//}
Template.newQuestion.events({
  'keypress #tag': function(e) {
  	addTagOnEnter(e);
},
  'submit .new-question': function(event) {
    var title = event.target.title.value;
    var questionText = event.target.questionText.value;
    var userId = Meteor.user()._id;
    var username = Meteor.user().username;
    var comments = [];
    var tags = tempPickedTags;
    var bestAnswer = "none";

    Questions.insert({
      userId : userId,
      title : title,
      questionText : questionText,
      createdAt : new Date(),
      username : username,
      bestAnswer : bestAnswer,
      comments : comments,
      tags : tags
    });

    event.target.title.value ="";
    event.target.questionText.value="";
    document.getElementById("new-question").reset();
    Router.go('/dashboard');
    return false;
  },
  'click #addTag': function(){
  	addTag();
},
'click #tagRemove': function(event){
  var tagName = convertObjectToString($(this));
    removeTag(tagName);
},
});
Template.newQuestion.helpers({
  tags: function() {
    return Tags.find().fetch().map(function(it){ return it.name; });
  }
});
Template.newQuestion.rendered = function() {
	Meteor.typeahead.inject($('.typeahead'));
}
//Temporary session variable to store userpicked tags..
 Session.set("tempPickedTags", []);

Template.userPickedTags.tempPickedTags = function() {
  return Session.get("tempPickedTags");
};

function addTagOnEnter(tagName){
	 if (tagName.keyCode == 13){
	 addTag();
	  return false;
	 }
}
function removeTag(tagToRemove){
 var index = tempPickedTags.indexOf(tagToRemove);
 if (index > -1) {
    tempPickedTags.splice(index, 1);
}
 Session.set("tempPickedTags", tempPickedTags);
}
function addTag(){
	tempPickedTags = Session.get("tempPickedTags");
  	//TODO: need to add error checking to make sure the tag is in the collection..
    var tagToAdd =  document.getElementById('tag').value;
    tempPickedTags.push(tagToAdd);
    Session.set("tempPickedTags", tempPickedTags);
    document.getElementById('tag').value = "";
}

function convertObjectToString(jqObject){
  //temporary method I had to create to return the name of the tag from a jquery object...
  var string="";
  var objectCount = jqObject.length;
  var count = 0;

  while(count < objectCount){
    string = string + jqObject[count];
    count++;
  }
  return string;
}

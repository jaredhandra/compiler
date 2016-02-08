Template.newQuestion.events({
  'keypress #tag': function(e) {
  	addTagOnEnter(e);
},
  'submit .new-question': function(event) {
    var title = event.target.title.value;
    // var questionText = event.target.questionText.value;
    var converter1 = new Markdown.Converter();
    var questionText = converter1.makeHtml(event.target.questionText.value);
    var userId = Meteor.user()._id;
    var username = Meteor.user().username;
    var comments = [];
    var tags = event.target.tagSelect.value;
    var bestAnswer = "none";

    Questions.insert({
      userId : userId,
      title : title,
      questionText : questionText,
      createdAt : new Date(),
      username : username,
      bestAnswer : bestAnswer,
      tags : tags
    });

    event.target.title.value ="";
    event.target.questionText.value="";
    document.getElementById("new-question").reset();
    Router.go('/dashboard');
    return false;
  }
});
// Template.newQuestion.helpers({
//   tags: function() {
//     return Tags.find().fetch().map(function(it){ return it.name; });
//   }
// });
// Template.newQuestion.rendered = function() {
// 	Meteor.typeahead.inject($('.typeahead'));
// }
//Temporary session variable to store userpicked tags..
 // Session.set("tempPickedTags", []);

// Template.userPickedTags.helpers = function() {
//   return Session.get("tempPickedTags");
// };

Template.newQuestion.rendered = function() {
  var converter = new Markdown.Converter();
  var editor = new Markdown.Editor(converter);
  editor.run();
  function formatTags(tag){
    if(!tag.id){ return tag.text; }
    var $tag = $('<div class="tagBlock">' + tag.text + '<br>' + '</div>');
    return $tag;
  }
  var options = { templateResult: formatTags, placeholder: "Select a category",
  allowClear: true}
  $(".select2").select2(options);
  return string;
}

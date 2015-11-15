Template.post.events({
  'submit .new-comment': function(event) {
    var comment = event.target.commentText.value;
    var user = Meteor.user();
    var username = Meteor.user().username;
    var questionId = findQuestionIdFromUrl(window.location.pathname);
    var newComment = [
    {"commentText":comment},
    {"user":user},
    {"username":username}
    ];

    Questions.update(
      { _id: questionId},
      { $push: { comments: newComment }}
      )

    document.getElementById("new-comment").reset();
    return false;
  }
});

//Couldn't get the question id from the dom
//For now pulling it from the url..
function findQuestionIdFromUrl(pathname){
  return pathname.substring(10, pathname.length);
}
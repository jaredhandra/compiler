Template.post.events({
    'submit .new-comment': function (event) {
        var commentId = Random.id();
        var commentText = event.target.commentText.value;
        var user = Meteor.user();
        var username = Meteor.user().username;
        var questionId = findQuestionIdFromUrl(window.location.pathname);

        Comments.insert({
          commentId : commentId,
          questionId : questionId,
          user : user,
          createdAt : new Date(),
          username : username,
          commentText : commentText,
        });
        document.getElementById("new-comment").reset();
        return false;
    },
      'click #chooseBestAnswer': function(e) {
        Questions.update(
            {_id: this.questionId},
            {$set: {bestAnswer: this.commentId}}
        )
    },
});
Template.post.helpers({
    questionDate: function () {
        var date = new Date(Questions.findOne(this).createdAt);
        return moment(date).fromNow();
    },
    askerAvatarURL: function () {
        var askerUserId = Questions.findOne(this).userId;
        var asker = Meteor.users.findOne({'_id':askerUserId});
        if (asker.avatar != null) {
            return asker.avatar;
        }
        if (asker.profile.avatar_url != null) {
            return asker.profile.avatar_url;
        }
        if (asker.services.google.picture != null) {
            return asker.services.google.picture;
        }
    },
    commenterAvatarURL: function(){
        var commenter = this.user;
        if (commenter.avatar != null) {
            return commenter.avatar;
        }
        if (commenter.profile.avatar_url != null) {
            return commenter.profile.avatar_url;
        }
        if (commenter.services.google.picture != null) {
            return commenter.services.google.picture;
        }
    },
    commentDate: function(){
        var date = new Date(this.createdAt);
        return moment(date).fromNow();
    },
    isCurrentUserAsker: function(){
      var posterId = Questions.findOne(this.questionId).userId;
      var currentUserId = Meteor.user()._id;
      if(currentUserId === posterId){
        return true;
      }
      return false;
    },
    isBestAnswer: function(){
      var question = Questions.findOne(this.questionId);
      if(question.bestAnswer === this.commentId){
        return true;
      }
      return false;
    },
    questionComments: function(){
      return Comments.find({ questionId: this._id }).fetch();
    }
});
//Couldn't get the question id from the dom
//For now pulling it from the url..
function findQuestionIdFromUrl(pathname) {
    return pathname.substring(10, pathname.length);
}

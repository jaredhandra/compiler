Template.post.events({
    'submit .new-comment': function (event) {
        var commentId = Random.id();
        var comment = event.target.commentText.value;
        var user = Meteor.user();
        var username = Meteor.user().username;
        var questionId = findQuestionIdFromUrl(window.location.pathname);
        var newComment = {
            "commentId": commentId,
            "user": user,
            "username": username,
            "commentText": comment,
            "createdAt": new Date()
        };
        Questions.update(
            {_id: questionId},
            {$push: {comments: newComment}}
        )
        document.getElementById("new-comment").reset();
        return false;
    }
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
    }
});
//Couldn't get the question id from the dom
//For now pulling it from the url..
function findQuestionIdFromUrl(pathname) {
    return pathname.substring(10, pathname.length);
}

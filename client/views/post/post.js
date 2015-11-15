Template.post.events({
    'submit .new-comment': function (event) {
        var comment = event.target.commentText.value;
        var user = Meteor.user();
        var username = Meteor.user().username;
        var questionId = findQuestionIdFromUrl(window.location.pathname);
        var newComment = {
            "user": user,
            "username": username,
            "commentText": comment
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
        var date = new Date(Questions.findOne(this.createdAt).createdAt);
        return moment(date).fromNow();
    },
    askerAvatarURL: function () {
        var askerUserId = Questions.findOne(this.createdAt).userId;
        var asker = Meteor.users.findOne({'_id':askerUserId});
        console.log(asker);
        if (asker.avatar != null) {
            return asker.avatar;
        }
        if (asker.profile.avatar_url != null) {
            return asker.profile.avatar_url;
        }
        if (asker.services.google.picture != null) {
            return asker.services.google.picture;
        }
    }
});
//Couldn't get the question id from the dom
//For now pulling it from the url..
function findQuestionIdFromUrl(pathname) {
    return pathname.substring(10, pathname.length);
}
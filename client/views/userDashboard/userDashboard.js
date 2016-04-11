Template.userDashboard.events({
   'click .logout': function(event){
       event.preventDefault();
       Meteor.logout();
   },
   'click #total-questions': function(event){
      $('.active-box').not(this).removeClass('active-box');
      $('#total-questions').addClass('active-box');
      ReactiveTable.clearFilters(["user-open-questions"]);
   },
   'click #user-questions': function(event, template){
     $('.active-box').not(this).removeClass('active-box');
     $('#user-questions').addClass('active-box');
     var currentUser = Meteor.user().username;
     template.filter.set(currentUser);
   },
   'click #hot': function(event){
     $('.active-box').not(this).removeClass('active-box');
     $('#hot').addClass('active-box');
     template.filter.set({"$gt": 5});
   },
   'click #new': function(event){
     $('.active-box').not(this).removeClass('active-box');
     $('#new').addClass('active-box');
     ReactiveTable.clearFilters(["user-open-questions", "top"]);
     template.newFilter.set();
   }
});
Template.userDashboard.helpers({
  	user: function() {
     return Meteor.user().username || Meteor.user().profile.login || Meteor.user().profile.name
  	},
	questions: function() {
			return Questions.find();
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
	tags: function() {
		return Tags.find();
	},
	questionTitle: function(_id) {
		return Questions.findOne({'_id': _id}, {'title':1});
	},
	totalQuestions: function() {
		return Questions.find().count();
	},
	userQuestions: function() {
		return Questions.find({'username':Meteor.user().username}).count();
	}
});
Template.openQuestions.helpers({
	questions: function() {
		return Questions.find();
	},
	settings: function() {
		return {
			rowsPerPage: 10,
			showNavigation: 'never',
			class: 'table table-hover question-table',
			fields: [
				{key: '_id', label: 'Question', headerClass:'question-header', cellClass:'question-cell question-title',tmpl: Template.questionTitle},
				{key: 'tags', label: 'Tag', headerClass:'question-header', cellClass:'question-cell question-user', tmpl: Template.questionTag},
				{key: 'userId', label: 'User', headerClass:'question-header', cellClass:'question-cell question-user', tmpl: Template.questionUser},
        {key: 'reputation', label: 'Reputation', headerClass:'question-header', cellClass:'question-cell question-user', sortDirection: 'descending', sortOrder: 1},
				// {key: 'comments', label: 'Replies', headerClass:'question-header', cellClass:'question-cell question-user', fn: function(value){return value.length;}},
				{key: 'createdAt', label: 'Date', headerClass:'question-header', cellClass:'question-cell question-date', fn: function(value){date = new moment(value); return date.fromNow();}}
			],
      filters: ['user-open-questions', 'new', 'top']
		}
	}
});
Template.openQuestions.events({
'click #newQuestionBtn': function(){
  	 Session.set("tempPickedTags", []);
  	}
});
Template.tagCard.helpers({
	tags: function() {
		return Tags.find();
	}
});
Template.userDashboard.rendered = function(){
  $(".userProfile").popover({
    html: true,
    content: function(){
      return $("#popover-content").html();
    }
  });
}
Template.userDashboard.created = function(){
  this.filter = new ReactiveTable.Filter('user-open-questions', ['username']);
  this.newFilter = new ReactiveTable.Filter('new', ['createdAt']);
  this.hotFilter = new ReactiveTable.Filter('top', ['reputation']);
}

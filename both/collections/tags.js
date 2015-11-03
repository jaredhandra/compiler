Tags = new Mongo.Collection('tags');
Tags.attachSchema(new SimpleSchema({
	name:{
		type: String,
		label: "Name",
		max: 200
	},
	description:{
		type: String,
		label: "Description",
		max: 200
	}
	// tagColor: {
	// 	type: String,
	// 	label: "tagColor",
	// 	max: 200
	// }
}));
if (Meteor.isServer) {
	if (Tags.find({}).count() === 0){
		Tags.insert({
			'name':'HTML',
			'description':'Descriping HTML'
		});
		Tags.insert({
			'name':'CSS',
			'description':'Descriping CSS'
		});
		Tags.insert({
			'name':'C#',
			'description':'Descriping C#'
		});
		Tags.insert({
			'name':'Java',
			'description':'Descriping Java'
		});
		Tags.insert({
			'name':'Python',
			'description':'Descriping Python'
		});
		Tags.insert({
			'name':'Javascript',
			'description':'Descriping Javascript'
		});
		Tags.insert({
			'name':'JQuery',
			'description':'Descriping JQuery'
		});
	}
	Meteor.publish('tags', function(){
		return Tags.find();
	});
}
if (Meteor.isClient){
	Meteor.subscribe("tags");
}
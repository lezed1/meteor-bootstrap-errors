Template.meteorErrors.helpers({
  allErrors: function() {
    return Errors.collection.find();
  },
});

Template.meteorLastError.helpers({
    lastError: function () {
        return Errors.collection.find({}, {sort: {createdAt: -1}, limit: 1})
    }
});

Template.meteorError.rendered = function() {
  var error = this.data;
  var elem = $(this.firstNode);
  elem.hide().fadeIn();

  Meteor.defer(function() {
    Errors.collection.update(error._id, {$set: {seen: true}});
  });
};
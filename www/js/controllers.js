angular.module('taskApp.controllers', [])

.controller('TasksController', function ($scope, $state, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/task.form.template.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.formTaskModal = modal;
  });

  $scope.onezoneDatepicker = {
    date: new Date(), // MANDATORY                     
    mondayFirst: false,                
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: true,
    hideCancelButton: false,
    hideSetButton: false
  };

  $scope.tasks = [
    { name: 'name 1', date: new Date(), description: 'Foo ',  finished: true },
    { name: 'name 2', description: 'Foo ', finished: false },
    { name: 'name 1', date: new Date(), description: 'Foo ',  finished: true },
    { name: 'name 2', description: 'Foo ', finished: false },
    { name: 'name 1', date: new Date(), description: 'Foo ',  finished: true },
    { name: 'name 3', date: new Date(), description: 'Foo ', finished: true },
    { name: 'name 4', date: new Date(), description: 'Foo ',  finished: false }
  ];


  $scope.createTask = function(task) {
    $scope.tasks.push(task);
    clearForm(task);
    $scope.formTaskModal.hide();
  };

  $scope.deleteTask = function (task) {
    $scope.tasks.pop(task);
  };
  
  var clearForm = function (task) {
  }

});
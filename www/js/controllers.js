angular.module('taskApp.controllers', [])

.controller('TasksController', function ($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('new-task.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.formTaskModal = modal;
  });

  $scope.onezoneDatepicker = {
    date: new Date(), // MANDATORY                     
    mondayFirst: false,                
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false
  };

  $scope.tasks = [
    { name: 'name 1', date: new Date(), finished: true },
    { name: 'name 2', date: new Date(), finished: false },
    { name: 'name 3', date: new Date(), finished: true },
    { name: 'name 4', date: new Date(), finished: false }
  ];

  $scope.newTask = function () {
    // var name = prompt('');

    // $scope.tasks.push({
    //   name: name,
    //   date: new Date(),
    //   finished: false
    // })
    $scope.formTaskModal.show();
  }

  $scope.createTask = function(task) {
    console.log(task);
    $scope.tasks.push(task);
    $scope.formTaskModal.hide();
  };

  $scope.deleteTask = function (task) {
    $scope.tasks.pop(task);
  };


});
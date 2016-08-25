angular.module('taskApp.controllers', [])

.controller('TasksController', function($scope,  $state , $ionicModal) {
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

$scope.deleteTask = function (task) {
    $scope.tasks.pop(task);
  };
  
  var clearForm = function (task) {
  }


$scope.createTask = function(task){
      var phraseToAdd = '';
      if ($scope.task.name !== ""){
      phraseToAdd = $scope.task.name;
      } else {
        phraseToAdd = $scope.task.name;
      }
      var query = "INSERT INTO sqltable (name) VALUES (?)";
      $cordovaSQLite.execute(sqlDB, query, [phraseToAdd]).then(function(res) {
        $scope.storedData.push({"id":res.insertId, "name":phraseToAdd});
      }, function (err) {
        console.error(err);
      });
      $scope.task.name = '';

    clearForm(task);
    $scope.formTaskModal.hide();
    }


});
angular.module('TaskApp', ['ionic', 'taskApp.controllers', 'taskApp.services', 'onezone-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tasks', {
      url: '/',
      templateUrl: "templates/tasks.template.html",
      controller: 'TasksController'
    })


    .state('calendar', {
      url: '/calendar',
      templateUrl: "templates/calendar.template.html",
      controller: 'TasksController'
    })

    .state('taskDetail', {
      url: "/task/:id",
      templateUrl: "templates/task.detail.template.html",
      controller: 'TasksController'
    });

  $urlRouterProvider.otherwise('/');
});

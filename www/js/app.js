var example = angular.module('TaskApp', ['ionic','ngCordova', 'taskApp.controllers', 'taskApp.services', 'onezone-datepicker'])

.run(function($rootScope, $ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        var db = $rootScope.db = $cordovaSQLite.openDB({ name: "my.db", location: "default" });

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS tarefas (id integer primary key, nome text, descricao text)");
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

angular.module('taskApp.controllers', [])

.controller('TasksController', function ($scope, $state, $ionicModal, $cordovaSQLite) {
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
  

//Exibindo uma mensagem ao clicar em cima.
    $scope.selecionaItem = function(index){

         var query = "SELECT id, nome, descricao FROM tarefas WHERE nome = ?";
        $cordovaSQLite.execute($scope.db, query, [index]).then(function(res) {
            if(res.rows.length > 0) {
                var message ="ID: "+res.rows.item(0).id + "\nTítulo: "+res.rows.item(0).nome + "\nDescrição: " + res.rows.item(0).descricao;
                alert(message);
                console.log(message);
                 task.titulo=res.rows.item(0).nome;
            } else {
                alert("No results found");
                console.log("No results found");
            }
        }, function (err) {
            alert(err);
            console.error(err);
        });
    
    }


//Função que carrega todos os registros.
 $scope.selectAll = function(){
        $scope.tasks = [];

        var query = "select nome, descricao from tarefas";
        $cordovaSQLite.execute($scope.db, query, []).then(function(result) {
            if(result.rows.length > 0){
                for(var i = 0; i < result.rows.length; i++) {
                    $scope.tasks.push({name: result.rows.item(i).nome, description: result.rows.item(i).descricao});
                }
            } else {
                alert("Você não tem nenhuma tarefa :)");
                $scope.tasks = [];
            }
        }, function(error){
            console.log(error);
        });
    };

//Função que deleta todos os registros de uma só vez.
 $scope.deleteAll = function() {
        $scope.tasks = [];
        var query = "delete from tarefas";
        $cordovaSQLite.execute($scope.db, query, []).then(function(result) {
           alert("Agora você não tem mais tarefas :)");
        }, function(error){
             alert("Erro ao deletar as tarefas!");
        });
    };


//Função que insere as tarefas.

$scope.createTask = function(task) {
          var nome=task.name;
          var descricao=task.description;
        
         // Faltando salvar a data e o finished!

        var query = "INSERT INTO tarefas (nome, descricao) VALUES (?,?)";
        $cordovaSQLite.execute($scope.db, query, [nome, descricao]).then(function(res) {
           
           //exibindo na lista
           $scope.tasks.push({"id":res.insertId, "name":nome, "description":descricao});

            console.log(message);
            alert(message);
        
        }, function (err) {
            console.error(err);
            alert(err);
        });
            clearForm(task);
            $scope.formTaskModal.hide();
    };


  $scope.deleteTask = function (task) {
    $scope.tasks.pop(task);
  };
  
  var clearForm = function (task) {
    task.name="";
    task.description="";
  }

});

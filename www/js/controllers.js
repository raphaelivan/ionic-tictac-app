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
              //  var message ="ID: "+res.rows.item(0).id + "\nTítulo: "+res.rows.item(0).nome + "\nDescrição: " + res.rows.item(0).descricao;
              //  alert(message);

              // carregando o sessionStorage.
                window.sessionStorage.setItem("titulo",JSON.stringify(res.rows.item(0).nome));
                window.sessionStorage.setItem("descricao",JSON.stringify(res.rows.item(0).descricao));
                ExibirId();

            } else {
                alert("No results found");
              //  console.log("No results found");
            }
        }, function (err) {
            alert(err);
          //  console.error(err);
        });
    }

    // Deletando uma tarefa.
    $scope.deleteTask = function() {
      var titulo=JSON.parse(window.sessionStorage.getItem("titulo"));
      var query = "delete from tarefas where nome = ?";
      $cordovaSQLite.execute($scope.db, query, [titulo]).then(function(result) {
        alert("Delete Ok.");
        window.location.href = "#/";
      }, function(error){
        alert("Delete FAIL!");
      });
      };

      /*  Fazer update nos dados.

      $scope.update = function(titulo) {
        $scope.peopleList = [];
        var query = "update pessoas set nome = ? where nome = ?";
        $cordovaSQLite.execute($scope.db, query, [titulo]).then(function(result) {
            $scope.resultado = "Update OK.";
        }, function(error){
            $scope.resultado = "Update FAIL!";
        });
      }
      */

// Chamando o sessionStorage;

  ExibirId = function () {
     var titulo=JSON.parse(window.sessionStorage.getItem("titulo"));
     var desc=JSON.parse(window.sessionStorage.getItem("descricao"));
      //window.sessionStorage.removeItem('id');
      //window.sessionStorage.removeItem('descricao');
      $scope.tituloTarefa = titulo;
      $scope.descricaoTarefa = desc;
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
          //  console.log(error);
        });
    };

//Função que deleta todos os registros de uma só vez.
 $scope.deleteAll = function() {
        if (confirm("Deseja deletar tudo?") == true) {
          $scope.tasks = [];
          var query = "delete from tarefas";
          $cordovaSQLite.execute($scope.db, query, []).then(function(result) {
             alert("Agora você não tem mais tarefas :)");
          }, function(error){
               alert("Erro ao deletar as tarefas!");
          });
        } else {
           //alert("Nada deletado :)");
        }
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

        }, function (err) {
          //  console.error(err);
            alert(err);
        });
            clearForm(task);
            $scope.formTaskModal.hide();

    };

  var clearForm = function (task) {
    task.name="";
    task.description="";
  }

});

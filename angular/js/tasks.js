/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
    .constant('tasksKey', 'tasks')
    .controller('TasksController', function($scope, tasksKey) {
        //initialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];
        //initialize newtask to an empty objec
        $scope.newTask = {};

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }


        //add a function to add newtask to the array
        $scope.addTask = function() {
            //push the current value of newtask into the tasks array
            $scope.tasks.push($scope.newTask);
            saveTasks();
            //reset new task to empty
            $scope.newTask = {};
        };

        //function to toggle task done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });

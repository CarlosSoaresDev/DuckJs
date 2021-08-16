
const constructor = ($scope) => {
    'use strict';
    $scope.task = '';
    $scope.toDoTasks = [];

    $scope.onAddTask = () => {
        $scope.toDoTasks.push($scope.task);
        $scope.task = '';
    };    

}

Provider.component(
     'index',
     constructor
     );

DUCKRender.bootstrap();
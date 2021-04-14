/* global Provider, DOMCompiler */
const constructor = ($scope) => {
    'use strict';
    $scope.todos = [];
    $scope.array = [];

    $scope.add = function() {
        $scope.todos.push($scope.todo);
        $scope.todo = '';

    };
}

Provider.controller('component', constructor);


DOMCompiler.bootstrap();
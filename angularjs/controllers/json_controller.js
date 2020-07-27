app.controller("json_controller", function($scope, $http) {

    $scope.score = 0;
    $scope.player_1_container = document.getElementsByClassName("info-container")[0];
    $scope.player_2_container = document.getElementsByClassName("info-container")[1];
    $scope.fppg_values = document.getElementsByClassName("fppg_value");
    $scope.button = document.getElementById("btn");

    $scope.re_init = function() {
        $scope.init();
    }

    angular.element(document).ready(function () {
        $scope.init();
    });

    $scope.init = function() {

        $scope.player_1_container.style.border = "none";
        $scope.player_2_container.style.border = "none";
        $scope.has_user_selected = false;
        $scope.hide_fppg();

        $http.get("https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json")
        .then(function (object) {
            
            $scope.obj = object.data;
            $scope.player_1_random = Math.floor(Math.random() * $scope.obj.players.length - 1)+ 1;
            $scope.player_2_random = Math.floor(Math.random() * $scope.obj.players.length - 1)+ 1;

            if ($scope.player_1_random !== $scope.player_2_random) {
                $scope.player_1_name = $scope.obj.players[$scope.player_1_random]["first_name"];
                $scope.player_1_src = $scope.obj.players[$scope.player_1_random]["images"]["default"]["url"];
                $scope.player_1_fppg = $scope.obj.players[$scope.player_1_random]["fppg"];
                $scope.player_2_name = $scope.obj.players[$scope.player_2_random]["first_name"];
                $scope.player_2_src = $scope.obj.players[$scope.player_2_random]["images"]["default"]["url"];
                $scope.player_2_fppg = $scope.obj.players[$scope.player_2_random]["fppg"];
            }

            else {
                $scope.init();
            }
        })
    };

    $scope.reveal_fppg = function() {
        for (let i = 0; i < $scope.fppg_values.length; i++) {
            $scope.fppg_values[i].style.opacity = 1;
        }
    }

    $scope.hide_fppg = function() {
        for (let i = 0; i < $scope.fppg_values.length; i++) {
            $scope.fppg_values[i].style.opacity = 0;
        }
    }

    $scope.chosen_player_1 = function() {
        
        $scope.reveal_fppg();

        // chose correctly
        if ($scope.player_1_fppg > $scope.player_2_fppg && $scope.has_user_selected === false) {

            $scope.player_1_container.style.border = "2px blue solid";
            $scope.player_2_container.style.border = "none";
            $scope.score++;
            $scope.has_user_selected = true;
        }

        // chose incorrectly
        else if ($scope.player_1_fppg < $scope.player_2_fppg && $scope.has_user_selected === false) {
            $scope.player_1_container.style.border = "2px blue solid";
            $scope.player_2_container.style.border = "none";
            $scope.has_user_selected = true;
        }

        $scope.end_game();
    }

    $scope.chosen_player_2 = function() {
        
        $scope.reveal_fppg();

        // chose correctly
        if ($scope.player_2_fppg > $scope.player_1_fppg && $scope.has_user_selected === false) {

            $scope.player_2_container.style.border = "2px blue solid";
            $scope.player_1_container.style.border = "none";
            $scope.score++;
            $scope.has_user_selected = true;
        }

        // chose incorrectly
        else if ($scope.player_2_fppg < $scope.player_1_fppg && $scope.has_user_selected === false) {
            $scope.player_2_container.style.border = "2px blue solid";
            $scope.player_1_container.style.border = "none";
            $scope.has_user_selected = true;
        }

        $scope.end_game();
    }

    $scope.end_game = function() {
        if ($scope.score === 10) {
            $scope.button.style.display = "none";
            $scope.new_element = angular.element('<h1>Well Done!</h1>');
            angular.element(document.getElementById('player-container')).append($scope.new_element);
        }
    };
});
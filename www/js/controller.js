angular.module('cutoffapp-quiz')
  .controller('MainCtrl', function ($scope, $resource, $ionicLoading) {

    $ionicLoading.show({
      template: 'Fetching questions..'
    });
    var q = $resource('http://cors.io/?u=http://188.166.251.249/api/v1/quiz/?format=json').get();

    $scope.quiz = {
      score: 0,
      over: false
    };
    q.$promise.then(function (data) {
      $scope.questions = data.objects;
      $scope.questions[0].visible = true;
      $ionicLoading.hide();
      //$scope.$apply();
    });

    $scope.submit = function (q) {

      q.attempted = true;
      if(q.ans == q.answer){
        $scope.quiz.score++;
      }
      q.disable = true;

    };

    $scope.submitEnable = function (q) {
      q.disable = false;
    }

    $scope.next = function (q,index) {
      q.visible = false;
      if(index==$scope.questions.length-1){
        $scope.quiz.over = true;
      }
      else{
        index++;
        $scope.questions[index].visible = true;
      }
    };

    $scope.setClass = function (q,id) {
      if(q.attempted && (id == q.answer || id == q.ans)){
        if(id == q.ans)
          return 'button-balanced icon-right ion-android-done';
        if(id != q.ans)
          return 'button-assertive icon-right ion-android-close';
      }
    }


  });

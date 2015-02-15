angular
  .module('TheNetwork')
  .controller('HomeController', function ($scope, $currentUser, $PostResource, $UserResource, $document) {
    $scope.user = $currentUser.get();
    $scope.posts = $PostResource.query();

    $scope.getPosterImage = function (id) {
      return $UserResource.get(id).pic;
    };

    $scope.getPosterUsername = function (id) {
      return $UserResource.get(id).username;
    };

    $scope.postUpdate = function () {      
      angular.element($document[0].getElementsByClassName('lightbox-container')[0]).addClass('lightbox-show');
    };
  })
  .controller('CommentsController', function ($scope, $PostResource, $currentUser) {
    $scope.comment = undefined;
    $scope.addComment = function (postId) {
      if (!$scope.comment) {
        // maybe I don't want to do anything :)
        return null;
      }

      $PostResource.addComment({
        postId: postId,
        userId: $currentUser.get().id,
        content: $scope.comment,
        persisted: false
      });

      $scope.comment = undefined;
    };
  })
  .controller('PostUpdateController', function ($scope, $document, $PostResource, $currentUser) {
    $scope.post = undefined;

    $scope.addPost = function () {
      if (!$scope.post) { return null; }

      $PostResource.postUpdate({
        userId: $currentUser.get().id,
        date: '',
        content: $scope.post,
        comments: []
      });

      clear();
      close();
    };

    $scope.cancel = function () {
      clear();
      close();
    };

    function clear() {
      $scope.post = undefined;
    }

    function close() {
      angular.element($document[0].getElementsByClassName('lightbox-container')[0]).removeClass('lightbox-show');
    }
  })
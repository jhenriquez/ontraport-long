angular
  .module('TheNetwork')
  .directive('onEnter', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attr) {
        el.bind('keydown', function (e) {
          var key = e.keyCode || e.which;
          if (key === 13) {
            e.preventDefault();
            scope.$apply(attr.onEnter);
          }
        });
      }
    };
  })
  .directive('onEscape', function () {
    return {
      restrict: 'A',
      link: function (scope, el, attr) {
        el.bind('keydown', function (e) {
          var key = e.keyCode || e.which;
          if (key === 27) {
            e.preventDefault();
            scope.$apply(attr.onEscape);
          }
        });
      }
    };
  });
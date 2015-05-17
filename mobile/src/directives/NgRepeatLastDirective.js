CommuttrApp.directive('ngLastRepeat', ['$timeout', function($timeout) {
    return {
        restrict : 'A',
        link : function(scope, element, attribute) {
            if (scope.$last == true) {
                $timeout(function() {
                    scope.$emit('ngLastRepeat' +
                        (attribute.ngLastRepeat ? '.' + attribute.ngLastRepeat : ''));
                });
            }
        }
    }
}]);

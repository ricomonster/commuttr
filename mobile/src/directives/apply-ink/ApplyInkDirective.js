(function() {
    'use strict';

    angular.module('commutrMobile.directives.applyInk')
        .directive('applyInk', ['$timeout', ApplyInk]);

    function ApplyInk($timeout) {
        return {
            restrict : 'A',
            link : function(scope, element, attribute) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('applyInk' + (attribute.applyInk ?
                            '.' + attribute.applyInk : ''));
                    });
                }
            }
        }
    }
})();

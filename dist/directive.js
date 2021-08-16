/* global Directive */
Provider.directive('[value]', function () {
    'use strict';
    return {
        scope: false,
        link: function (el, scope, exp) {
            el.innerHTML = scope.$eval(exp) || '';
            scope.$watch(exp, function (val) {
                el.innerHTML = val;
            });
        }
    };
});

Provider.directive('[visible]', () => {
    'use strict';
    return {
        scope: false,
        link: function (el, scope, exp) {
            console.log(scope.$eval(exp));
            scope.$watch(exp, function (val) {
                console.log(val);
                if (val)
                    el.style.visibility = 'visible'
                else
                    el.style.visibility = 'hidden'
            });
        }
    };
});

Provider.directive('(click)', () => {
    'use strict';
    return {
        scope: false,
        link: function (el, scope, exp) {
            el.onclick = function () {
                scope.$eval(exp);
                scope.$digest();
            };
        }
    };
});

Provider.directive('(submit)', () => {
    'use strict';
    return {
        scope: false,
        link: function (el, scope, exp) {
            el.onsubmit = function () {
                scope.$eval(exp);
                scope.$digest();
            };
        }
    };
});

Provider.directive('component', () => {
    'use strict';
    return {
        scope: true,
        link: function (el, scope, exp) {
            var ctrl = Provider.get(exp + Provider.COMPONENTS_SUFFIX);
            Provider.invoke(ctrl, { $scope: scope });
        }
    };
});

Provider.directive('(model)', () => {
    'use strict';
    return {
        link: function (el, scope, exp) {
            el.onkeyup = function () {
                scope[exp] = el.value;
                scope.$digest();
            };
            scope.$watch(exp, function (val) {
                el.value = val;
            });
        }
    };
});

Provider.directive('foreach', () => {
    'use strict';
    return {
        scope: false,
        link: function (el, scope, exp) {
            var scopes = [];
            var parts = exp.split('of');
            var collectionName = parts[1].trim();
            var itemName = parts[0].trim();
            var parentNode = el.parentNode;

            function render(val) {
                var els = val;
                var currentNode;
                var s;
                while (parentNode.firstChild) {
                    parentNode.removeChild(parentNode.firstChild);
                }
                scopes.forEach(function (s) {
                    s.$destroy();
                });
                scopes = [];
                els.forEach(function (val) {
                    currentNode = el.cloneNode();
                    currentNode.removeAttribute('foreach');
                    s = scope.$new();
                    scopes.push(s);
                    s[itemName] = val;
                    DUCKRender.compile(currentNode, s);
                    parentNode.appendChild(currentNode);
                });
            }
            scope.$watch(collectionName, render);
            render(scope.$eval(collectionName));
        }
    };
});


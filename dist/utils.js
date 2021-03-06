/* global Utils */
function Scope(parent, id) {
    'use strict';
    this.$$watchers = [];
    this.$$children = [];
    this.$parent = parent;
    this.$id = id || 0;
};

Scope.counter = 0;

Scope.prototype.$watch = function(exp, fn) {
    'use strict';
    this.$$watchers.push({
        exp: exp,
        fn: fn,
        last: Utils.clone(this.$eval(exp))
    });
};

Scope.prototype.$eval = function(exp) {
    var val;
    if (typeof exp === 'function') {
        val = exp.call(this);
    } else {
        try {
            with(this) {
                val = eval(exp);
            }
        } catch (e) {
            val = undefined;
        }
    }
    return val;
};

Scope.prototype.$new = function() {
    'use strict';
    Scope.counter += 1;
    var obj = new Scope(this, Scope.counter);
    Object.setPrototypeOf(obj, this);
    this.$$children.push(obj);
    return obj;
};

Scope.prototype.$destroy = function() {
    'use strict';
    var pc = this.$parent.$$children;
    pc.splice(pc.indexOf(this), 1);
};

Scope.prototype.$digest = function() {
    'use strict';
    var dirty, watcher, current, i;
    do {
        dirty = false;
        for (i = 0; i < this.$$watchers.length; i += 1) {
            watcher = this.$$watchers[i];
            current = this.$eval(watcher.exp);
            if (!Utils.equals(watcher.last, current)) {
                watcher.last = Utils.clone(current);
                dirty = true;
                watcher.fn(current);
            }
        }
    } while (dirty);
    for (i = 0; i < this.$$children.length; i += 1) {
        this.$$children[i].$digest();
    }
};

var Utils = {
    equals: function(a, b) {
        'use strict';
        return JSON.stringify(a) === JSON.stringify(b);
    },
    clone: function(a) {
        'use strict';
        try {
            return JSON.parse(JSON.stringify(a));
        } catch (e) {
            return undefined;
        }
    }
};
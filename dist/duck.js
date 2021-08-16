var DUCKRender=DUCKRender||function(){"use strict";return{bootstrap:function(){this.compile(document.children[0],Provider.get("$rootScope"))},compile:function(t,i){var r,n;this._getElDirectives(t).forEach(function(e){(r=Provider.get(e.name+Provider.DIRECTIVES_SUFFIX)).scope&&!n&&(i=i.$new(),n=!0),r.link(t,i,e.value)}),Array.prototype.slice.call(t.children).forEach(function(e){this.compile(e,i)},this)},_getElDirectives:function(e){for(var t=e.attributes,i=[],r=0;r<t.length;r+=1)Provider.get(t[r].name+Provider.DIRECTIVES_SUFFIX)&&i.push({name:t[r].name,value:t[r].value});return i}}}(),Provider=Provider||function(){"use strict";return{get:function(e,t){if(this._cache[e])return this._cache[e];var i=this._providers[e];return i&&"function"==typeof i?this._cache[e]=this.invoke(i,t):null},directive:function(e,t){this._register(e+Provider.DIRECTIVES_SUFFIX,t)},component:function(e,t){this._register(e+Provider.COMPONENTS_SUFFIX,function(){return t})},service:function(e,t){this._register(e,t)},annotate:function(e){e=e.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,"").match(/\((.*?)\)/);return e&&e[1]?e[1].split(",").map(function(e){return e.trim()}):[]},invoke:function(e,t){t=t||{};var i=this.annotate(e).map(function(e){return t[e]||this.get(e,t)},this);return e.apply(null,i)},_cache:{$rootScope:new Scope},_providers:{},_register:function(e,t){this._providers[e]=t}}}();function Scope(e,t){"use strict";this.$$watchers=[],this.$$children=[],this.$parent=e,this.$id=t||0}Provider.DIRECTIVES_SUFFIX="Directive",Provider.COMPONENTS_SUFFIX="Component",Provider.directive("[value]",function(){"use strict";return{scope:!1,link:function(t,e,i){t.innerHTML=e.$eval(i)||"",e.$watch(i,function(e){t.innerHTML=e||""})}}}),Provider.directive("[disable]",()=>{"use strict";return{scope:!1,link:function(t,e,i){t.classList.add("disabled"),e.$watch(i,function(e){e?t.classList.add("disabled"):t.classList.remove("disabled")})}}}),Provider.directive("[visible]",()=>{"use strict";return{scope:!1,link:function(t,e,i){t.style.visibility="hidden",e.$watch(i,function(e){t.style.visibility=e?"visible":"hidden"})}}}),Provider.directive("(click)",()=>{"use strict";return{scope:!1,link:function(e,t,i){e.onclick=function(){t.$eval(i),t.$digest()}}}}),Provider.directive("(keydown)",()=>{"use strict";return{scope:!1,link:function(e,t,i){e.onkeypress=function(){t.$eval(i),t.$digest()}}}}),Provider.directive("(submit)",()=>{"use strict";return{scope:!1,link:function(e,t,i){e.onsubmit=function(){t.$eval(i),t.$digest()}}}}),Provider.directive("component",()=>{"use strict";return{scope:!0,link:function(e,t,i){i=Provider.get(i+Provider.COMPONENTS_SUFFIX);Provider.invoke(i,{$scope:t})}}}),Provider.directive("(model)",()=>{"use strict";return{link:function(t,e,i){t.onkeyup=function(){e[i]=t.value,e.$digest()},e.$watch(i,function(e){t.value=e})}}}),Provider.directive("foreach",()=>{"use strict";return{scope:!1,link:function(r,n,e){var o=[],t=e.split("of"),e=t[1].trim(),c=t[0].trim(),s=r.parentNode;function i(e){for(var t,i,e=e;s.firstChild;)s.removeChild(s.firstChild);o.forEach(function(e){e.$destroy()}),o=[],e.forEach(function(e){(t=r.cloneNode()).removeAttribute("foreach"),i=n.$new(),o.push(i),i[c]=e,DUCKRender.compile(t,i),s.appendChild(t)})}n.$watch(e,i),i(n.$eval(e))}}}),Scope.counter=0,Scope.prototype.$watch=function(e,t){"use strict";this.$$watchers.push({exp:e,fn:t,last:Utils.clone(this.$eval(e))})},Scope.prototype.$eval=function(exp){var val;if("function"==typeof exp)val=exp.call(this);else try{with(this)val=eval(exp)}catch(e){val=void 0}return val},Scope.prototype.$new=function(){"use strict";Scope.counter+=1;var e=new Scope(this,Scope.counter);return Object.setPrototypeOf(e,this),this.$$children.push(e),e},Scope.prototype.$destroy=function(){"use strict";var e=this.$parent.$$children;e.splice(e.indexOf(this),1)},Scope.prototype.$digest=function(){"use strict";var e,t,i,r;do{for(e=!1,r=0;r<this.$$watchers.length;r+=1)t=this.$$watchers[r],i=this.$eval(t.exp),Utils.equals(t.last,i)||(t.last=Utils.clone(i),e=!0,t.fn(i))}while(e);for(r=0;r<this.$$children.length;r+=1)this.$$children[r].$digest()};var Utils={equals:function(e,t){"use strict";return JSON.stringify(e)===JSON.stringify(t)},clone:function(e){"use strict";try{return JSON.parse(JSON.stringify(e))}catch(e){return}}};
require('ember');

/**
 Should be used instead of `$.proxy` when registering listeners on jQuery elements. Example:

 Will work correctly when removing the listener again. Example:

 ```javascript
 didInsertElement: function() {
    this.$().on('click', Billy.proxy(this.didClick, this));
 },
 willDestroyElement: function() {
    this.$().off('click', Billy.proxy(this.didClick, this));
 }
 ```

 Note: Does NOT work with extra arguments like `$.proxy` does.
 */
module.exports = function(fn, context) {
    var guid = Em.guidFor(fn) + Em.guidFor(context);
    var proxy = function() {
        fn.apply(context, arguments);
    };
    proxy.guid = guid;
    return proxy;
};

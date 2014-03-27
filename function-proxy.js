/**
 Should be used instead of `$.proxy` when registering listeners on jQuery elements. Example:

 Will work correctly when removing the listener again. Example:

 ```javascript
 didInsertElement: function() {
    $('#element').on('click', functionProxy.proxy(this.didClick, this));
 },
 willDestroyElement: function() {
    $('#element').off('click', functionProxy.proxy(this.didClick, this));
 }
 ```

 Note: Does NOT work with extra arguments like `$.proxy` does.
 */

var GUID_KEY = '__guid'+ (+ new Date()),
    uuid = 0;

function proxy(fn, context) {
    var guid = guidFor(fn) + guidFor(context);
    var proxy = function() {
        return fn.apply(context, arguments);
    };
    proxy.guid = guid;
    return proxy;
}

function guidFor(obj) {
    if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
        throw new Error('GUIDs can only be generated for objects and functions.');
    }

    //If key is found on object, return object's GUID
    if (obj[GUID_KEY]) {
        return obj[GUID_KEY];
    }

    //Generate new GUID
    var ret = 'guid' + (uuid++);
    obj[GUID_KEY] = ret;

    //Return GUID
    return ret;
}

proxy.guidFor = guidFor;

module.exports = proxy;
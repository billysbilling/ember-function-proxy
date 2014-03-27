var assert = require('assert'),
    functionProxy = require('./function-proxy');

describe('guidFor', function () {

    it('works for functions and objects', function() {
        var obj = {wee: 'nice!'},
            func = function() { return 'awesome' };
        assert.equal('guid0', functionProxy.guidFor(obj));
        assert.equal('guid1', functionProxy.guidFor(func));
    });

    it('starts with text \'guid\'', function() {
        var obj = {wee: 'nice!'};
        assert.equal(0, functionProxy.guidFor(obj).indexOf('guid'));
    });

    it('uses sequential GUIDs', function() {
        var guid1 = parseInt(functionProxy.guidFor({wee: 'nice!'}).slice(4)),
            guid2 = parseInt(functionProxy.guidFor({wee: 'cool!'}).slice(4));
        assert.equal(guid1, guid2 - 1);
    });

    it('provides same GUID for same object', function() {
        var obj = {wee: 'nice!'};
        assert.equal(functionProxy.guidFor(obj), functionProxy.guidFor(obj));
    });

    it('provides different GUID for different objects that look the same', function() {
        var obj = {wee: 'nice!'},
            obj2 = {wee: 'nice!'};
        assert.notEqual(functionProxy.guidFor(obj), functionProxy.guidFor(obj2));
    });

    it('throws when provided a number', function() {
        assert.throws(function() { functionProxy(2, {}) }, Error);
    });

    it('throws when provided a string', function() {
        assert.throws(function() { functionProxy("wee", {}) }, Error);
    });

    it('throws when provided null', function() {
        assert.throws(function() { functionProxy(null, {}) }, Error);
    });

    it('throws when provided undefined', function() {
        assert.throws(function() { functionProxy(undefined, {}) }, Error);
    });
});

describe('proxy', function() {

    it('returned proxy has context provided', function() {
        var context = {name: "Dave"},
            getUserName = function() {
                assert.equal(context, this);
                return this.name;
            };

        var getUserNameProxy = functionProxy(getUserName, context);
        assert.equal("Dave", getUserNameProxy());
    });

    it('returned proxy has correct composite GUID', function() {
        var context = {name: "Dave"},
            getUserName = function() {
                assert.equal(context, this);
                return this.name;
            },
            expectedGUID = functionProxy.guidFor(getUserName) + functionProxy.guidFor(context),
            getUserNameProxy = functionProxy(getUserName, context);
        assert.equal(expectedGUID, getUserNameProxy.guid);
    });

    it('two proxies are different objects with same GUID', function() {
        var getUserName = function() {
                assert.equal(context, this);
                return this.name;
            },
            context = {name: "Dave"},
            proxy1 = functionProxy(getUserName, context),
            proxy2 = functionProxy(getUserName, context);
        assert.notEqual(proxy1, proxy2);
        assert.equal(proxy1.guid, proxy2.guid);
    });
});
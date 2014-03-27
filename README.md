function-proxy
====================

Alternative for $.proxy for event binding with jQuery.

### What's the point?

When using `jQuery.on()`, we want to make sure that we have predictable results when using `jQuery.off()`, and that it
doesn't unbind additional functions.

### How does it work?

The crux of its functionality is that passing it a function with a particular context will return a new function with a
unique GUID assigned as a property.  Subsequent calls to `proxy()` with the same function and context will return new
functions but the same GUID.  As a side effect, all functions and contexts passed to the `proxy()` function will have
the property `__guid<timestamp>` with value `guid<guid>`

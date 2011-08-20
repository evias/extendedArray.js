/**
 * Copyright (c) 2010-2011, Grégory Saive
 * see LICENSE file for more details.
 *
 * @brief
 * this library defines some useful functions
 * which you can apply on Javascript Array
 * objects.
 **/

Array.prototype.copy = function()
{
    var startIdx = 0;
    var endIdx   = this.length;
    if (arguments.length) {
        var startIdx = arguments[0];
        var endIdx   = typeof(arguments[1]) != "undefined" ? arguments[1] : this.length;
    }

    var n = new Array();
    for (var i = startIdx; i < endIdx; i++)
        n.push(this[i]);

    return n;
}

Array.prototype.find = function(value)
{
    for (var i = 0, m = this.length; i < m; i++)
        if (this[i] == value)
            return i;

    return false;
}

Array.prototype.intersect = function()
{
    if (! arguments.length)
        return [];

    var intersection = new Array();
    for (ix in arguments) {

        // get the passed array ..
        var comparing = arguments[ix];
        if (comparing.length)
            for (var i =0, m = this.length; i < m; i++)
                if (comparing.find(this[i]) !== false)
                    intersection.push(this[i]);
    }

    return intersection;
}

Array.prototype.difference = function()
{
    if (! arguments.length)
        return [];

    var merged = new Array();
    for (ix in arguments)
        merged = merged.merge(arguments[ix]);

    var difference = new Array();
    for (var i = 0, m = this.length; i < m; i++)
        if (difference.find(this[i]) === false
            && merged.find(this[i]) === false) {

            difference.push(this[i]);
        }

    return difference;
}

Array.prototype.merge = function()
{
    if (! arguments.length)
        return this;

    var merged = this;
    for (ix in arguments)
        if (arguments[ix].length)
            for (var i = 0, m = arguments[ix].length; i < m; i++)
                merged.push(arguments[ix][i]);

    return merged;
}

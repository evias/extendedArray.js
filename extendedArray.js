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

Array.prototype.swap = function(idx1, idx2)
{
    var swap = this[idx1];
    this[idx1] = this[idx2];
    this[idx2] = swap;
}

/**
 * Mathematical functions
 **/

Array.prototype.sum = function()
{
    if (arguments.length)
    // merge all arguments array to 'this'
        for (ix in arguments)
            this = this.merge(arguments[ix]);

    var sum = 0;
    for (var i = 0, m = this.length; i < m; i++)
        if (! isNaN(this[i]))
            sum += this[i];

    return sum;
}

Array.prototype.avg = function()
{
    if (arguments.length)
    // merge all arguments array to 'this'
        for (ix in arguments)
            this = this.merge(arguments[ix]);

    return this.sum() / this.length;
}

Array.prototype.median = function(idxLeft, idxRight, asIndex)
{
    var mid = Math.round(idxRight / 2);

    if (this[idxLeft] >= this[idxRight]) {
        if (this[idxLeft] < this[mid])
            return asIndex ? idxLeft : this[idxLeft];
        else
            return asIndex ? mid : this[mid];
    }
    else if (this[idxRight] >= this[mid]) {
        if (this[idxLeft] >= this[mid])
            return asIndex ? idxLeft : this[idxLeft];
        else
            return asIndex ? mid : this[mid];
    }
    else
        return asIndex ? idxRight : this[idxRight];
}

/**
 * Sorting algorithms
 **/

/**
 * @brief
 * partition the array between idxLeft and idxRight so that
 * all the values smaller than the pivot value are placed to its
 * left and all bigger values are placed to its right.
 *
 * @param   idxLeft     integer     start partition pos
 * @param   idxRight    integer     end partition pos
 * @param   idxPivot    integer     pivot position
 *
 * @return integer final pivot position
 **/
Array.prototype.partition = function(idxLeft, idxRight, idxPivot)
{
    if (isNaN(idxLeft) || isNaN[idxRight] || isNaN[idxPivot]
        || this[idxPivot] == null || this[idxLeft] == null || this[idxRight] == null)
        return this;

    var pivotVal = this[idxPivot];
    var storeIdx = idxLeft;

    // swap pivot & right, set to the end
    this.swap(idxPivot, idxRight-1);

    for (var i = idxLeft; i < idxRight-1; ++i) {
        if (this[i] <= pivotVal) {
            this.swap(storeIdx, i);
            ++storeIdx;
        }
    }

    // move pivot to its final place
    this.swap(idxRight-1, storeIdx);
    return storeIdx;
}

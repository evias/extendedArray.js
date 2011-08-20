# extendedArray.js

This class extends the Array object of the Javascript language
so far to allow easy access to the Array's data or compare, slice,
intersect, etc.. the data of it.

## Use instructions

Whenever you want to use these features, you need to import the library
into your website. Then you can simply access the methods by doing something like :

    var fstArray = new Array();
    var sndArray = new Array();

    fstArray.push(1);
    fstArray.push(4);
    fstArray.push(6);

    sndArray.push(1);
    sndArray.push(7);
    sndArray.push(4);

    var intersect = fstArray.intersect(sndArray);

    // intersect=[1,4]

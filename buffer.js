// Raw data is stored in instances of the Buffer class. 
// A Buffer is similar to an array of integers but corresponds to a
// raw memory allocation outside the V8 heap. A Buffer cannot be resized.

// The Buffer object is global.
// 
// Converting between Buffers and JavaScript string objects requires an explicit encoding method.
// Here are the different string encodings;

buf = new Buffer(256);
len = buf.write('\u00bd + \u00bc = \u00be', 0);
console.log(len + " bytes: " + buf.toString('utf8', 0, len));





console.log("7" + 3);        // "73"
console.log("7" - 3);        // 
console.log(7 + 3 + "1");    // "101"

console.log("7" * "2");      // 14
console.log(10 / 3); 


console.log(typeof null);    // 
console.log(typeof NaN);     // 

// Boolean conversion
console.log(Boolean("false")); // true
console.log(Boolean("0"));     // true

// Logical operators
console.log(0 || "fallback");  // "fallback"
console.log(0 ?? "fallback");  // 0
console.log("" || "empty");    // "empty"

// Comparison
console.log("10" == 10);      // true
console.log("10" === 10);     // false

// Number conversion
console.log(Number("12abc"));   // NULL
console.log(parseInt("12abc")); // 12

// String methods
console.log(" hi ".trim());       // "hi"
console.log("cat".includes("a")); // true

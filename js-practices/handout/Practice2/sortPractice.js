'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  var isSorted;
  while (true) {
    isSorted = true;
    for (var i = 0; i < input.length - 1; i++) {
      if (input[i] > input[i+1]) {
        isSorted = false;
        var tg = input[i];
        input[i] = input[i+1];
        input[i+1] = tg;
      }
    }
    if (isSorted === true) return input;
  }
}

module.exports = sort

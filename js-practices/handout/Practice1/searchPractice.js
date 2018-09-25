'use strict'

function search(input, target) {
  for (let i = 0; i < input.length; i++) {
    if (input[i] == target) {
      return i;
    }
  }
  // console.log(`vij trí của target là : ${i}`)
  return -1; 
}

module.exports = search 

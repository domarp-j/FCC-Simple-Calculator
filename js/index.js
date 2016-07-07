// Math.js would make this task significantly easier.
// Math.js & jQuery are not used, for an extra challenge.

/*******************************************************************************************/

// INPUT COLLECTION

// Initialize global variables
var input = ""; // string that collects calculator input
var output = ""; // last calculated answer stored for later use
var maxInputLength = 12; 
var parenthsDiff = 0; // difference between number of left & right parentheses
var parenthsMsg = "Check Parentheses"; 
var incompleteMsg = "Incomplete"; 
var divZeroMsg = "Dividing By Zero"; 

// Collect input from buttons
document.getElementById("button0").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "0";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button1").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "1";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button2").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "2";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button3").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "3";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button4").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "4";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button5").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "5";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button6").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "6";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button7").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "7";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button8").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "8";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("button9").onclick = function() {
  if (input.length >= maxInputLength) return;
  input += "9";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonDec").onclick = function() {
  if (input.length >= maxInputLength) return;
  if (/[\.]/.test(input[input.length-1])) return;
  input += ".";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonPlus").onclick = function() {
  if (input.length == 0 && output != "") input += output; 
  if (input.length >= maxInputLength) return; 
  if (/[\+\-\*\/]/.test(input[input.length-1])) return; 
  input += "+";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonMinus").onclick = function() {
  if (input.length == 0 && output != "") input += output; 
  if (input.length >= maxInputLength) return;
  if (/[\+\-\*\/]/.test(input[input.length-1])) return;
  input += "-";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonMult").onclick = function() {
  if (input.length == 0 && output != "") input += output; 
  if (input.length >= maxInputLength || input.length == 0) return;
  if (/[\+\-\*\/]/.test(input[input.length-1])) return;
  input += "*";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonDiv").onclick = function() {
  if (input.length == 0 && output != "") input += output; 
  if (input.length >= maxInputLength || input.length == 0) return;
  if (/[\+\-\*\/]/.test(input[input.length-1])) return;
  input += "/";
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonC").onclick = function() {
  if (input[input.length - 1] == '(') parenthsDiff--;
  else if (input[input.length - 1] == ')') parenthsDiff++;
  input = input.substring(0, input.length - 1);
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonAC").onclick = function() {
  parenthsDiff = 0;
  input = "";
  output = ""; 
  document.getElementById("screen").innerHTML = input;
}
document.getElementById("buttonAns").onclick = function() {
  if (output == false) return; 
  if (input.length + output.length >= maxInputLength) return;
  input += output;
  document.getElementById("screen").innerHTML = input;
}

// A special case - parentheses button '()'
// Automatically determines which parenthesis to use 
document.getElementById("buttonParentheses").onclick = function() {
  if (input.length == maxInputLength) return;
  if (input.length == 0 || /[\(\+\-\*\/]/.test(input[input.length - 1])) {
    input += "(";
    parenthsDiff++;
  } else if (/[0-9\)]/.test(input[input.length - 1])) { // number or right parenthesis
    if (parenthsDiff > 0) { // close out left parentheses 
      input += ")";
      parenthsDiff--;
    } else { // no left parentheses - add multiplier & right parenthesis
      input += "*(";
      parenthsDiff++;
    }
  }
  document.getElementById("screen").innerHTML = input;
}

// Analyze input & get output after pressing equal sign
document.getElementById("buttonEqual").onclick = function() {
  if (parenthsDiff != 0) {
    document.getElementById("screen").innerHTML = parenthsMsg;
    return;
  }
  if (/[\+\-\*\/]/.test(input[input.length-1])) {
    document.getElementById("screen").innerHTML = incompleteMsg;
    return;
  }
  output = calculate(input); 
  if (output == divZeroMsg) { // dividing by 0
    document.getElementById("screen").innerHTML = divZeroMsg;
    output = "";
    return;
  }
  if (output.length > maxInputLength) { 
    output = parseFloat(output).toExponential(output.length - maxInputLength - 3); 
    output = output.toString();
  }
  document.getElementById("screen").innerHTML = output;
  input = output;  
}

/*******************************************************************************************/

// GETTING OUTPUT FROM INPUT

// MAIN FUNCTION
// Given - input, or calculation to be performed, as string
// Returns - calculated result
function calculate(input) {
  // dealing with parentheses 
  for (var i = 0; i < input.length; i++) {
    if (input[i] == '(') {
      var openParenth = i; // index of opening parenthesis
      var inputPiece = "";
      for (var j = i + 1; input[j] != ')'; j++) {
        if (input[j] == '(') { // reset after finding new opening parenthesis
          openParenth = j; 
          inputPiece = ""; 
          continue; 
        }
        var closeParenth = j + 1; // index of closing parenthesis (when for loop ends)
        inputPiece += input[j]; 
      }
      inputPiece = calculate(inputPiece); // solve inputPiece calculation
      input = input.slice(0,openParenth) + inputPiece +  input.slice(closeParenth + 1); 
      input = calculate(input); // check for more parentheses 
    }
  } 
  // multiplication or division
  for (var i = 0; i < input.length; i++) {
    if (input[i] == '*' || input[i] == '/') {
      var leftRightData = getLeftRightData(input, i); // see function for details
      var left = leftRightData[0]; // number to left of the '*' or '/'
      var right = leftRightData[1]; // number to right of '*' or '/'
      var l = leftRightData[2]; // index of first char of number to the left
      var r = leftRightData[3]; // index of last char of number to the right
      if (input[i] == '/' && parseFloat(right) == 0) return divZeroMsg; // dividing by 0 
      var result = input[i] == '*' ?
        parseFloat(left) * parseFloat(right) : parseFloat(left) / parseFloat(right);
      if (result >= 0) result = "+" + result; // '+' needed in front of positives
      input = input.substring(0, l) + result + input.substring(r);
      if (input[0] == '+') input = input.substring(1);  
      i = 0; // reset for loop, look for another '*' or '/'
    }
  }
  // addition or subtraction 
  for (var i = 0; i < input.length; i++) {
    if (input[i] == '+' || input[i] == '-') {
      // determine if '+' or '-' indicates pos/neg rather than plus/minus
      if (i == 0) continue; // first character
      if (input[i - 1] == 'e') continue; // follows exponential 
      if (input[i - 1] == '*' || input[i - 1] == '/') continue; // follows '*' or '/'
      // '+' or '-' is definitely plus or minus
      var leftRightData = getLeftRightData(input, i); // see function for details
      var left = leftRightData[0]; // number to left of the '+' or '-'
      var right = leftRightData[1]; // number to right of the '+' or '-'
      var l = leftRightData[2]; // index of first char of number to the left
      var r = leftRightData[3]; // index of last char of number to the right
      var result = input[i] == '+' ?
        parseFloat(left) + parseFloat(right) : parseFloat(left) - parseFloat(right);
      if (result >= 0) result = "+" + result; // '+' needed in front of positives
      input = input.substring(0, l) + result + input.substring(r);
      if (input[0] == '+') input = input.substring(1);
      i = 0;
    }
  }
  return input;
}

// HELPER FUNCTION
// Given - input string of calculator & index value of an operator, like '+' or '*'
// Returns - the numbers immediately to the left and right of the input char at that index 
// Also returns - the indices of the first char of the left num & last char of the right num
function getLeftRightData(input, i) {
  var left = "";
  var right = "";
  var l = i - 1;
  var r = i + 1;
  // find the number immediately to the left of input[index]
  while (/\d|\x2E|\x2B|\x2D|[e]/.test(input[l])) { // found digit, decimal, '+', '-', or exp
    left = input[l] + left; // add new char to beginning of left
    if ((input[l] == '+' || input[l] == '-') && input[l - 1] != 'e') break;
    l--; // going backward from index, one char at a time
    if (l == -1) break; // exceeded first char in input
  }
  // determine if a '+' or '-' (positive or negative) follows a '*' or '/' 
  if ((input[i] == '*' || input[i] == '/') && (input[r] == '+' || input[r] == '-')) {
    right += input[r]; 
    r++; 
  } 
  // find the rest of the number immediately to the right of input[index]
  while (/\d|\x2E/.test(input[r])) { // digit or decimal
    right += input[r]; // add new char to end of right
    r++; // going forward past index, one char at a time
  }
  return [left, right, l, r];
}
//your code here
// 1. Custom error classes extending Error

class OutOfRangeError extends Error {
  constructor(arg) {
    super();
    this.name = "OutOfRangeError";
    this.message = `Expression should only consist of integers and +-/* characters and not < ${arg} >`;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super();
    this.name = "InvalidExprError";
    this.message = "Expression should not have an invalid combination of expression";
  }
}

// 2. evalString function with try-catch block

function evalString(str) {
  try {
    const s = str.trim();

    // Check for any invalid character (not digit, +, -, *, /, or space)
    const badCharMatch = s.match(/[^0-9+\-*/\s]/);
    if (badCharMatch) {
      throw new OutOfRangeError(badCharMatch[0]);
    }

    // Check for invalid operator combinations like ++, +/, /*, etc.
    if (/[+\-*/][+\-*/]/.test(s)) {
      throw new InvalidExprError();
    }

    // Check: should not start with +, *, /
    if (/^[+*/]/.test(s)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Check: should not end with +, -, *, /
    if (/[+\-*/]$/.test(s)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // Evaluate valid integer arithmetic expression
    return eval(s);
  } catch (error) {
    // Re-throw the exact error as required
    throw error;
  }
}

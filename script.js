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

        if (!s) {
          throw new SyntaxError("Expression should not start with invalid operator");
        }

        // Check for invalid characters (not digit, +, -, *, /, or space)
        const badCharMatch = s.match(/[^0-9+\-*/\s]/);
        if (badCharMatch) {
          throw new OutOfRangeError(badCharMatch[0]);
        }

        // Check for invalid operator combinations: ++, +*, /*, etc.
        const stripped = s.replace(/\s+/g, ""); // remove spaces
        if (/[+\-*/][+\-*/]/.test(stripped)) {
          throw new InvalidExprError();
        }

        // Should not start with +, *, / (but `-` allowed for negative)
        if (/^[+*/]/.test(s)) {
          throw new SyntaxError("Expression should not start with invalid operator");
        }

        // Should not end with +, -, *, /
        if (/[+\-*/]$/.test(s)) {
          throw new SyntaxError("Expression should not end with invalid operator");
        }

        // Evaluate valid integer arithmetic expression
        return eval(s);
      } catch (error) {
        throw error;
      }
    }

    // 3. Bind to UI (with Cypress IDs)

    const input = document.getElementById("input1");
    const resultDiv = document.getElementById("result");
    const button = document.getElementById("btn-eval");

    button.addEventListener("click", () => {
      const expr = input.value;

      resultDiv.innerHTML = "";

      if (!expr.trim()) {
        resultDiv.textContent = "Please enter an expression.";
        return;
      }

      try {
        const res = evalString(expr);
        resultDiv.innerHTML = `<b>Result:</b> ${res}`;
      } catch (error) {
        if (error instanceof OutOfRangeError) {
          resultDiv.innerHTML = `<b>OutOfRangeError:</b> ${error.message}`;
        } else if (error instanceof InvalidExprError) {
          resultDiv.innerHTML = `<b>InvalidExprError:</b> ${error.message}`;
        } else if (error instanceof SyntaxError) {
          resultDiv.innerHTML = `<b>SyntaxError:</b> ${error.message}`;
        } else {
          resultDiv.innerHTML = `<b>Unexpected Error:</b> ${error.message}`;
        }
      }
    });

    // Allow pressing Enter in the input
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        button.click();
      }
    });
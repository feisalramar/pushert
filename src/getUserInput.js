
const getUserInput = async (prompt) => {
  return (
    new Promise() <
    string >
    ((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readline.question(prompt, (answer) => {
        readline.close();
        resolve(answer);
      });
    })
  );
};

export default getUserInput;

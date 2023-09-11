import ReadLine from "readline";


const getUserInput = async (prompt) => {
  return new Promise((resolve) => {
    const readline = ReadLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(prompt, (answer) => {
      readline.close();
      resolve(answer);
    });
  });
};

export default getUserInput;

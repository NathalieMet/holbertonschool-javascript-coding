function whatsYourName() {
  process.stdout.write('Welcome to Holberton School, what is your name?\n');
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (input) => {
    const userName = input.toString();
    process.stdout.write(`Your name is: ${userName}`);

    process.stdout.write('This important software is now closing\n');
    process.exit();
  });
}

module.exports = whatsYourName;

if (require.main === module) {
  whatsYourName();
}

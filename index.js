import axios from 'axios';
import crypto from 'node:crypto';
import inquirer from 'inquirer';

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const sendMessage = async (username, message, index) => {
  try {
    const deviceId = crypto.randomBytes(16).toString('hex');
    const req = await axios.post('https://ngl.link/api/submit', {
      username: username,
      question: message,
      deviceId: deviceId,
      gameSlug: '',
      referrer: '',
    });
    console.log({
      index: index,
      target: username,
      message: 'success sent message',
      deviceId,
      data: req.data,
    });
  } catch (error) {
    console.log('error !!!');
    console.log(error);
    await delay(10000);
    sendMessage(username, message, index);
  }
};
const randomString = () => {
  try {
    const alp = [
      ' ',
      '  ',
      '    ',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
    ];
    let message = '';
    for (let index = 0; index <= 20; index++) {
      const randIndex = Math.floor(Math.random() * alp.length);
      const randAlp = alp[randIndex];
      message = message + randAlp;
    }
    return message;
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  try {
    console.log(
      `https://ngl.link/loremipsum
loremipsum is username
      `
    );
    const question = await inquirer.prompt({
      type: 'input',
      name: 'username',
      message: 'insert ngl username target:',
    });
    const tasks = [];
    for (let index = 1; index <= 1000; index++) {
      tasks.push(sendMessage(question.username, randomString(), index));
      await delay(3000);
    }
    await Promise.all(tasks);
    console.log('task success');
  } catch (error) {
    console.log(error);
  }
})();

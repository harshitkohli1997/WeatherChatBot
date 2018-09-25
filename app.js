'use strict';
const Readline = require('readline');
const rl = Readline.createInterface({
   input:process.stdin,
   output:process.stdout,
   terminal:false 
});
console.log('app is running ####');

const matcher = require('./matcher');
const weather = require('./weather');
rl.setPrompt('> ');
rl.prompt();
rl.on('line',reply => {
    matcher(reply,data => {
    switch(data.intent){
        case 'Hello':
        console.log(`${data.entities.greeting} to you too`);
        rl.prompt();
        break;
        case 'Exit':
        console.log("Bye");
        process.exit(0);
        break;
        case 'CurrentWeather':

          console.log(`let me check ....`);
          weather(data.entities.city,'current')
          .then(response => {
              console.log(response);
              rl.prompt()
          })
          .catch(error => {
              console.log("There seem to be a problem connecting tot he Weather service");
              rl.prompt()
          })
          rl.prompt()
          break;
        default: {
            console.log("i don't know what you mean :(");
            rl.prompt();
        }
    }
    })
   
});

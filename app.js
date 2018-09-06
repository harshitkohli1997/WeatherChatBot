'use strict';
const Readline = require('readline');
const rl = Readline.createInterface({
   input:process.stdin,
   output:process.stdout,
   terminal:false 
});
console.log('app is running ####');

const matcher = require('./matcher');
rl.setPrompt('> ');
rl.prompt();
rl.on('line',reply => {
    matcher(reply,data => {
    switch(data.intent){
        case 'Hello':
        console.log("Big hello from bot");
        rl.prompt();
        break;
        case 'Exit':
        console.log("Bye");
        process.exit(0);
        break;
        default: {
            console.log("i don't know what you mean :(");
            rl.prompt();
        }
    }
    })
   
});

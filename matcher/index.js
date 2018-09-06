'use strict';
const patterns = require('../patterns');
const XregExp = require('xregexp');

let matchPattern = (str,cb) => {
    let getResult = patterns.find(item => {
        //i as ignore case flag
     if(XregExp.test(str,XregExp(item.pattern,"i")))
     {
         return true;
     }
    });
    if(getResult){
        return cb({
            intent:getResult.intent
        });

    }
    else {
        return cb({});
    }
}

module.exports = matchPattern;

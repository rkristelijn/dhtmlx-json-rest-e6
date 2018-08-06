const Model = require('./stories-model');
const fs = require('fs');

let data, companies;
const SEED_LOCATION = './api/seed-data/';

function getTextFile(file) {
    let data = fs.readFileSync(SEED_LOCATION + file, 'utf-8');
    return data.split(/\r?\n/);
}
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getGibberish(words, lines, min, max) {
    let ret = "";
    for (let i = 0; i < lines; i++) {
        let line = "";
        let iterations = getRandomNumberBetween(min, max);
        for (let j = 0; j < iterations; j++) {
            line += line === "" ? getRandomItem(words) : " " + getRandomItem(words);
        }
        ret += ret === "" ? capitalizeFirstLetter(line) + "." : getRandomItem([" ","\n","\n\n"]) + capitalizeFirstLetter(line) + ".";
    }
    return ret;
}
function getRandomDate(options) {
    let mm, dd, yyyy, m, d, y;
    if (options && options.month) mm = month;
    else mm = Math.floor(Math.random() * 12);
    if (options && options.year) yyyy = options.year;
    else yyyy = 2013 + (Math.floor(Math.random() * 5));

    dd = Math.floor(Math.floor(Math.random() * 31));
    let date = new Date(yyyy, mm, dd, 0, 0, 0);

    m = date.getMonth() + 1;
    d = date.getDate();
    y = date.getFullYear();

    return [
        (d > 9 ? '' : '0') + d,
        (m > 9 ? '' : '0') + m,
        date.getFullYear()
    ].join('/');
}

nouns = getTextFile('nouns_en.txt');
verbs = getTextFile('verbs_en.txt');
statuses = getTextFile('status_en.txt');
gibberish = getTextFile('gibberish_en.txt');

let date = new Date();
let thisYear = date.getFullYear();

for (let i = 0; i < 100; i++) {
    let story = {
        "name": capitalizeFirstLetter(getRandomItem(nouns)) + ' ' + getRandomItem(verbs),
        "status": getRandomItem(statuses),
        "due": getRandomDate({ 'year': thisYear }),
        "desc": getGibberish(gibberish, getRandomNumberBetween(1, 3), 10, 30)
    }
    console.log(story);
    let row = new Model(story);
    row.save(err => {
        if (err) console.log('error', err);
    });
}

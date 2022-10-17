'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
    // Write your code here
    let letters_map = {}
    
    for (let letter of s){
        letters_map[letter] = letter in letters_map ? letters_map[letter] + 1 : 1;
    }
    
    let longest_string_lenght = 0;
    let pair_seen = {};
    for (let letter_one in letters_map){        
        for (let letter_two in letters_map){
            if (letter_one === letter_two) continue;
            
            let pair = [letter_one, letter_two];
            let pair_transposed = [letter_two, letter_one]

            if (pair in pair_seen) continue;
            else if (pair_transposed in pair_seen) continue;
            
            else {
                pair_seen[pair] = true;
                pair_seen[pair_transposed] = true;
                
                let lenght = 0;
                let last_letter_added = ''
                for (let letter of s){
                    if (letter === letter_one || letter === letter_two){
                        if (letter === last_letter_added){ // Check if it alternates
                            lenght = 0
                            break;
                        }
                        last_letter_added = letter
                        lenght += 1;
                    }
                }
                if (lenght > longest_string_lenght) {
                    longest_string_lenght = lenght
                }
            }
        }
    }
    
    return longest_string_lenght
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}

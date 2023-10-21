'use strict';

import readline from 'node:readline';

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion() {
    terminal.question(
        'Hello! Enter 10 numbers or words divided by space: ',
        (data) => {
            terminal.pause();
            if (data != null) {
                const formattedData = formatData(data);

                terminal.resume();
                terminal.question(
                    `How would you like to sort values:
1. Sort words alphabetically.
2. Show numbers from lesser to greater.
3. Show numbers from bigger to smaller.
4. Display words in ascending order by number of letters in the word.
5. Show only unique words.
6. Display only unique values from the set of words and numbers entered by the user.

Select (1 - 6) and press ENTER: `,
                    (receivedOption) => {
                        terminal.pause();

                        if (receivedOption != null) {
                            if (receivedOption !== 'exit') {
                                sortData(receivedOption, formattedData);
                                askQuestion();
                            } else {
                                terminal.close();
                            }
                        } else {
                            askQuestion();
                        }
                    }
                );
            }
        }
    );
}

function formatData(data) {
    if (!data) {
        return;
    }

    const normalizedData = data.trim().split(' ');

    const dataByTypes = normalizedData.map((item) => {
        if (Number.isNaN(+item)) {
            return item;
        } else {
            return +item;
        }
    });
    return dataByTypes;
}

function sortData(option, data) {
    if (data == null) {
        return;
    }

    if (Number.isNaN(+option)) {
        return;
    }

    switch (+option) {
        case 1:
            console.log(
                data.filter((item) => typeof item === 'string').sort()
            );
            break;

        case 2:
            console.log(
                data.filter((item) => typeof item === 'number').sort((a, b) => a - b)
            );
            break;

        case 3:
            console.log(
                data.filter((item) => typeof item === 'number').sort((a, b) => b - a)
            );
            break;

        case 4:
            console.log(
                data
                    .filter((item) => typeof item === 'string')
                    .sort((a, b) => a.length - b.length)
            );
            break;

        case 5:
            console.log(
                data.filter((item, i, self) => {
                    if ((typeof item === 'string') && (i === self.indexOf(item))) {
                        return item;
                    } else {
                        return;
                    }
                })
            );
            break;

        case 6:
            console.log(
                data.filter((item, i, self) => i === self.indexOf(item))
            );
            break;

        default:
            console.log(data);
            break;
    }
}

askQuestion();

terminal.on('close', () => {
    console.log('\nGoodbye! Come back again!');
});

import fs from 'node:fs';
import { resolve } from 'node:path';
import inquirer from 'inquirer';

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: 'input',
        name: 'user',
        message: "Enter user's name. To cancel press ENTER:",
    },
    {
        type: 'confirm',
        name: 'search',
        message: 'Would you like to search a user by the name in DB?',
        when: (answers) => answers?.user === '',
    },
    {
        type: 'input',
        name: 'searchName',
        message: 'Enter user name you want to find in DB:',
        when: (answers) => answers?.search === true,
    },
    {
        type: 'list',
        name: 'gender',
        message: 'Choose your Gender:',
        choices: [
            { name: 'male', value: 'male' },
            { name: 'female', value: 'female' },
        ],
        when: (answers) => answers?.user !== '',
    },
    {
        type: 'input',
        name: 'age',
        message: 'Enter your age:',
        when: (answers) => answers?.user !== '',
        validate: (answer) => {
          if (!Number.isNaN(+answer)) {
            return true;
          } else if (answer.length === 0) {
            return true;
          } else {
            return 'Please enter a valid number or leave the field blank'
          }
        }
    },
];

function createUser() {
    prompt(questions)
        .then((answers) => {
            if (answers?.search === false) {
                process.exit();
            }

            const filePath = resolve('./db.txt');

            if (answers?.user !== '') {
                const dbFile = fs.readFileSync(filePath, 'utf8');

                let users;
                if (dbFile?.length === 0) {
                    users = [...dbFile, answers];
                } else {
                    users = [...JSON.parse(dbFile), answers];
                }

                fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
            }

            if (answers?.searchName) {
                const latestDB = fs.readFileSync(filePath, 'utf8');

                if (latestDB.length > 0) {
                    const readDB = JSON.parse(latestDB);

                    const user = readDB.filter(
                        (item) =>
                            item?.user.toLocaleLowerCase() ===
                            answers?.searchName.toLocaleLowerCase()
                    );

                    if (user.length > 0) {
                        console.log(user);
                    } else {
                      console.log('No user with that name has been found :(');
                    }
                }
            }

            createUser();
        })
        .catch((error) => {
            console.error(error);
        });
}

createUser();

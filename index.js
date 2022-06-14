#!/usr/bin/env node

// IMPORTING DEPENDENCIES
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import {createSpinner} from 'nanospinner';
// import Choices from 'inquirer/lib/objects/choices';

// console.log(chalk.bgCyanBright('Hello, World!'));

let playerName;

// helper function to display animation
const sleep=(ms=2000) => new Promise((r) => setTimeout(r,ms));

async function start(){
    const coloredTitle=chalkAnimation.rainbow(
        'How good is your general knowledge? \n'
    );
    await sleep();
    coloredTitle.stop(); //move on to next step after animation display

    console.log(`
        ${chalk.bgBlueBright('RULES')}
        I am a process on your computer.
        If you answer incorrectly to any question I will be ${chalk.bgRedBright('KILLED')}
        Please, get all right . . . 
    `);

}

//inquirer prompt
async function inputName(){
    const inputs=await inquirer.prompt({
        name:'player_name',
        type:'input',
        message:'Wie heißt du?',
        default(){
            return 'Yash';
        },
    });
    playerName=inputs.player_name;
}

async function q1(){
    const answers=await inquirer.prompt({
        name:'question_1',
        type:'list',
        message:'Which of the following is the capital of Arunachal Pradesh?',
        choices: [
            'Itanagar',
            'Dispur',
            'Imphal',
            'Panaji',
        ],
    });
    return correctAnswer(answers.question_1=='Itanagar');
}

async function q2(){
    const answers=await inquirer.prompt({
        name:'question_2',
        type:'list',
        message:'Which is the largest coffee-producing state of India?',
        choices: [
            'Kerala',
            'Tamil Nadu',
            'Karnataka',
            'Arunachal Pradesh',
        ],
    });
    return correctAnswer(answers.question_2=='Karnataka');
}

async function q3(){
    const answers=await inquirer.prompt({
        name:'question_3',
        type:'list',
        message:'What is the state flower of Haryana?',
        choices: [
            'Lotus',
            'Rhododendron',
            'Sunflower',
            'None of the above',
        ],
    });
    return correctAnswer(answers.question_3=='Lotus');
}

async function correctAnswer(isCorrect){
    const spinner=createSpinner('Checking . . .').start();
    if(isCorrect){
        spinner.success({text:`Great job, ${playerName}!`})
    } else{
        spinner.error({text:`💀💀💀 Wrong! You Lose and now I'm dead . . .`});
        process.exit(1);
    }
}

function won(){
    console.clear();
    const msg=`BADHAI HO! ${playerName}! \n Rs.10000000 transferred to your bank account`;
    figlet(msg,(err,data)=>{
        console.log(gradient.pastel.multiline(data));
    });
}

await start(); //top level await
await inputName();
await q1();
await q2();
await q3();
await won();

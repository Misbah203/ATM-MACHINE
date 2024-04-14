#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 5000;
let myPin = 60404;

console.log(chalk.yellow("\nWELCOME TO ATM MACHINE\n"));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.blue("Enter your pin code: ")
  },
]);
if(pinAnswer.pin === myPin){
    console.log(chalk.yellow("\nPinCode is Correct , Login Successfully!\n"));
  
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation: ",
            choices: ["Withdraw Ammount" , "Check Balance"]
        }
    ])
    if(operationAns.operation === "Withdraw Ammount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select an option",
                choices: ["Fast Cash" , "Enter Amount"]
            }
        ])
        
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount",
                    choices: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
                console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw: "
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`))
            }

        }
        
    }
    else if(operationAns.operation === "Check Balance"){
        console.log(chalk.green(`Your Current Balance is: ${myBalance}`));
    }
}
else{
    console.log(chalk.red("Incorrect PinCode, Please Try Again!"))
}
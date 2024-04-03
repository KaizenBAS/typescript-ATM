#! /usr/bin/env node

import * as readlineSync from "readline-sync";

interface Account {
  password: number;
  amount: number;
}

let users: Account[] = [
  {
    password: 7900,
    amount: 50000,
  },
];

let userName: string;
console.log('pin is : 7900');
console.log('username can be anything');
function checkUser(password: number) {
  return users.find((user) => user.password === password);
}



function login() {
  let loggedUser: Account | undefined;

  while (!loggedUser) {
    userName = readlineSync.question("Enter your Username: ");
    let passWord = parseInt(
      readlineSync.question("Enter your pin:   ", { hideEchoBack: true })
    );

    loggedUser = checkUser(passWord);


    if (!loggedUser) {
      console.log("User not found or wrong pin!");
      let choices = ["tryagain", "exit"];
      let index = readlineSync.keyInSelect(choices, "Select option: ");
      switch (choices[index]) {
        case "tryagain":
          break; 
        case "exit":
          process.exit(0);
      }
    }
  }

  console.log(`Welcome ${userName}`);

  while (loggedUser) {
    console.log(`Amount: $${loggedUser.amount}`);
    let mainChoices = ["Deposit funds", "Withdraw funds", "Logout"];
    let mainIndex = readlineSync.keyInSelect(
      mainChoices,
      "Select any choice: "
    );

    switch (mainChoices[mainIndex]) {
      case "Deposit funds":
        let amountToDeposit = parseInt(
          readlineSync.question("Enter amount to deposit: ")
        );
        if (!isNaN(amountToDeposit)) {
          loggedUser.amount += amountToDeposit;
          console.log(`New amount: $${loggedUser.amount}`);
        } else {
          console.log("Enter a valid number!");
        }
        break;

      case "Withdraw funds":
        let withdrawChoice = ["Fastcash", "Enter amount"];
        let depoIndex = readlineSync.keyInSelect(withdrawChoice, {
          cancel: false,
        });

        switch (withdrawChoice[depoIndex]) {
          case "Fastcash":
            let fastChoices = [500, 1000, 2000, 5000, 10000];
            let fastIndex = readlineSync.keyInSelect(fastChoices.map(String));
            if (!isNaN(fastChoices[fastIndex])) {
              loggedUser.amount -= fastChoices[fastIndex];
              console.log(`New amount: $${loggedUser.amount}`);
            }
            break;
          case "Enter amount":
            let amountToWithdraw = parseInt(
              readlineSync.question("Enter amount to withdraw: ")
            );
            if (
              !isNaN(amountToWithdraw) &&
              amountToWithdraw <= loggedUser.amount
            ) {
              loggedUser.amount -= amountToWithdraw;
              console.log(`New amount: $${loggedUser.amount}`);
            } else if (amountToWithdraw > loggedUser.amount) {
              console.log("You can't withdraw more than your current balance");
            } else {
              console.log("Enter correct value!");
            }
        }
        break;

      case "Logout":
        let choices = ["LogIn", "Exit"];
        let index = readlineSync.keyInSelect(choices);
        if (choices[index] === "LogIn") {
            loggedUser = undefined
          return login();
        } else {
          process.exit(0);
        }
    }
  }
}

login(); 

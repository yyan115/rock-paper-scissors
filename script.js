const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let rounds = 5;

let humanWins = 0;
let robotWins = 0;

let rock = "rock";
let paper = "paper";
let scissors = "scissors";

let choices = [rock, paper, scissors];

function getHumanChoice(input) {
    return new Promise((resolve) => {
        rl.question(input, (answer) => {
            resolve(answer);
        })
    })
}

function getRobotChoice() {

    let rand = Math.random();

    if (rand <= 0.33) {
        return choices[0];
    }
    if (rand > 0.33 && rand <= 0.66) {
        return choices[1]
    }
    else {
        return choices[2];
    }
}

function DetermineOutcome(human, robot) {
    const rules = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    }

    if (human === robot) {
        return "Tied!";
    }
    else if (rules[human] === robot) {
        humanWins++;
        return "Human wins!";
    }

    robotWins++;
    return "Robot wins!";
}

async function main() {

    for (let i = 1; i <= rounds; i++) {

        console.log("=========== Round: " + i + " ===========\n");

        let humanInput;

        while (humanInput = await getHumanChoice("Choose rock paper or scissors.\n"),
            humanInput.toLowerCase() != "rock" && humanInput.toLowerCase() != "paper"
            && humanInput.toLowerCase() != "scissors") {
            console.log("Invalid input. Please type rock paper or scissors.\n");
        }

        humanInput = humanInput.toLowerCase();

        let robotInput = getRobotChoice();

        console.log("You chose: " + humanInput);
        console.log("Robot chose: " + robotInput);

        let result = DetermineOutcome(humanInput, robotInput);

        console.log(result + "\n");
    }

    console.log("=========== END OF GAME. RESULTS ===========\n");

    console.log("Human: " + humanWins + ", Robot: " + robotWins + "\n");

    if (humanWins === robotWins){
        console.log("Tied!\n");    
    }
    else if (humanWins > robotWins){
        console.log("Human wins!\n");
    }
    else {
        console.log("Robot wins!");
    }

    rl.close();
}

main()
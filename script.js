//Module containing gameBoard logic
const gameBoard = (() => {
    
    let playerone = null;
    let playertwo = null;
    let currentTurn = null;

    //Resets the gameboard
    const resetGame = () =>  {

        //Cannot reset game while AI is thinking otherwise the game bugs out
        if(!isAIThinking) {
            //Reset Playermodels
            let playermodel1 = document.querySelector(".playerone");
            let playermodel2 = document.querySelector(".playertwo");
            playermodel1.style = "transform: scale(1.5); filter: invert(53%) sepia(65%) saturate(353%) hue-rotate(128deg) brightness(95%) contrast(82%) drop-shadow(1px 1px 10px cyan)";
            playermodel2.style = "transform: scale(1); filter: invert(96%) sepia(4%) saturate(4%) hue-rotate(214deg) brightness(87%) contrast(81%)";

            //Hide the victorytexts if they are visible after previous game
            victoryone.style.visibility = "hidden";
            victorytwo.style.visibility = "hidden";

            //remove all the markers from the spots
            for(let i = 1; i < 10; i++) {
                let spot = document.getElementById(`${i}`);
                while(spot.firstChild) {
                    spot.removeChild(spot.lastChild);
                }
                if(whoseTurn() == playertwo) {
                    switchTurn();
                }
            }
        }
    }

    //Returns the player whose turn it is
    const whoseTurn = () => {
        return currentTurn;
    }

    //Returns current player two
    const returnPlayerTwo = () => {
        return playertwo;
    }

    //Switch turns
    const switchTurn = () => {

        //Access the svg player models
        let playermodel1 = document.querySelector(".playerone");
        let playermodel2 = document.querySelector(".playertwo");

        //Checks whose turn it was and switch them
        if(currentTurn == playerone) {
            currentTurn = playertwo;
            playermodel1.style = "transform: scale(1); filter: invert(96%) sepia(4%) saturate(4%) hue-rotate(214deg) brightness(87%) contrast(81%)";
            playermodel2.style = "transform: scale(1.5); filter: invert(53%) sepia(65%) saturate(353%) hue-rotate(128deg) brightness(95%) contrast(82%) drop-shadow(1px 1px 10px cyan)";
        }
        else if(currentTurn == playertwo) {
            currentTurn = playerone;
            playermodel2.style = "transform: scale(1); filter: invert(96%) sepia(4%) saturate(4%) hue-rotate(214deg) brightness(87%) contrast(81%)";
            playermodel1.style = "transform: scale(1.5); filter: invert(53%) sepia(65%) saturate(353%) hue-rotate(128deg) brightness(95%) contrast(82%) drop-shadow(1px 1px 10px cyan)";

        }
    }

    //Assign player object as a player
    const assignPlayerOne = (player) => {
        let playermodel1 = document.querySelector(".playerone");
        playermodel1.style = "transform: scale(1.5); filter: invert(53%) sepia(65%) saturate(353%) hue-rotate(128deg) brightness(95%) contrast(82%) drop-shadow(1px 1px 10px cyan)";
        playerone = player;
        currentTurn = playerOne;
    };
    const assignPlayerTwo = (player) => {
        if(currentTurn === playertwo) {
            currentTurn = player;
        }
        playertwo = player;
    };

    //Checks if spot is empty
    const isEmpty = (spot) => {
        const div = document.getElementById(`${spot}`);
        if(div.children.length == 0) {
            return true;
        }
        else {
            return false;
        }
    };

    //Checks if the game is draw
    const isDraw = () => {
        let countMarkers = 0;
        for(let i = 1; i < 10; i++) {
            let spot = document.getElementById(`${i}`);
            countMarkers += spot.children.length;
        }
        if(countMarkers == 9 && someoneWon() == null) {
            return true;
        }
        return false;
    }

    //Checks if someone has won column wise
    const columnWin = () => {
        for(let i = 1; i < 4; i++) {
            let countx = 0;
            let counto = 0;
            for(let j = 0; j < 7; j += 3) {
                let spotNumber = i + j;
                let spot = document.getElementById(`${spotNumber}`);
                if(spot.children.length != 0) {
                    let markerUsed = spot.firstElementChild.getAttribute("class");
                    if(markerUsed == "x") {
                        countx += 1;
                    }
                    else if(markerUsed == "o") {
                     counto += 1;
                    }
                }
            }
            if(countx == 3) {
                return playerone;
            }
            if(counto == 3) {
                return playertwo;
            }
        }
        return null;
    }

    //Checks if someone has won row wise
    const rowWin = () => {
        for(let i = 1; i < 8; i += 3) {
            let countx = 0;
            let counto = 0;
            for(let j = 0; j < 3; j++) {
                let spotNumber = i + j;
                let spot = document.getElementById(`${spotNumber}`);
                if(spot.children.length != 0) {
                    let markerUsed = spot.firstElementChild.getAttribute("class");
                    if(markerUsed == "x") {
                        countx += 1;
                    }
                    else if(markerUsed == "o") {
                     counto += 1;
                    }
                }
            }
            if(countx == 3) {
                return playerone;
            }
            if(counto == 3) {
                return playertwo;
            }
        }
        return null;
    }

    //Checks if someone has won diagonal wise
    const diagonalWin = () =>  {

        ///Check the first diagonal
        let diagonalStart = 1;
        let countx = 0;
        let counto = 0;

        for(let i = 0; i < 9; i += 4) {
            let spotNumber = i + diagonalStart;
            let spot = document.getElementById(`${spotNumber}`);
            if(spot.children.length != 0) {
                let markerUsed = spot.firstElementChild.getAttribute("class");
                if(markerUsed == "x") {
                    countx += 1;
                }
                else if(markerUsed == "o") {
                    counto += 1;
                }
            }
        }
        if(countx == 3) {
            return playerone;
        }
        if(counto == 3) {
            return playertwo;
        }

        //Check the other diagonal
        diagonalStart = 3;
        countx = 0;
        counto = 0;

        for(let i = 0; i < 5; i += 2) {
            let spotNumber = i + diagonalStart;
            let spot = document.getElementById(`${spotNumber}`);
            if(spot.children.length != 0) {
                let markerUsed = spot.firstElementChild.getAttribute("class");
                if(markerUsed == "x") {
                    countx += 1;
                }
                else if(markerUsed == "o") {
                    counto += 1;
                }
            }
        }
        if(countx == 3) {
            return playerone;
        }
        if(counto == 3) {
            return playertwo;
        }
        return null;
    }

    //Check if someone has won
    const someoneWon = () => {
        if(rowWin() != null) {
            return rowWin();
        }
        if(columnWin() != null) {
            return columnWin();
        }
        if(diagonalWin() != null) {
            return diagonalWin();
        }
        return null;
    }

    //Trys to Place marker to that spot
    const placeMarker = (spot, marker) => {
        if(isEmpty(spot)) {
            let placeHere = document.getElementById(`${spot}`);
            let markerImg = document.createElement("img");
            markerImg.setAttribute("src", `./SVG/${marker}.svg`);
            markerImg.classList.add(`${marker}`)
            placeHere.appendChild(markerImg);
        }
    }
    return {
        placeMarker,
        isEmpty,
        assignPlayerOne,
        assignPlayerTwo,
        returnPlayerTwo,
        whoseTurn,
        switchTurn,
        resetGame,
        someoneWon,
        isDraw
    };
})();

//Factory for player
const Player = (playerNumber, marker) => {

    //Returns false everytime
    const isAi = () => false;

    //Gets the current name on the input. If empty returns the placeholder value
    const getCurrentName = function() {
        if(playerNumber == 1) {
            let input = document.querySelector(".playeronename");
            if(input.value == "") {
                return input.getAttribute("placeholder");
            }
            else {
                return input.value;
            }
        }
        else if(playerNumber == 2) {
            let input = document.querySelector(".playertwoname");
            if(input.value == "") {
                return input.getAttribute("placeholder");
            }
            else {
                return input.value;
            }
        }
    };
    return {playerNumber, marker, getCurrentName, isAi};
};

//Factory for AI
const AI = (playerNumber, marker) => {

    //Returns random number between 1-9
    const random = function() {
        return Math.floor(Math.random() * 9) + 1;
    };

    //Returns false everytime
    const isAi = () => true;

    //Tries to place circle until succeeds
    const placeCircle = function() {
        let starterNumber = random();
        while(!gameBoard.isEmpty(starterNumber)) {
            starterNumber = random();
        }
        gameBoard.placeMarker(starterNumber, marker);
        gameBoard.switchTurn();
        isAIThinking = false;
        if(gameBoard.someoneWon() != null) {
            let playermodel1 = document.querySelector(".playerone");
            let playermodel2 = document.querySelector(".playertwo");
            let playerWhoWon = gameBoard.someoneWon();
            if(playerWhoWon == playerOne) {
                let name = playerOne.getCurrentName();
                victoryone.textContent = `${name} has won!`
                victoryone.style.visibility = "visible";
                playermodel1.style = "transform: scale(1.5); filter: invert(74%) sepia(71%) saturate(591%) hue-rotate(359deg) brightness(103%) contrast(104%) drop-shadow(1px 1px 10px goldenrod)";
                playermodel2.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
            }
            if(playerWhoWon == playerTwo) {
                let name = playerTwo.getCurrentName();
                victorytwo.textContent = `${name} has won!`
                victorytwo.style.visibility = "visible";
                playermodel1.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
                playermodel2.style = "transform: scale(1.5); filter: invert(74%) sepia(71%) saturate(591%) hue-rotate(359deg) brightness(103%) contrast(104%) drop-shadow(1px 1px 10px goldenrod)";
            }
            if(playerWhoWon == playerAI) {
                let name = playerAI.getCurrentName();
                victorytwo.textContent = `${name} has won!`
                victorytwo.style.visibility = "visible";
                playermodel1.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
                playermodel2.style = "transform: scale(1.5); filter: invert(74%) sepia(71%) saturate(591%) hue-rotate(359deg) brightness(103%) contrast(104%) drop-shadow(1px 1px 10px goldenrod)";
            }
        }
        if(gameBoard.isDraw()) {
            let playermodel1 = document.querySelector(".playerone");
            let playermodel2 = document.querySelector(".playertwo");
            playermodel2.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
            playermodel1.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"

        }
        
    };

    //AI only has one name
    const getCurrentName = function() {
        return "AI";
    };

    return {playerNumber, marker, getCurrentName, isAi, random, placeCircle};
};

//Create player objects
const playerOne = Player(1, "x");
const playerTwo = Player(2, "o");

//Create AI object. Only possible to play as PlayerTwo
const playerAI = AI(2, "o");

//Assigns the players to the gameBoard
gameBoard.assignPlayerOne(playerOne);
gameBoard.assignPlayerTwo(playerTwo);

//Access reset button
const resetButton = document.querySelector(".reset");

//Event listener for the button to reset the board
resetButton.addEventListener("click", gameBoard.resetGame);

//Access AI ON/OFF button
const aiButton = document.querySelector(".aibutton");

//Event listener for the AI ON/OFF button
aiButton.addEventListener("click", ()=>{
    if(!isAIThinking) {
        let currentPlayerTwo = gameBoard.returnPlayerTwo();
        if(currentPlayerTwo.isAi()) {
            aiButton.style = "box-shadow: 1px 1px 20px red";
            gameBoard.assignPlayerTwo(playerTwo);
        }
        else {
            aiButton.style = "box-shadow: 1px 1px 20px green";
            gameBoard.assignPlayerTwo(playerAI);
        }
        //Make AI play immediatelly if it is its turn
        if(gameBoard.whoseTurn().isAi() && gameBoard.someoneWon() == null && !gameBoard.isDraw()) {
            isAIThinking = true;
            setTimeout(() => {gameBoard.whoseTurn().placeCircle(); }, 2000);
        }
    }
})


//Access victory texts
const victoryone = document.querySelector(".victoryone");
const victorytwo = document.querySelector(".victorytwo");

//Hide victory texts intially
victoryone.style.visibility = "hidden";
victorytwo.style.visibility = "hidden";

//Tells if AI is thinking. Not actually thinking. Just added delay.
let isAIThinking = false;

//Add eventlisteners for all of the spots
for(let i = 1; i < 10; i++) {
    let spot = document.getElementById(`${i}`);
    spot.addEventListener("click", ()=>{
        if(gameBoard.isEmpty(i) && gameBoard.someoneWon() == null && !isAIThinking) {
            let placer = gameBoard.whoseTurn();
            gameBoard.placeMarker(i, placer.marker);
            gameBoard.switchTurn();
            //Make AI play if it is turned on
            if(gameBoard.whoseTurn().isAi() && gameBoard.someoneWon() == null && !gameBoard.isDraw()) {
                isAIThinking = true;
                setTimeout(() => {gameBoard.whoseTurn().placeCircle(); }, 2000);
            }
            if(gameBoard.someoneWon() != null) {
                let playermodel1 = document.querySelector(".playerone");
                let playermodel2 = document.querySelector(".playertwo");
                let playerWhoWon = gameBoard.someoneWon();
                if(playerWhoWon == playerOne) {
                    let name = playerOne.getCurrentName();
                    victoryone.textContent = `${name} has won!`
                    victoryone.style.visibility = "visible";
                    playermodel1.style = "transform: scale(1.5); filter: invert(74%) sepia(71%) saturate(591%) hue-rotate(359deg) brightness(103%) contrast(104%) drop-shadow(1px 1px 10px goldenrod)";
                    playermodel2.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
                }
                if(playerWhoWon == playerTwo) {
                    let name = playerTwo.getCurrentName();
                    victorytwo.textContent = `${name} has won!`
                    victorytwo.style.visibility = "visible";
                    playermodel1.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
                    playermodel2.style = "transform: scale(1.5); filter: invert(74%) sepia(71%) saturate(591%) hue-rotate(359deg) brightness(103%) contrast(104%) drop-shadow(1px 1px 10px goldenrod)";
                }
                if(playerWhoWon == playerAI) {
                    let name = playerAI.getCurrentName();
                    victorytwo.textContent = `${name} has won!`
                    victorytwo.style.visibility = "visible";
                    playermodel1.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
                    playermodel2.style = "transform: scale(1.5); filter: invert(74%) sepia(71%) saturate(591%) hue-rotate(359deg) brightness(103%) contrast(104%) drop-shadow(1px 1px 10px goldenrod)";
                }
            }
            if(gameBoard.isDraw()) {
                let playermodel1 = document.querySelector(".playerone");
                let playermodel2 = document.querySelector(".playertwo");
                playermodel2.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"
                playermodel1.style = "transform: scale(1); filter: invert(31%) sepia(93%) saturate(7453%) hue-rotate(356deg) brightness(99%) contrast(124%) drop-shadow(1px 1px 10px red)"

            }
        }
    })
}
//Module containing gameBoard logic
const gameBoard = (() => {
    
    let playerone = null;
    let playertwo = null;
    let currentTurn = null;

    //Returns the player whose turn it is
    const whoseTurn = () => {
        return currentTurn;
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

    //Trys to Place marker to that spot
    const placeMarker = (spot, marker) => {
        if(isEmpty(spot)) {
            let placeHere = document.getElementById(`${spot}`);
            let markerImg = document.createElement("img");
            markerImg.setAttribute("src", `./SVG/${marker}.svg`);
            placeHere.appendChild(markerImg);
        }
    }
    return {
        placeMarker,
        isEmpty,
        assignPlayerOne,
        assignPlayerTwo,
        whoseTurn,
        switchTurn
    };
})();

//Factory for player
const Player = (playerNumber, marker) => {
    //Gets the current name on the input. If empty returns the placeholder value
    const getCurrentName = function() {
        if(playerNumber == 1) {
            let input = document.querySelector(".playeronename");
            if(input.textContent == "") {
                return input.getAttribute("placeholder");
            }
            else {
                return input.textContent;
            }
        }
        else if(playerNumber == 2) {
            let input = document.querySelector(".playertwoname");
            if(input.textContent == "") {
                return input.getAttribute("placeholder");
            }
            else {
                return input.textContent;
            }
        }
    };
    return {playerNumber, marker, getCurrentName};
};

//Create player objects
const playerOne = Player(1, "x");
const playerTwo = Player(2, "o");

//Assigns the players to the gameBoard
gameBoard.assignPlayerOne(playerOne);
gameBoard.assignPlayerTwo(playerTwo);

//Add eventlisteners for all of the spots
for(let i = 1; i < 10; i++) {
    let spot = document.getElementById(`${i}`);
    spot.addEventListener("click", ()=>{
        if(gameBoard.isEmpty(i)) {
            let placer = gameBoard.whoseTurn();
            gameBoard.placeMarker(i, placer.marker);
            gameBoard.switchTurn();
        }
    })
}
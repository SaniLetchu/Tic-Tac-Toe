//Module containing gameBoard logic
const gameBoard = (() => {

    //Checks if spot is empty
    const isEmpty = (spot) => {
        
    };

    //Trys to Place marker to that spot
    const placeMarker = (spot, marker) => {
        let placeHere = document.getElementById(`${spot}`);
        let markerImg = document.createElement("img");
        markerImg.setAttribute("src", `./SVG/${marker}.svg`);
        placeHere.appendChild(markerImg);
    }
    return {
        placeMarker,
        isEmpty
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

gameBoard.placeMarker(1, "x");
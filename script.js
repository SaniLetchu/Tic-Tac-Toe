//Module containing gameBoard logic
const gameBoard = (() => {
    const placeMarker = (spot, marker) => {
        let placeHere = document.getElementById(`${spot}`);
        let markerImg = document.createElement("img");
        markerImg.setAttribute("src", `./SVG/${marker}.svg`);
        placeHere.appendChild(markerImg);
    }
    return {
        placeMarker
    };
})();

gameBoard.placeMarker(1, "x");
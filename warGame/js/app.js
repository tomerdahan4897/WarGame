import { CardPacket, cp } from "./cardsPacket.js";
import { User } from "./user.js";
const startBtn = document.getElementById("startBtn");
const infoP = document.getElementById("infoP");
const takeCardBtnUser1 = document.getElementById("takeCardBtnUser1");
const takeCardBtnUser2 = document.getElementById("takeCardBtnUser2");
const card1Div = document.getElementById("card1Div");
const card2Div = document.getElementById("card2Div");
const user1div = document.getElementById("user1div");
const user2div = document.getElementById("user2div");
let user1points = document.getElementById("user1points");
let user2points = document.getElementById("user2points");
let user1sumOfCards = document.getElementById("user1sumOfCards");
let user2sumOfCards = document.getElementById("user2sumOfCards");
const winnerDiv = document.getElementById("winnerDiv");
const restartBtn = document.getElementById("restartBtn");
let cardsArray = cp.createAPacket();
console.log(cardsArray);
const user1 = new User();
const user2 = new User();
const user1cards = [];
const user2cards = [];
startBtn.addEventListener("click", () => {
    startBtn.classList.add("hide");
    takeCardBtnUser1.classList.remove("hide");
    takeCardBtnUser2.classList.remove("hide");
    infoP.classList.remove("hide");
});
let card1img;
let card2img;
function createUser1Card(arr) {
    card1Div.innerHTML = "";
    card1img = document.createElement("img");
    card1img.src = arr[currentCard].img;
    card1Div.appendChild(card1img);
}
function createUser2Card(arr) {
    card2Div.innerHTML = "";
    card2img = document.createElement("img");
    card2img.src = cardsArray[currentCard + 1].img;
    card2Div.appendChild(card2img);
}
let firstButtonClicked = false;
let secondButtonClicked = false;
takeCardBtnUser1.addEventListener("click", () => {
    createUser1Card(cardsArray);
    firstButtonClicked = true;
    if (firstButtonClicked && secondButtonClicked) {
        activeGame();
    }
});
takeCardBtnUser2.addEventListener("click", () => {
    createUser2Card(cardsArray);
    secondButtonClicked = true;
    if (firstButtonClicked && secondButtonClicked) {
        activeGame();
    }
});
function activeGame() {
    firstButtonClicked = false;
    secondButtonClicked = false;
    checkWhosWin();
}
let currentCard = 0;
function checkWhosWin() {
    if (cardsArray.length <= 52) {
        //change the position if the cards are equals
        if (cardsArray[currentCard].num === cardsArray[currentCard + 1].num) {
            currentCard += 2;
            setTimeout(() => {
                createUser1Card(cardsArray);
                createUser2Card(cardsArray);
            }, 500);
            return;
        }
        if (cardsArray[currentCard].num > cardsArray[currentCard + 1].num) {
            for (let i = 0; i <= currentCard + 1 && currentCard + 1 <= cardsArray.length; i++) {
                user1cards.push(cardsArray.shift());
            }
            user1Win();
            user1WinDesign();
        }
        else {
            for (let i = 0; i <= currentCard + 1 && currentCard + 1 <= cardsArray.length; i++) {
                user2cards.push(cardsArray.shift());
            }
            user2Win();
            user2WinDesign();
        }
        infoP.innerHTML = `There are ${cardsArray.length} cards in the packet`;
        currentCard = 0;
        console.log("the big arr length is: " + cardsArray.length);
    }
    if (cardsArray.length === 0) {
        infoP.innerHTML =
            "The packet is empty! Each player enter about his card for compete";
        takeCardBtnUser1.classList.add("hide");
        takeCardBtnUser2.classList.add("hide");
        backCradImgUser1.disabled = false;
        backCradImgUser2.disabled = false;
        backCradImgUser1.classList.add("activeBackCardImg");
        backCradImgUser2.classList.add("activeBackCardImg");
    }
    setTimeout(() => {
        card1img.remove();
        card2img.remove();
    }, 2500);
}
//create back cards images
const backCradImgUser1 = document.createElement("button");
backCradImgUser1.classList.add("backCardImg1");
const backImg1 = document.createElement("img");
backImg1.src = cardsArray[0].backImg;
backCradImgUser1.appendChild(backImg1);
backCradImgUser1.disabled = true;
const backCradImgUser2 = document.createElement("button");
backCradImgUser2.classList.add("backCardImg2");
const backImg2 = document.createElement("img");
backImg2.src = cardsArray[0].backImg;
backCradImgUser2.appendChild(backImg2);
backCradImgUser2.disabled = true;
function user1Win() {
    user1.win(); //+1 pts
    user1sumOfCards.innerHTML = `Total Cards: ${user1cards.length}`;
    console.log("U1 pts: " + user1.points);
    console.log("U1 arr: " + user1cards);
}
function user1WinDesign() {
    user1div.classList.add("win"); //green color on the box
    setTimeout(() => {
        user1div.classList.remove("win");
    }, 750); //remove green color on the box after 0.5s
    user1points.innerHTML = "Points: " + String(user1.points);
    card1img.classList.add("goLeft");
    card2img.classList.add("goLeft");
    setTimeout(() => {
        user1div.appendChild(backCradImgUser1);
    }, 2500); //set the backCardImg
}
function user2Win() {
    user2.win();
    user2sumOfCards.innerHTML = `Total Cards: ${user2cards.length}`;
    console.log("U2 pts: " + user2.points);
    console.log("U2 arr: " + user2cards);
}
function user2WinDesign() {
    user2div.classList.add("win"); //green color on the box
    setTimeout(() => {
        user2div.classList.remove("win");
    }, 750); //remove green color on the box after 0.5s
    user2points.innerHTML = "Points: " + String(user2.points);
    card1img.classList.add("goRight");
    card2img.classList.add("goRight");
    setTimeout(() => {
        user2div.appendChild(backCradImgUser2);
    }, 2500); //set the backCardImg
}
//after the pocket is empty:
let firstUserClicked = false;
let secondUserClicked = false;
backCradImgUser1.addEventListener("click", () => {
    PutFromUser1Pocket();
    firstUserClicked = true;
    if (firstUserClicked && secondUserClicked) {
        activeRestGame();
    }
});
backCradImgUser2.addEventListener("click", () => {
    PutFromUser2Pocket();
    secondUserClicked = true;
    if (firstUserClicked && secondUserClicked) {
        activeRestGame();
    }
});
function activeRestGame() {
    firstUserClicked = false;
    secondUserClicked = false;
    continueGameOneVSOne();
}
currentCard = 0;
function continueGameOneVSOne() {
    if (user1cards.length - 1 > 0 && user2cards.length - 1 > 0) {
        if (user1cards[currentCard].num === user2cards[currentCard].num) {
            currentCard += 1;
            setTimeout(() => {
                createUser1Card(user1cards);
                createUser2Card(user2cards);
            }, 500);
            return;
        }
        if (user1cards[currentCard].num > user2cards[currentCard].num) {
            for (let i = 0; i <= currentCard && currentCard + 1 <= user1cards.length; i++) {
                user1cards.push(user2cards.shift());
            }
            user1Win();
            user1WinDesign();
            user2sumOfCards.innerHTML = `Total Cards: ${user2cards.length}`;
        }
        else {
            for (let i = 0; i <= currentCard && currentCard + 1 <= user2cards.length; i++) {
                user2cards.push(user1cards.shift());
            }
            user2Win();
            user2WinDesign();
            user1sumOfCards.innerHTML = `Total Cards: ${user1cards.length}`;
        }
        CardPacket.shufflePocket(user1cards);
        CardPacket.shufflePocket(user2cards);
        setTimeout(() => {
            card1img.remove();
            card2img.remove();
        }, 2500);
        currentCard = 0;
    }
    else {
        if (user1.points > user2.points) {
            winnerDiv.innerHTML = `<h2>Game Over</h2>
                              <p> The Winner Is: <span>User 1</span> <br>
                                Points: ${user1.points}. </br>
                                User 2 Points: ${user2.points}</p>
                              <div id="restartBtn" class="btn">Restart Game</div>`;
        }
        else {
            winnerDiv.innerHTML = `<h2>Game Over</h2>
                              <p> The Winner Is: <span>User 2</span> <br>
                                  Points: ${user2.points}. </br>
                                  User 1 Points: ${user1.points}</p>
                              <div id="restartBtn" class="btn">Restart Game</div>`;
        }
        winnerDiv.classList.remove("hide");
        restartBtn.addEventListener("click", () => {
            winnerDiv.innerHTML = "";
            winnerDiv.classList.add("hide");
            window.location.reload();
        });
    }
}
function PutFromUser1Pocket() {
    card1Div.innerHTML = "";
    card1img = document.createElement("img");
    card1img.src = user1cards[0].img;
    card1Div.appendChild(card1img);
}
function PutFromUser2Pocket() {
    card2Div.innerHTML = "";
    card2img = document.createElement("img");
    card2img.src = user2cards[0].img;
    card2Div.appendChild(card2img);
}

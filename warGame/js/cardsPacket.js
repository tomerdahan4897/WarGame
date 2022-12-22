import { Card } from "./card.js";
export class CardPacket {
    cardsPacketArray = [];
    addCard(card) {
        this.cardsPacketArray.push(card);
    }
    createAPacket() {
        const signOfCard = ["hearts", "spades", "clubs", "diamonds"];
        let counter = 0;
        while (this.cardsPacketArray.length < 52) {
            const randomForNum = Math.floor(Math.random() * (15 - 2) + 2); //random num between 2-14
            const randomForsign = Math.floor(Math.random() * (4 - 0)); //random num between 0-3
            const newCard = new Card(randomForNum, signOfCard[randomForsign], `${randomForNum}_of_${signOfCard[randomForsign]}`);
            if (this.cardsPacketArray.find((v) => v.img === newCard.img)) {
                counter++;
            }
            else {
                this.addCard(newCard);
            }
        }
        console.log("there were:" + counter + " attemps to create the packet.");
        return this.cardsPacketArray;
    }
    static shufflePocket(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }
}
export const cp = new CardPacket();

export class Card {
    num;
    sign;
    img;
    backImg = "/images/playingCards/Card_Back.png";
    constructor(num, sign, img) {
        this.num = num;
        this.sign = sign;
        this.img = `images/playingCards/${img}.png`;
    }
}

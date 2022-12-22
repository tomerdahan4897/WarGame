export class Card {
    num: number;
    sign: string;
    img: string;
    backImg = "/images/playingCards/Card_Back.png";
    constructor(num: number, sign: string, img: string) {
        this.num = num;
        this.sign = sign;
        this.img = `images/playingCards/${img}.png`;
    }
}
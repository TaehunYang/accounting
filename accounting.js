const startDay = "20230101";
const middleDay = parseInt(startDay.substring(0, 4)) + "1231";
const middleDay2 = parseInt(startDay.substring(0, 4)) + 1 + "1231";
const endDay = "20251231";
const eir = 0.12;
const eir2 = eir + 1;
const dir = 0.1;
const securities = 1000000;
const interest = securities * dir;

const presentValue = Math.trunc(
  interest / eir2 +
    interest / eir2 / eir2 +
    (interest + securities) / eir2 / eir2 / eir2
);
const discount = securities - presentValue;

console.log("기초", startDay);
console.log(middleDay);
console.log(middleDay2);
console.log("기말", endDay);
console.log("이자", interest);
console.log("현재가치", presentValue);
console.log("현할차", discount);

/**
 * 711,780
 * 240,100
 * 2.401
 *              10%        12%     현할차       채권
 * 20230101                                 951,880 , 48,120
 * 20231231 100,000     114,226  14,226     966,106
 * 20241231 100,000     115,226  15,932     982,038
 * 20251231 100,000     117,844  17,962     1,000,000
 *
 * **/

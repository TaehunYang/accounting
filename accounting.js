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
 *                          10%                eir 12%     현할차       채권
 * startDay:20230101                                             presentValue: 951,880 , discount: 48,120
 * middleDay:20231231   interest:100,000     114,226  14,226     966,106
 * middleDay2:20241231  interest:100,000     115,226  15,932     982,038
 * endDay:20251231      interest:100,000     117,844  17,962     securities: 1,000,000
 *
 * **/

const amortization = [
  {
    day: startDay,
    interest1: "",
    interest2: "",
    discount: "",
    Value: presentValue,
  },
  {
    day: middleDay,
    interest1: interest,
    interest2: Math.trunc(presentValue * eir),
    discount: Math.trunc(presentValue * eir) - interest,
    Value: presentValue + (Math.trunc(presentValue * eir) - interest),
  },
  {
    day: middleDay2,
    interest1: interest,
    interest2: Math.trunc(
      (presentValue + (Math.trunc(presentValue * eir) - interest)) * eir
    ),
    discount:
      Math.trunc(
        (presentValue + (Math.trunc(presentValue * eir) - interest)) * eir
      ) - interest,
    Value:
      presentValue +
      (Math.trunc(presentValue * eir) - interest) +
      (Math.trunc(
        (presentValue + (Math.trunc(presentValue * eir) - interest)) * eir
      ) -
        interest),
  },
  {
    day: endDay,
    interest1: interest,
    interest2:
      interest +
      (securities -
        (presentValue +
          (Math.trunc(presentValue * eir) - interest) +
          (Math.trunc(
            (presentValue + (Math.trunc(presentValue * eir) - interest)) * eir
          ) -
            interest))),
    discount:
      securities -
      (presentValue +
        (Math.trunc(presentValue * eir) - interest) +
        (Math.trunc(
          (presentValue + (Math.trunc(presentValue * eir) - interest)) * eir
        ) -
          interest)),
    Value: securities,
  },
];

console.table(amortization);

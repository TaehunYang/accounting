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

const amortization = [
  {
    day: startDay,
    interest1: "",
    interest2: "",
    discount: "",
    value: presentValue,
  },
  {
    day: middleDay,
    interest1: interest,
    interest2: Math.trunc(presentValue * eir),
    discount: Math.trunc(presentValue * eir) - interest,
    value: presentValue + (Math.trunc(presentValue * eir) - interest),
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
    value:
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
    value: securities,
  },
];

console.table(amortization);
const outputTable = document.getElementById("output");

amortization.forEach((amortization) => {
  const row = outputTable.insertRow();
  row.insertCell().textContent = amortization.day;
  row.insertCell().textContent = amortization.interest1;
  row.insertCell().textContent = amortization.interest2;
  row.insertCell().textContent = amortization.discount;
  row.insertCell().textContent = amortization.value;
});

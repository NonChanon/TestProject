export const validEmail = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$");

export const validId = new RegExp("^[0-9]{13}$");

export const validPostalCode = new RegExp("^[0-9]{5}$");

export const validLetter = new RegExp("^[a-zA-Z]+$");

export const validLetterAndSpace = new RegExp("^[a-zA-Z0-9 ]*$");

export const validNumber = new RegExp("^[0-9]+$");

export const validContractNumber = new RegExp("^[a-zA-Z]{2}[0-9]{5}$");

console.log(validLetter.test("Jirakan"));

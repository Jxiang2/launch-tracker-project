/**
 * TypeScript practices learned and used in this project
 * credit to https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI
 */

// arrays
let characters: string[] = [];
characters.push('hello');
characters.push('world');
console.log('characters: ', characters);


// unions for multi-type variables
let mixed: (string | number)[] = [];
mixed.push('hello');
mixed.push(20);
console.log('mixed:', mixed);

let uid: string | number;
uid = 13;
console.log(uid);
uid = '12345';
console.log(uid);

// objects, the properties can not be changed once defined
let ninjaOne: {
    name: string,
    age: number,
    belt: string;
};
ninjaOne = { name: 'xjy', age: 22, belt: 'black' };
console.log(ninjaOne);


// functions & type aliases (the first two lines)
type StringOrNum = string | number;
type objWithNameUID = { name: string, uid: StringOrNum; };

let greet: (user: objWithNameUID) => void;
let add: (a: number, b: number) => void;
let minus: (a: number, b: number) => number;

greet = (user: objWithNameUID): void => {
    console.log(`${user.name} | ${user.uid}`);
};

greet({ name: 'xjy', uid: 1537572 });


add = (a: number, b: number, c: number | string = 20): void => {
    console.log(a + b + Number(c));
};

add(5, 10);

minus = (a: number, b: number): number => {
    return a - b;
};

let result = minus(10, 7);
console.log(result);


// interface: a blueprint
interface IsPerson {
    name: string;
    age: number;
    speak (a: string): void;
    spend (a: number): number;
}

const me: IsPerson = {
    name: 'xjy',
    age: 30,
    speak (text: string) {
        console.log(text);
    },
    spend (amount: number) {
        console.log('I spent', amount);
        return amount;
    }
};
const greetperson = (person: IsPerson) => {
    console.log('hello', person.name);
};

greetperson(me);


// generics
// capture whatever item we pass in the function
// I need to pass a object with a property called name
const addUID = <T extends { name: string; }> (obj: T) => {
    let uid = Math.floor(Math.random() * 100);
    return { ...obj, uid };
};

let docOne = addUID({ name: 'yoshi', age: 40 });
console.log(docOne.age);


// generics
// specify the type of input when calling a generic function
const printAny = <T, U> (state: T, name: U) => {
    console.log(state);
};

printAny<string, string>("hello", "me");
printAny<number, string>(1, "me");


// generics
// make an interface field flexible
// the data property can be any data type
interface Resource<T> {
    uid: number;
    resourceName: string;
    data: T;
}

const docThree: Resource<String> = {
    uid: 12345,
    resourceName: 'person',
    data: 'string data'
};

const docFour: Resource<string[]> = {
    uid: 12345,
    resourceName: 'person',
    data: ['string data 1', 'string data 2']
};

console.log(docThree);
console.log(docFour);


// enums : 0, 1, ,2, 3, 4
enum ResourceType { BOOK, AUTHOR, FILM, DIRECTOR, PERSON }
console.log(ResourceType.AUTHOR);
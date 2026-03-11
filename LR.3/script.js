function task1() {
    let a = 0, b = 1;
    let count = 0;
    let sum = 0;

    while (count < 10) {
        sum += a;
        let next = a + b;
        a = b;
        b = next;
        count++;
    }

    console.log("Завдання 1:", sum);
}

task1();

function task2() {
    let sum=0;

    for (let i = 2; i <= 1000; i++) {
        let isPrime = true;

        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) sum += i;
    }

    console.log("Завдання 2:", sum);
}

task2();

function task3() {
    let dayNumber = Number(prompt("Введіть число від 1 до 7:"));
    let day;

    switch (dayNumber) {
        case 1: day = "Понеділок"; break;
        case 2: day = "Вівторок"; break;
        case 3: day = "Середа"; break;
        case 4: day = "Четвер"; break;
        case 5: day = "П’ятниця"; break;
        case 6: day = "Субота"; break;
        case 7: day = "Неділя"; break;
        default: day = "Невірне число";
    }

    console.log("Завдання 3:", day);
}

task3();

function task4(arr) {
    let result = [];

    for (let str of arr) {
        if (str.length % 2 !== 0) {
            result.push(str);
        }
    }

    console.log("Завдання 4:", result);
    return result;
}

task4(["hello", "hi", "world", "JS", "coding"]);

const task5 = (numbers) => {
    let result = numbers.map(num => num + 1);

    console.log("Завдання 5:", result);
    return result;
};

task5([1, 2, 3, 4, 5]);

function task6(a, b) {
    let result = (a + b === 10) || (Math.abs(a - b) === 10);

    console.log("Завдання 6:", result);
    return result;
}

task6(7, 3);
task6(20, 10);
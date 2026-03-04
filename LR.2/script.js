//1. Оператори порівняння:
function findMinMax(arr) {
    if (arr.length === 0) {
        return "Масив порожній";
    }

    let min = arr[0];
    let max = arr[0];

    for (let num of arr) {
        if (num < min) {
            min = num;
        }

        if (num > max) {
            max = num;
        }
    }

    return { min, max };
}

console.log(findMinMax([5, 2, 9, 1, 7]));


function compareObjects(obj1, obj2) {
    if (obj1.name === obj2.name && obj1.age === obj2.age) {
        return "Об'єкти однакові";
    } else {
        return "Об'єкти різні";
    }
}

const person1 = { name: "Anna", age: 20 };
const person2 = { name: "Anna", age: 20 };

console.log(compareObjects(person1, person2));


//2. Логічні оператори:
function isInRange(number, min, max) {
    return number >= min && number <= max;
}

console.log(isInRange(7, 1, 10));


let isActive = true;

isActive = !isActive;

console.log(isActive);


function getGradeText(grade) {
    if (grade >= 90) {
        return "Відмінно";
    } else if (grade >= 75) {
        return "Добре";
    } else if (grade >= 60) {
        return "Задовільно";
    } else {
        return "Незадовільно";
    }
}

console.log(getGradeText(82));


//3. Умовні розгалуження
function getGradeTextTernary(grade) {
    return grade >= 90 ? "Відмінно" :
           grade >= 75 ? "Добре" :
           grade >= 60 ? "Задовільно" :
           "Незадовільно";
}

console.log(getGradeTextTernary(82));


function getSeason(month) {
    if (month >= 1 && month <= 12) {

        if (month === 12 || month <= 2) {
            return "Зима";
        } else if (month <= 5) {
            return "Весна";
        } else if (month <= 8) {
            return "Літо";
        } else {
            return "Осінь";
        }

    } else {
        return "Неправильний місяць";
    }
}

console.log(getSeason(4));


function getSeasonTernary(month) {
    return (month < 1 || month > 12) ? "Неправильний місяць" :
           (month === 12 || month <= 2) ? "Зима" :
           (month <= 5) ? "Весна" :
           (month <= 8) ? "Літо" :
           "Осінь";
}

console.log(getSeasonTernary(4));
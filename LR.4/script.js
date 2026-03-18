function task1() {
    console.log("=== Завдання 1 ===");

    let fruits = ["яблуко", "банан", "груша", "апельсин"];

    fruits.pop();
    console.log("Після видалення:", fruits);

    fruits.unshift("ананас");

    fruits.sort().reverse();
    console.log("Відсортований масив:", fruits);

    let index = fruits.indexOf("яблуко");
    console.log("Індекс 'яблуко':", index);
}

function task2() {
    console.log("=== Завдання 2 ===");

    let colors = ["червоний", "синій", "зелений", "темно-синій", "жовтий"];

    let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);

    console.log("Найдовший:", longest);
    console.log("Найкоротший:", shortest);

    let filtered = colors.filter(c => c.includes("синій"));

    let result = filtered.join(", ");
    console.log("Об'єднаний рядок:", result);
}

function task3() {
    console.log("=== Завдання 3 ===");

    let employees = [
        { name: "Іван", age: 25, position: "розробник" },
        { name: "Марія", age: 30, position: "дизайнер" },
        { name: "Олег", age: 28, position: "розробник" }
    ];

    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Відсортовано:", employees);

    let developers = employees.filter(e => e.position === "розробник");
    console.log("Розробники:", developers);

    employees = employees.filter(e => e.age <= 28);

    employees.push({ name: "Анна", age: 22, position: "тестувальник" });

    console.log("Оновлений список:", employees);
}

function task4() {
    console.log("=== Завдання 4 ===");

    let students = [
        { name: "Олексій", age: 20, course: 2 },
        { name: "Ірина", age: 22, course: 3 },
        { name: "Максим", age: 19, course: 1 }
    ];

    students = students.filter(s => s.name !== "Олексій");

    students.push({ name: "Софія", age: 21, course: 4 });

    students.sort((a, b) => b.age - a.age);

    let thirdCourse = students.find(s => s.course === 3);

    console.log("Студенти:", students);
    console.log("Студент 3 курсу:", thirdCourse);
}

function task5() {
    console.log("=== Завдання 5 ===");

    let numbers = [1, 2, 3, 4, 5];

    let squares = numbers.map(n => n ** 2);
    console.log("Квадрати:", squares);

    let even = numbers.filter(n => n % 2 === 0);
    console.log("Парні:", even);

    let sum = numbers.reduce((acc, n) => acc + n, 0);
    console.log("Сума:", sum);

    let extra = [6, 7, 8, 9, 10];
    numbers = numbers.concat(extra);

    numbers.splice(0, 3);

    console.log("Оновлений масив:", numbers);
}

function libraryManagement() {
    console.log("=== Завдання 6 ===");

    let books = [
        { title: "1984", author: "Орвелл", genre: "антиутопія", pages: 320, isAvailable: true },
        { title: "Кобзар", author: "Шевченко", genre: "поезія", pages: 250, isAvailable: true }
    ];

    function addBook(title, author, genre, pages) {
        books.push({ title, author, genre, pages, isAvailable: true });
    }

    function removeBook(title) {
        books = books.filter(b => b.title !== title);
    }

    function findBooksByAuthor(author) {
        return books.filter(b => b.author === author);
    }

    function toggleBookAvailability(title, isBorrowed) {
        let book = books.find(b => b.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        let total = books.length;
        let available = books.filter(b => b.isAvailable).length;
        let borrowed = total - available;
        let avgPages =
            books.reduce((sum, b) => sum + b.pages, 0) / total;

        return {
            totalBooks: total,
            availableBooks: available,
            borrowedBooks: borrowed,
            averagePages: avgPages
        };
    }

    addBook("Harry Potter", "Роулінг", "фентезі", 500);
    toggleBookAvailability("1984", true);
    sortBooksByPages();

    console.log("Книги:", books);
    console.log("Книги автора Шевченко:", findBooksByAuthor("Шевченко"));
    console.log("Статистика:", getBooksStatistics());
}

function task7() {
    console.log("=== Завдання 7 ===");

    let student = {
        name: "Андрій",
        age: 20,
        course: 2
    };

    student.subjects = ["Математика", "Програмування", "Англійська"];

    delete student.age;

    console.log("Оновлений об'єкт:", student);
}

task1();
task2();
task3();
task4();
task5();
libraryManagement();
task7();
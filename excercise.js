const car1 = {
    manufactureYear: 2019,
    color: "cyan",
    brand: "toyota",
}

const updateCar = (year) => {
    car1.manufactureYear = year;
}

updateCar(2023)

console.log(car1)

// Class constructor revision

class Car {
    constructor(manufactureYear, color) {
        this.manufactureYear = manufactureYear;
        this.color = color;
    }

    toString() {
        return `Car { manufactureYear: ${this.manufactureYear}, color: ${this.color} }`;
    }
}

const car2 = new Car(2019, "red");

console.log(`This is car2, ${car2}`);
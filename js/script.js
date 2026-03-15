class EnergyBowl {
    constructor(name, email, phone, size, base, protein, toppings, cheese, sauce, specialInstructions) {
        this.orderNumber = this.generateOrderNumber();
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.size = size;
        this.base = base;
        this.protein = protein;
        this.toppings = toppings;
        this.chesse = cheese;
        this.sauce = sauce;
        this.specialInstructions = specialInstructions;
    }

    generateOrderNumber() {
        return Math.floor(10000 + Math.random() * 90000);
    }

    formatText(value) {
        return value
            .replace(/_/g, " ")
            .replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
    }

    


}
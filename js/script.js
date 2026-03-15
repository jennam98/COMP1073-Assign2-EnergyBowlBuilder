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
        this.cheese = cheese;
        this.sauce = sauce;
        this.specialInstructions = specialInstructions;
    }

    
}


document.getElementById("energyBowlForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    

});
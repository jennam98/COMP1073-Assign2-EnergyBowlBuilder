
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
    
    // Collect form data

    //User info

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    //Bowl Info

    const size = document.getElementById("size").value;
    const base = document.getElementById("base").value;
    const protein = document.getElementById("protein").value;

    const toppingCheckboxes = document.querySelectorAll('input[name="toppings"]:checked');
    const toppings = [];


    const cheese = document.getElementById("cheese").value;
    const sauce = document.getElementById("sauce").value;
    const specialInstructions = document.getElementById("specialInstructions").value.trim();

    toppingCheckboxes.forEach(function(topping) {
        toppings.push(topping.value);


    //Error message 
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "";

    });


    // Validate form data
    if (!name || !email || !phone || !size || !base || !protein) {
        errorMessage.textContent = "Please fill in all required fields.";
        return;
    }

});
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

document.getElementById("energyBowlForm").addEventListener("submit", function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const size = document.getElementById("size").value;
    const base = document.getElementById("base").value;
    const protein = document.getElementById("protein").value;
    const cheese = document.getElementById("cheese").value;
    const sauce = document.getElementById("sauce").value;
    const specialInstructions = document.getElementById("special_instructions").value;

    const toppingCheckboxes = document.querySelectorAll('input[name="toppings"]:checked');
    let toppings = [];

    toppingCheckboxes.forEach(function(topping){
        toppings.push(topping.value);
    });

    const bowl = new EnergyBowl(name,email,phone,size,base,protein,toppings,
        cheese,sauce,specialInstructions);
    
    const output = document.getElementById("output");

    output.innerHTML = `
        <h3>Order Confirmation</h3>
        <p><strong>Order Number:</strong> ${bowl.orderNumber}</p>
        <p><strong>Name:</strong> ${bowl.name}</p>
        <p><strong>Email:</strong> ${bowl.email}</p>
        <p><strong>Phone:</strong> ${bowl.phone}</p>
        <p><strong>Size:</strong> ${bowl.formatText(bowl.size)}</p>
        <p><strong>Base:</strong> ${bowl.formatText(bowl.base)}</p>
        <p><strong>Protein:</strong> ${bowl.formatText(bowl.protein)}</p>
        <p><strong>Toppings:</strong> ${bowl.toppings.length > 0 ? bowl.toppings.map(t => bowl.formatText(t)).join(", ") : "None"}</p>
        <p><strong>Cheese:</strong> ${bowl.formatText(bowl.cheese)}</p>
        <p><strong>Sauce:</strong> ${bowl.formatText(bowl.sauce)}</p>
        <p><strong>Special Instructions:</strong> ${bowl.specialInstructions ? bowl.specialInstructions : "None"}</p>`;
    });

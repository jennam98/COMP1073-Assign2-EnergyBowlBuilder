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

    getBowlEmoji(){
        if (this.base === "mixed_greens"){
            return "🥗";
        }
        if (this.protein === "salmon"){
            return "🍣";
        }
        if (this.protein === "beef"){
            return "🥩";
        }
        if (this.protein === "chicken"){
            return "🍗";
        }
        if (this.protein === "tofu"){
            return "🥬";
        }
        return "🥣";
    }

    calculatePrice(){
        let total = 0;

        if (this.size === "regular"){
            total += 9.99;    
        } else if (this.size === "large"){
            total += 12.99;
        }

        if (this.protein === "chicken" || this.protein === "tofu"){
            total += 2.0;
        } else if (this.protein === "beef" || this.protein === "salmon"){
            total += 3.0;
        }

        total += this.toppings.length * 0.75;

        if (this.cheese !== "none"){
            total += 1.25;
        }
        if (this.sauce !== "none"){
            total += 0.75;
        }
        
        return total.toFixed(2);
    }

    calculateCalories(){
        let calories = 0;

        const sizeCalories = {
            regular: 0,
            large: 120
        };

        const baseCalories = {
            white_rice: 210,
            brown_rice: 215,
            mixed_greens: 40
        };

        const proteinCalories ={
            chicken: 180,
            beef: 220,
            tofu: 140,
            salmon: 200,
            none: 0
        };

        const toppingCalories = {
            avocado: 80,
            tomato: 15,
            lettuce: 10,
            cucumber: 10,
            onion: 15,
            shredded_carrot: 20,
            corn: 60,
            black_beans: 70,
            edamame: 90
        };

        const cheeseCalories = {
            cheddar: 110,
            mozzarella: 95,
            feta: 75,
            goat: 80,
            none: 0
        };

        const sauceCalories = {
            garlic_aioli: 130,
            italian: 45,
            balsamic: 50,
            honey_mustard: 70,
            teriyaki: 60,
            none: 0
        };

        calories += sizeCalories[this.size] || 0;
        calories += baseCalories[this.base] || 0;
        calories += proteinCalories[this.protein] || 0;
        calories += cheeseCalories[this.cheese] || 0;
        calories += sauceCalories[this.sauce] || 0;

        this.toppings.forEach((topping) => {
            calories += toppingCalories[topping] || 0;
        });

        return calories;
    }

    getDescription() {
        const toppingsText = 
            this.toppings.length > 0
                ? this.toppings.map((item) => this.formatText(item)).join(", ")
                : "None";

        return `
            <div class="order-confirmation">
                <div class="bowl-emoji">${this.getBowlEmoji()}</div>
                <div class="order-badge">Order #${this.orderNumber}</div>
                <h3>Thank you, ${this.name}!</h3>
                <p><strong>Email:</strong> ${this.email}</p>
                <p><strong>Phone:</strong> ${this.phone}</p>
                <p><strong>Size:</strong> ${this.formatText(this.size)}</p>
                <p><strong>Base:</strong> ${this.formatText(this.base)}</p>
                <p><strong>Protein:</strong> ${this.formatText(this.protein)}</p>
                <p><strong>Toppings:</strong> ${toppingsText}</p>
                <p><strong>Cheese:</strong> ${this.formatText(this.cheese)}</p>
                <p><strong>Sauce:</strong> ${this.formatText(this.sauce)}</p>
                <p><strong>Special Instructions:</strong> ${this.specialInstructions || "None"}</p>
                <p class="total-price">Total Price: $${this.calculatePrice()}</p>
                <p class="total-calories">Estimated Calories: ${this.calculateCalories()} cal</p>
            </div>
        `;        
    }

    getHistoryCard(){
        const toppingsText =
            this.toppings.length > 0
                ? this.toppings.map((item) => this.formatText(item)).join(", ")
                : "None";

        return `
            <div class="history-item">
                <h4>Order #${this.orderNumber} - ${this.name}</h4>
                <p><strong>Size:</strong> ${this.formatText(this.size)}</p>
                <p><strong>Base:</strong> ${this.formatText(this.base)}</p>
                <p><strong>Protein:</strong> ${this.formatText(this.protein)}</p>
                <p><strong>Toppings:</strong> ${toppingsText}</p>
                <p><strong>Total:</strong> $${this.calculatePrice()}</p>
                <p><strong>Calories:</strong> ${this.calculateCalories()} cal</p>
            </div>
        `;        
    }
}

const form = document.getElementById("energyBowlForm");
const output = document.getElementById("output");
const errorMessage = document.getElementById("error-message");
const orderHistory = document.getElementById("orderHistory");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

function getCheckedToppings(){
    const toppingCheckboxes = document.querySelectorAll('input[name="toppings"]:checked');
    const toppings = [];

    toppingCheckboxes.forEach(function (checkbox){
        toppings.push(checkbox.value);
    });

    return toppings;
}

function saveOrder(orderObject){
    const existingOrders = JSON.parse(localStorage.getItem("energyBowlOrders")) || [];
    existingOrders.unshift(orderObject);
    localStorage.setItem("energyBowlOrders", JSON.stringify(existingOrders));
}

function loadPastOrders(){
    const savedOrders = JSON.parse(localStorage.getItem("energyBowlOrders")) || [];

    if (savedOrders.length === 0){
        orderHistory.innerHTML = "<p>No past orders yet.</p>";
        return;
    }

    orderHistory.innerHTML = "";

    savedOrders.slice(0, 5).forEach(function (orderData) {
        const bowl = new EnergyBowl(
            orderData.name,
            orderData.email,
            orderData.phone,
            orderData.size,
            orderData.base,
            orderData.protein,
            orderData.toppings,
            orderData.cheese,
            orderData.sauce,
            orderData.specialInstructions
        );
        bowl.orderNumber = orderData.orderNumber;
        orderHistory.innerHTML += bowl.getHistoryCard();
    });
}

function clearPastOrders() {
    const confirmed = confirm("Are you sure you want to clear all past orders?");

    if (confirmed){
        localStorage.removeItem("energyBowlOrders");
        orderHistory.innerHTML = "<p>No past orders yet.</p>";
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessage.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const size = document.getElementById("size").value;
    const base = document.getElementById("base").value;
    const protein = document.getElementById("protein").value;
    const cheese = document.getElementById("cheese").value;
    const sauce = document.getElementById("sauce").value;
    const specialInstructions = document.getElementById("special_instructions").value.trim();
    const toppings = getCheckedToppings();

    if (name === ""){
        errorMessage.textContent = "Please enter your name.";
        return;
    }

    if (email === ""){
        errorMessage.textContent = "Please enter your email.";
        return;
    }

    if (phone === "") {
        errorMessage.textContent = "Please enter your phone number.";
        return;
    }

    if (size === "") {
        errorMessage.textContent = "Please select a size.";
        return;
    }

    if (base === "") {
        errorMessage.textContent = "Please select a base.";
        return;
    }

    if (protein === "") {
        errorMessage.textContent = "Please select a protein.";
        return;
    }

    if (cheese === "") {
        errorMessage.textContent = "Please select a cheese option.";
        return;
    }

    if (sauce === "") {
        errorMessage.textContent = "Please select a sauce.";
        return;
    }

    const customerBowl = new EnergyBowl(
        name,
        email,
        phone,
        size,
        base,
        protein,
        toppings,
        cheese,
        sauce,
        specialInstructions
    );

    output.innerHTML = customerBowl.getDescription();

    saveOrder(customerBowl);
    loadPastOrders();

    form.reset();
});

clearHistoryBtn.addEventListener("click", clearPastOrders);

loadPastOrders();
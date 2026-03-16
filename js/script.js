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
        if (this.base === "mixed greens"){
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


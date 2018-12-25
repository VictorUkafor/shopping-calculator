class Shopping{

    // set total to zero and items to empty object
    constructor(){
        this.total = 0;
        this.items = {};
    }

    // adds items to shopping cart
    addItem(itemName, quantity, price){

        // adds the cost of each item to total 
        this.total += (quantity * price);

        // adds the quantity and cost of each item to 
        // object 'items'
        if(this.items[itemName]){
            this.items[itemName].quantity += quantity;
            this.items[itemName].cost += (quantity * price);
        } else {
            this.items[itemName] = {};
            this.items[itemName].quantity = quantity;
            this.items[itemName].cost = (quantity * price);
        }
    }

    // returns the total price
    sumTotal(){
        return this.total;
    }

    // returns the all items in the cart
    allItems(){
        return this.items;
    }

    // clears the shopping cart
    clearCart(){
        this.total = 0;
        this.items = {}
    }

}

// creates an instance of the 'Shopping'
// for a shopper
let cart = new Shopping();

// function for the add form 
function addItem(){

    // retrieve inputs from form's fiels
    let item = document.forms["calculator"]["item"].value;
    let qty = document.forms["calculator"]["qty"].value;
    let price = document.forms["calculator"]["price"].value;

    // modify inputs
    item = item.toUpperCase();
    qty = parseInt(qty);
    price = parseInt(price);
    
    // validate inputs
	if(item.trim() === '' || !qty || !price){

        // displays validation error
        const error = 'All fields are required and must be valid!';
         document.getElementById('message').innerHTML = '<h1 id="error-heading">'+ error +'</h1>';
         return false;
	}else{

        // add inputs to cart
        cart.addItem(item, qty, price)

        let tableHead = '<tr>' +
        '<th class="sn">S/N</th>' + 
        '<th class="each-div">Item</th>' +
        '<th class="each-div">Quantity</th>' +
        '<th class="each-div">Cost</th>' +
        '</tr>';

        // displays table heading
        document.getElementById('show-div').innerHTML = tableHead;

        let allItems = cart.allItems();
        let tableRow = ''; 
        for(let item = 0; item < Object.keys(allItems).length; item++){
        tableRow += '<tr>' +        
        '<td class="sn2">' + (item + 1) +'</td>' +
        '<td class="each-div2">' + Object.keys(allItems)[item] + '</td>' +
        '<td class="each-div2">' + allItems[Object.keys(allItems)[item]].quantity + '</td>' +
        '<td class="each-div2">' + 'N' + allItems[Object.keys(allItems)[item]].cost + '</td>' + 
        '</tr>'    
    }    

    // display all items 
    document.getElementById('show-div').innerHTML += tableRow;

    const total = cart.sumTotal();

    let showTotal = '<tr>' +
    '<td class="each-div3" colspan="3">Total Price</td>' + 
    '<td class="each-div4">'+ 'N'+ total + '</td>' +
    '</tr>'
    // displays the total price
    document.getElementById('show-div').innerHTML += showTotal;

    // removes validation error
    document.getElementById('message').innerHTML = '';

    // displays button for clearing items in the cart
    let clearButton = '<button id="clearCart" onclick="return clearCart()" type="submit" class="clear-cart">Clear Cart</button>'
    document.getElementById('clear').innerHTML = clearButton;
    return false;
    }

    return false;
}

// function for clearing items
function clearCart() {
    cart.clearCart()

    document.getElementById('message').innerHTML = '';
    document.getElementById('show-div').innerHTML = '';
    document.getElementById('clear').innerHTML = '';
    document.forms["calculator"]["item"].value = '';
    document.forms["calculator"]["qty"].value = '';
    document.forms["calculator"]["price"].value = '';
    
    return false;  
}



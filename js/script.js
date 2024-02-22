// data array
const data = [
    [
        'drink',
        "1 Bucket of Redhorse",
        500,
        "Lakas Tama Pero Di Wasak",
        "1-Bucket-Redhorse.png"
    ],
    [
        'drink',
        "Black Label",
        2000,
        "Wasak na Wasak",
        "blacklabel.png"
    ],
    [
        'drink',
        "Blowjob Tower",
        1500,
        "Walang Kasing Sarap",
        "Blowjob-Tower.png"
    ],
    [
        'drink',
        "Emperador",
        1200,
        "Nalasing",
        "emperador.png"
    ],
    [
        'drink',
        "Jack Daniels",
        1500,
        "Wasak na Wasak",
        "Jack-Daniels.png"
    ],
    [
        'drink',
        "Juice",
        100,
        "asda",
        "juice.jpg"
    ],
    [
        'drink',
        "Tequila",
        1500,
        "Lovable Taste",
        "Tequila.png"
    ],
    [
        'drink',
        "Water",
        50,
        "asda",
        "water.jpg"
    ],
    [
        'food', 
        "Chicharon", 
        100,
        "Crispy Pork Belly",
        "chicha.jpg"
    ],
    [
        'food', 
        "Chicharon Bulaklak", 
        100,
        "Crispy Pork Belly",
        "chicharon.jpg"
    ],
    [
        'food',
        "Lechon Kawali with Cheese",
        200,
        "Sobrang Sarap",
        "crispypata.png"
    ],
    [
        'food',
        "Sisig",
        135,
        "malaki",
        "sisg.jpg"
    ],
    [
        'food',
        "Sizzling Hotdog",
        200,
        "malaki",
        "hotdog.jpg"
    ]
];


// global variable
let invoice_item = []
let sub_total = 0
let total = 0
let tax = 0
let price = 0
let input_postion = 0

// first loop
let title = $('#name-cat').text()
if(title == 'Food'){
    food_cat()
}

//category sorting
$('#food').on('click', function(){
    $('#name-cat').text('Food')
    food_cat()
})

$('#drink').on('click', function(){
    drink_cat()
})

// reverse
$('#sort').on('click', function(){
    let cat_sort = $('#name-cat').text().toLowerCase()
    if(cat_sort == 'drink'){
        console.log('click drink')
        data.reverse()
        drink_cat()
    }else{
        console.log('click food')
        data.reverse()
        $('#loop-card').html('')
        food_cat()
    }
})

//search
$('#search-btn').click(() => {
    $('#search-el').toggle()
})

$('#search-input').on('keyup',function(){
    const qvalue = $('#search-input').val()
    const filter = qvalue.toUpperCase()
    const parentCard = document.getElementById('loop-card')
    const card = parentCard.getElementsByClassName('subCardParent')
    for(let i = 0; i < card.length; i++){
        let text = card[i].getElementsByTagName('h5')[0]
        let title = text.textContent
        if(title.toUpperCase().indexOf(filter) > -1){
            card[i].style.display = 'block'
        }else{
            card[i].style.display = 'none'
        }
    }
})

function food_cat(){
    $('#loop-card').html('')
    let key = $('#food').text().toLowerCase()
    $.each(data, function(i, val){
        if(val[0] == key){
            const el_card = `
                <div class="col-md-3 mb-4 subCardParent" onclick="invoice_data('${val[4]}','${val[1]}',${val[2]})">
                    <div class="card">
                    <img src="assets/${val[4]}" class="card-img-top" height="130">
                    <div class="card-body">
                        <h5 class="card-title">${val[1]}</h5>
                        <p class="card-text">PHP ${val[2]}</p>
                    </div>
                    </div>
                </div>
            `
            $('#loop-card').append(el_card)
        }
    })
}

function drink_cat(){
    $('#loop-card').html('')
    let key = $('#drink').text().toLowerCase()
    $('#name-cat').text('Drink')
    $.each(data, function(i, val){
        if(val[0] == key){
            const el_card = `
                <div class="col-md-3 mb-4 subCardParent" onclick="invoice_data('${val[4]}','${val[1]}',${val[2]})">
                    <div class="card">
                    <img src="assets/${val[4]}" class="card-img-top" height="200">
                    <div class="card-body">
                        <h5 class="card-title">${val[1]}</h5>
                        <p class="card-text">PHP ${val[2]}</p>
                    </div>
                    </div>
                </div>
            `
            $('#loop-card').append(el_card)
        }
    })
}

// push data array to invoice data
function invoice_data(img, name, price){
    let invoice_data = [img, name, price, 0]
    for(let i = 0; i < invoice_item.length; i++){
        if(name == invoice_item[i][1]){
            alert('has available')
            return
        }
    }
    invoice_item.push(invoice_data)
    show_invoice()
}

// loop invoice

//add mo to sa big space pag gusto mo may image yung kada product
// <img src="assets/${val[0]}" class="align-self-center mr-3" width="95">

function show_invoice(){
    $('#loop-invoice').html('')
    $('#total-item').html('')
    $.each(invoice_item, function(i, val){
        const el_media = `
            <div class="media mb-2">



                
                <div class="media-body">
                <h6 class="mt-0">${val[1]}</h6>
                <p>PHP <span>${val[2]}</span></p>
                </div>
                <p>Quantity </p>
                <input class="quantity mt-3" id="quantity" type="number" value="${Number(val[3])}">
                <button class="btn delete mt-2"><img src="https://img.icons8.com/wired/35/000000/trash.png"></button>
            </div>
        `
        const el_total = `
            <div class="media mb-2">




                
                 <div class="media-body">
                    <h6 class="mt-0">${val[1]}</h6>
                    <p>PHP <span">${val[2]}</span></p>
                    
                    <h6>Quantity: <span">${val[3]}</span> </h6>
                </div>
            </div>
        `
        $('#loop-invoice').append(el_media)
        $('#total-item').append(el_total)
    })
}


// counting based on quantity
$('#loop-invoice').on('change','.quantity',function(){
    if(isNaN($(this).val()) || $(this).val() <= 0){
        $(this).val(0)
    }

    input_postion = $(".quantity").index(this)
    invoice_item[input_postion][3] = $(this).val()
    counting()
    show_invoice()
})

// counting
function counting (){
    sub_total = 0
    $.each(invoice_item, function(i, val){
        sub_total += val[2] * val[3]
        tax = sub_total * 0.02
        total = sub_total + tax
        $('#tax').text(tax)
        $('#total').text(total)
    })
}

// input money
$('#money').keypress(function(){
    if (event.keyCode == 13) {
        buy()
    }
})
$('#buy').on('click', buy)

// counting total
function buy(){
    let money = $('#money').val()
    let type = $('#buy-type').val()
    let change = money - total
    if(money == ''){
        alert('Insert The Money')
        return
    }else if(money <= total){
        alert('your money not enough')
        return
    }else if(isNaN(money)){
        alert("can't counting this value")
        return
    }
    let confirm_invoice = confirm('hi! '+ 'user' +', are you sure for the costumer\'s order?\nClick Yes to confirm')
    if(confirm_invoice == true){
        $('#tax-in').text(tax)
        $('#total-in').text(total)
        $('#total-type').text(type)
        $('#money-in').text(money)
        $('#change-in').text(change)
        $('#money').val('')
        $('#money').attr('placeholder', 'Insert Your Money')
        $('#modal-invoice').modal('show')
    }else{
        alert('BE CAREFUL')
        remove_invoice()
    }
}

// delete invoice based on target
$('#loop-invoice').on('click', '.delete', function(){
    let event = $('.delete').index(this)
    invoice_item.splice(event, 1)
    reset_amount()
    counting()
    show_invoice()
})


// delete all invoice
function remove_invoice(){
    $.each(invoice_item, function(i){
        invoice_item.splice(i, 1)
        invoice_item.shift()
        reset_amount()
    })
    show_invoice()
}

function reset_amount(){
    if(invoice_item == ''){
        $('#tax').text(0)
        $('#total').text(0)
    }
}

$('#end-payment').on('click', remove_invoice)














// Update the URL to point to your deployed backend
const BASE_URL = 'https://cispos.pages.dev';

// Function to handle placing an order
function placeOrder(productId, quantity) {
    fetch(`${BASE_URL}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally, update the UI to reflect the order placement
        // For example, clear the invoice or show a confirmation message
    })
    .catch(error => {
        console.error(error);
        alert('Error placing order. Please try again.');
    });
}

// Function to load products from the backend
function loadProducts() {
    fetch(`${BASE_URL}/products`)
    .then(response => response.json())
    .then(products => {
        // Update the UI with the fetched products
        // You can dynamically generate HTML to display the products
        // For example:
        products.forEach(product => {
            const productHtml = `
                <div class="col-md-3 mb-4 subCardParent" onclick="invoice_data('${product._id}', '${product.name}', ${product.price})">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">PHP ${product.price}</p>
                            <p class="card-text">Stock: ${product.stock}</p>
                        </div>
                    </div>
                </div>
            `;
            $('#loop-card').append(productHtml);
        });
    })
    .catch(error => {
        console.error(error);
        alert('Error loading products. Please try again.');
    });
}

// Call loadProducts function when the page is loaded
$(document).ready(function() {
    loadProducts();
});

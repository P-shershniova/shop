console.clear();

if (typeof updateBadge === "function") updateBadge();


let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: Rs' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    // let cartMain = document.createElement('div')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerDiv)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    // let totalh4Text = document.createTextNode(amount)
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}


let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '#'
buttonLink.classList.add('place-order-btn')
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonLink.addEventListener('click', function(e) {
    e.preventDefault()
    var modal = document.getElementById('checkoutModal')
    if (modal) modal.classList.add('is-open')
})

// Checkout modal: close and submit
;(function() {
    var modal = document.getElementById('checkoutModal')
    var form = document.getElementById('checkoutForm')
    if (!modal || !form) return
    function closeModal() {
        modal.classList.remove('is-open')
    }
    document.querySelector('.modal-close').addEventListener('click', closeModal)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal()
    })
    document.querySelector('.btn-cancel').addEventListener('click', closeModal)
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        if (typeof clearCart === 'function') clearCart()
        if (typeof updateBadge === 'function') updateBadge()
        window.location.href = 'orderPlaced.html'
    })
})()  
//dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL
let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            // console.log('call successful');
            contentTitle = JSON.parse(this.responseText)

            let item = typeof getCartIds === "function" ? getCartIds() : []
            let counter = item.length
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)
            console.log(counter, item)

            let i;
            let totalAmount = 0
            if (counter === 0) {
                amountUpdate(0)
            }
            for(i=0; i<counter; i++)
            {
                let itemCounter = 1
                for(let j = i+1; j<counter; j++)
                {
                    if(Number(item[j]) == Number(item[i]))
                    {
                        itemCounter +=1;
                    }
                }
                totalAmount += Number(contentTitle[item[i]-1].price) * itemCounter
                dynamicCartSection(contentTitle[item[i]-1],itemCounter)
                i += (itemCounter-1)
            }
            amountUpdate(totalAmount)
        }
    }
        else
        {
            console.log('call failed!');
        }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()





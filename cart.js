console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}
let id = location.search.split('?')[1]
console.log(id)

let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'
let price = 0;
let index = 1;
contentTitle = JSON.parse(this.responseText)
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
    


    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)
    //=-============
   
    //box.id = 'button'

    let buttonTag1 = document.createElement('button')
    boxDiv.appendChild(buttonTag1)

    buttonText1 = document.createTextNode('delete')
    buttonTag1.onclick  =  function()
    {
        var elem = document.getElementById('box');
        elem.parentNode.removeChild(elem);


        let order = index+" "
        let counter = 1
        if(document.cookie.indexOf(',counter=')>=0)
        {
            //index = index + 1
            order = index + " " + document.cookie.split(',')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1]) - itemCounter
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        document.getElementById("badge").innerHTML = counter
        totalAmount -= Number(contentTitle[item[index]-1].price) * itemCounter
                dynamicCartSection(contentTitle[item[index]-1],itemCounter)
        delete contentTitle[index]
                amountUpdate(totalAmount)
        document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)
        console.log(document.cookie)
    }
    buttonTag1.appendChild(buttonText1)
   



    
    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: ' + ob.price + ' лева') 
    
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    // let cartMain = document.createElement('div')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerDiv)
  
index++
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
    let totalh4Text = document.createTextNode('Amount: ' + amount + ' лева')
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
buttonLink.href = '/orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function()
{
    

    //console.log("clicked")
   // message => alert("Yes")
    Email.send({
        SecureToken : "7070f604-32b2-41c9-acf7-7ccbb3d7fef8",
        To : 'gogo.rusev31@gmail.com',
        From : "gogo.rusev31@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}  
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

            let counter = Number(document.cookie.split(',')[1].split('=')[1])
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

            let item = document.cookie.split(',')[0].split('=')[1].split(" ")
            console.log(counter)
            console.log(item)

            let i;
            let totalAmount = 0
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

httpRequest.open('GET', 'https://63cc0151ea8551541519898e.mockapi.io/products', true)
httpRequest.send()





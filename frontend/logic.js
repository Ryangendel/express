
function submitDogData(e){
        const nameValue = document.getElementById('name').value;
        const emailValue = document.querySelector('#email').value;
    
        postData(nameValue, emailValue)

    }
  

async function postData (userName, emailValue){
    const url = "/adddog";

    
  
    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // or other content type
        },
        body: JSON.stringify({name: userName, email:emailValue}) // or other data format
      });

    const json = await response.json();
    console.log(json)

    var bigHTML = ``
    
    for (let i = 0; i < json.length; i++) {
      bigHTML += `<h1>${json[i].name}</h1>
                  <href=/adddog/${json[i]._id}> 
      `;
    }

    console.log(bigHTML)
    document.getElementById("firstname").innerHTML = bigHTML
   
  } catch (error) {
    console.error(error.message);
  }
}
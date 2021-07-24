const input = document.getElementById("input");
let url = 'http://localhost:3000'

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

const Collab = async () => {
    console.log('clicked')
    title = input.value
    if(title){
        let response = await fetch(`${url}/document`, {method: 'POST', body: JSON.stringify({name: title})})
        document = await response.json()
        console.log(document)
    }
}

const Open = async (event) => {
  let id = event.toElement.attributes.data.value;

  window.location.href = `${url}/editor/${id}`

  
}

const Delete = async (event) => {
  let id = event.toElement.attributes.data.value;
  parent = event.target.parentElement

  let response = await fetch(`${url}/document/delete/${id}`)
  await response.json()
  parent.parentNode.removeChild(parent);

  
}
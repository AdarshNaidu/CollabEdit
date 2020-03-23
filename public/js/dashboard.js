const input = document.getElementById("input");

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
        let response = await fetch('http://localhost:3000/document', {method: 'POST', body: JSON.stringify({name: title})})
        document = await response.json()
        console.log(document)
    }
}

const Open = async (event) => {
  let id = event.toElement.attributes.data.value;

  window.location.href = `http://localhost:3000/editor/${id}`

  
}

const Delete = async (event) => {
  let id = event.toElement.attributes.data.value;
  parent = event.target.parentElement

  let response = await fetch(`http://localhost:3000/document/delete/${id}`)
  await response.json()
  parent.parentNode.removeChild(parent);

  
}
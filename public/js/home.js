const input = document.getElementById("input");

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button").click();
  }
});

const Collab = () => {
    title = input.value
    if(title){
        window.location.href = `/editor/${title}`
    }
}
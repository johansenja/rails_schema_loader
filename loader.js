const textBox = document.getElementById('textBox');
const submit = document.getElementById('submit');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  var schema = textBox.value;
});



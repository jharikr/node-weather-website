console.log('Client side javascript file is loaded');

// html form elements; value + properties
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

// information rendering
const messageOne = document.querySelector('#message-one-location');
const messageTwo = document.querySelector('#message-two-forecast');

// button event listener
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // get user input data
    const location = searchElement.value;
    const url = 'http://localhost:3000/weather?address=' + location;

    // reinitialise values
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }
            const { forecast, location } = data;
            messageOne.textContent = location;
            messageTwo.textContent = forecast;
        });
    });
    
})
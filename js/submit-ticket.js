console.log('open a ticket');

document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission

    // Collect form data
    const requestType = document.getElementById('requestType').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    // For now, just log the data to the console
    console.log('Request Type:', requestType);
    console.log('Subject:', subject);
    console.log('Description:', description);

    // You can add your logic here to send the data to a server or process it further
});


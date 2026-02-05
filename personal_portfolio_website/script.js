document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name === "" || email === "" || message === "") {
        alert("All fields are required.");
        return;
    }
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }
    alert("Message sent successfully!");
    this.reset();
});
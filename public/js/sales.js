document.getElementById('salesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Basic form validation and calculations

    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const quantityPurchased = parseFloat(document.getElementById('quantityPurchased').value);
    const pricePaid = parseFloat(document.getElementById('pricePaid').value);

    if (pricePaid !== unitPrice * quantityPurchased) {
        alert("Error: The price paid does not match the calculated total price.");
    } else {
        alert("Sales record added successfully!");
        this.submit();
    }
});
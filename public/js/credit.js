function validateForm() {
    var quantity = document.getElementById("produceQuantity").value;
    var price = document.getElementById("producePrice").value;
    var tonnage = document.getElementById("produceTonnage").value;
    
    if (quantity <= 0) {
        alert("Produce Quantity must be a positive number.");
        return false;
    }
    
    if (price <= 0) {
        alert("Produce Price must be a positive number.");
        return false;
    }

    if (tonnage <= 0) {
        alert("Tonnage must be a positive number.");
        return false;
    }

    return true; 
}

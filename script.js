document.addEventListener("DOMContentLoaded", function() {
    // Get the Add to Order buttons
    const addToOrderButtons = document.querySelectorAll('.btn.btn-info');

    // Get the Total text element
    const totalElement = document.querySelector('#total-text');

    addToOrderButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent card of the clicked button
            const parentCard = button.closest('.card-body');
            // Get the product name
            const productName = parentCard.querySelector('b').innerText;
            // Get the quantity
            const quantity = parseInt(parentCard.querySelector('input[name="quantity"]').value);
            // Calculate the total price
            const pricePerItem = parseFloat(productName.split(' - ')[1].split(' ')[0]);
            const totalPrice = pricePerItem * quantity;

            // Create a new card element for the ordered item
            const orderedItemCard = document.createElement('div');
            orderedItemCard.classList.add('card', 'mt-4');

            const orderedItemCardBody = document.createElement('div');
            orderedItemCardBody.classList.add('card-body');

            // Set the content of the ordered item card
            orderedItemCardBody.innerHTML = `<p>${productName} - ${quantity} item/s <b> (${totalPrice} PHP)</b> </p>`;

            // Append the ordered item card to the Ordered Items section
            document.querySelector('#ordered-items').appendChild(orderedItemCard);
            orderedItemCard.appendChild(orderedItemCardBody);

            // Update the overall total price
            updateTotalPrice();
        });
    });


// Handle payment
const payButton = document.getElementById('pay');
payButton.addEventListener('click', function() {
    const cashInput = document.getElementById('cash');
    const cashAmount = parseFloat(cashInput.value);
    const totalAmount = calculateTotalAmount();

    if (cashAmount >= totalAmount) {
        const change = cashAmount - totalAmount;
        alert(`Payment successful! Change: ${change.toFixed(2)} PHP`);
        // clearOrderedItems(); // Optionally clear ordered items after payment
        // updateTotalPrice(); // Reset the overall total price after payment
    } else {
        alert('Insufficient amount!');
    }
});

    // Function to calculate the total amount
    function calculateTotalAmount() {
        let total = 0;
        const orderedItems = document.querySelectorAll('#ordered-items .card-body p');
        orderedItems.forEach(function(item) {
            const totalPriceString = item.innerText.split('(')[1].split(' ')[0];
            const totalPrice = parseFloat(totalPriceString);
            total += totalPrice;
        });
        return total;
    }

    // Function for updating the overall total price
    function updateTotalPrice() {
        const totalPrice = calculateTotalAmount();
        totalElement.innerHTML = 'Total: ' + totalPrice.toFixed(2) + ' PHP';
    }

    // Function to clear ordered items
    function clearOrderedItems() {
        const orderedItemsContainer = document.getElementById('ordered-items');
        orderedItemsContainer.innerHTML = ''; // Clear the content
        updateTotalPrice(); // Reset the overall total price after clearingordered items
    }

    function updateTotalPrice() {
        const totalPrice = calculateTotalAmount();
        document.querySelector('#total-text').innerText = '₱' + totalPrice.toFixed(2);
      }
});


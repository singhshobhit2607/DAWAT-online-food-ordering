document.addEventListener('DOMContentLoaded', () => {
    // Select all "Add to Cart" buttons on the page
    const addToCartButtons = document.querySelectorAll('button');

    // Add a click event listener to each button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent the link from navigating away
            event.preventDefault(); 
            
            // Find the parent container for the menu item
            const itemContainer = button.closest('.start');
            let itemName = 'Item'; // Default name
            
            if(itemContainer) {
                // Try to get the item name from the h2 element
                const nameElement = itemContainer.querySelector('h2');
                if (nameElement) {
                    itemName = nameElement.textContent;
                }
            }
            
            // Show a simple confirmation message
            if (button.textContent.includes('ADD TO CART')) {
                showConfirmation(`${itemName} has been added to your cart!`);
            } else if (button.textContent.includes('BUY NOW')) {
                showConfirmation(`Proceeding to checkout for ${itemName}!`);
            }
        });
    });

    /**
     * Creates and displays a temporary confirmation message on the screen.
     * @param {string} message - The message to be displayed.
     */
    function showConfirmation(message) {
        // Remove any existing confirmation messages
        const existingConfirmation = document.querySelector('.confirmation-popup');
        if (existingConfirmation) {
            existingConfirmation.remove();
        }

        // Create the popup element
        const confirmationPopup = document.createElement('div');
        confirmationPopup.className = 'confirmation-popup';
        confirmationPopup.textContent = message;

        // Style the popup
        confirmationPopup.style.position = 'fixed';
        confirmationPopup.style.bottom = '20px';
        confirmationPopup.style.left = '50%';
        confirmationPopup.style.transform = 'translateX(-50%)';
        confirmationPopup.style.backgroundColor = '#28a745'; // Green background
        confirmationPopup.style.color = 'white';
        confirmationPopup.style.padding = '15px 30px';
        confirmationPopup.style.borderRadius = '8px';
        confirmationPopup.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        confirmationPopup.style.zIndex = '1000';
        confirmationPopup.style.opacity = '0';
        confirmationPopup.style.transition = 'opacity 0.3s ease-in-out';

        // Add it to the page and fade it in
        document.body.appendChild(confirmationPopup);
        
        // This small delay ensures the transition is applied correctly
        setTimeout(() => {
            confirmationPopup.style.opacity = '1';
        }, 10);
        
        // Automatically remove the popup after 3 seconds
        setTimeout(() => {
            confirmationPopup.style.opacity = '0';
            // Wait for the fade-out transition to finish before removing the element
            setTimeout(() => {
                if (confirmationPopup.parentNode) {
                    confirmationPopup.parentNode.removeChild(confirmationPopup);
                }
            }, 300);
        }, 3000);
    }
});

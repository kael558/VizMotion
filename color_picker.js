// Get references to the necessary elements
const colorPicker = document.getElementById('colorPicker');
const container = document.getElementById('container');

// Add event listener to the color picker
colorPicker.addEventListener('input', function() {
    // Get the selected color value
    const selectedColor = colorPicker.value;

    setBackgroundColor(selectedColor);
    
    // Set the background color of the container
    //container.style.backgroundColor = selectedColor;
    
    // Clear any existing background image
    //container.style.backgroundImage = 'none';
});

// Optional: Add functionality to set a background image
function setBackgroundImage(imageUrl) {
    container.style.backgroundImage = `url(${imageUrl})`;
    container.style.backgroundColor = 'transparent'; // Clear background color
}

// Example usage of setBackgroundImage function:
// setBackgroundImage('path/to/your/image.jpg');
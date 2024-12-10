document.getElementById("sightingForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        latitude: document.getElementById("latitude").value,
        verticalLat: document.getElementById("verticalLat").value,
        longitude: document.getElementById("longitude").value,
        horizontalLong: document.getElementById("horizontalLong").value,
        species: document.getElementById("species").value,
        size: document.getElementById("size").value,
        behaviour: document.getElementById("behaviour").value,
        extras: document.getElementById("extras").value
    };

    // Check if all required fields are filled
    if (!formData.date || !formData.time || !formData.latitude || !formData.longitude || !formData.species || !formData.size || !formData.behaviour) {
        alert("Please fill in all required fields.");
        return;
    }

    // Send data to the backend API
    try {
        const response = await fetch('https://sharkproject.tactor.dev/api/addShark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Sighting submitted successfully!");
            window.location.href = "submitscreen.html"; // Redirect to the submission screen
        } else {
            throw new Error(result.message || 'Failed to submit sighting');
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Function for geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("latitude").value = latitude.toFixed(6);
    document.getElementById("longitude").value = longitude.toFixed(6);
    
    document.getElementById("verticalLat").value = latitude >= 0 ? "North" : "South";
    document.getElementById("horizontalLong").value = longitude >= 0 ? "East" : "West";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

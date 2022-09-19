$( document ).ready(function() {
    let checkboxes = $("input[type=checkbox][data-id=:amenity_id]")
    let enabledAmenities = [];
    // Attach a change event handler to the checkboxes.
    checkboxes.change(function() {
    enabledAmenities = checkboxes
        .filter(":checked") // Filter out unchecked boxes.
        .map(function() { // Extract values using jQuery map.
        return this.value;
        }) 
        .get() // Get array.
    $("h4.amenities").text(enabledAmenities);
    });
});

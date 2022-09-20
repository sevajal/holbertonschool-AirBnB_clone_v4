$( document ).ready(function() {
    let checkboxes = $("input[type=checkbox][name=amenities]")
    let enabledAmenities = {};
    let amenities_names = [];

    checkboxes.change(function() {
      if ($(this).is(':checked')) {
        enabledAmenities[$(this).data('id')] = $(this).data('name')
      } else {
        delete enabledAmenities[$(this).data('id')]
      }
      amenities_names = Object.values(enabledAmenities);
      if (amenities_names.length == 0) {
        $(".amenities h4").html("&nbsp;");
      } else {
        $(".amenities h4").text(amenities_names.join(", "));
      }
    });

    $.get("http://0.0.0.0:5001/api/v1/status/", function(Status)
    {
      if (Status.status == 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
});

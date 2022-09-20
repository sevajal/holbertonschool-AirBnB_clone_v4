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

    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      //beforeSend: function(xhr) { 
      //  xhr.setRequestHeader("Authorization", "Basic " + btoa("username:api_key")); 
      //},
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      data: '{}',
      success: function (data) { 
        for (const place of data) {
          //const title = $("<h2></h2>").html(place.name);
          //const title_box = $('.title_box').append(title);
          const article = `
          <article>
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
          $('.places').append(article);
          console.log(place.id);
        }
        console.log(data);
        //alert(JSON.stringify(data));
      },
      error: function(){
        alert("Cannot get data");
      }
  });
});

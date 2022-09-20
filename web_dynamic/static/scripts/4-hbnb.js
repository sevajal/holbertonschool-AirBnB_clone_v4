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

    $("button").click(function(){
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(enabledAmenities),
      success: function (data) {
        console.log(data);
        for (const place of data) {
          $.get("http://0.0.0.0:5001/api/v1/users/", function(users)
          {
          for (user of users) {
            if (user.id == place.user_id) {
              owner = user
            }
          }
          let gs = "";
          let nr = "";
          let nb = "";          
          if (place.max_guest != 1) {
            gs = "s";
          }
          if (place.number_rooms != 1) {
            nr = "s";
          }
          if (place.number_bathrooms != 1) {
            nb = "s";
          }

          const article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>  
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${gs}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${nr}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${nb}</div>
            </div>
            <div class="user">
            <b>Owner:</b> ${owner.first_name} ${owner.last_name}
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
          $('.places').append(article);
          });
        }
        //alert(JSON.stringify(data));
      },
      error: function(){
        alert("Cannot get data");
      }
  })
  });
});

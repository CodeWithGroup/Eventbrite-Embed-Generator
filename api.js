var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.eventbriteapi.com/v3/organizations/464103861019/events/",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer <API KEY HERE>",
      "Content-Type": "application/json"
    }
  }

  $.ajax(settings).done(function (data) {
    console.log(data);
    content = ""
    for(i= 0;i<data.events.length; i++) {
      event = data.events[i]
        if (data.events[i].status === "live"){
            content = content + "<h2>" + event.name.text + "</h2>" + event.description.html + "<p>" + "start:" + event.start.local + " end: " + event.end.local + "</P>\n"

        }

    }
    $("#eventbrite").append(content);
  });
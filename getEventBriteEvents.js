const eventTemplate = "<div class=\"row card\"><div class=\"col-12\"><div class=\"row\"><div class=\"col-sm-4 col-lg-2 event-date\"><span class=\"event-date-month\">`month`</span><span class=\"event-date-day\">`day`</span><p><span class=\"event-date-start-time\">`eventStart``eventStartAmPm` - </span><span class=\"event-date-end-time\">`eventEnd``eventEndAmPm`</span></p></div><div class=\"col-sm-8 col-lg-10 event-title\"><span class=\"event-title\">`eventName`</span></div></div><div class=\"row\"><div class=\"col-md-12 col-lg-9 event-description\"><span class=\"event-description\">`eventDescription`</span></div><div class=\"col-md-12 col-lg-3 event-book-button\"><!-- Noscript content for added SEO --><noscript><a href=\"https://www.eventbrite.co.uk/e/programming-101-tickets-`eventId`\"rel=\"noopener noreferrer\" target=\"_blank\"></noscript><!-- You can customize this button any way you like --><button id=\"eventbrite-widget-modal-trigger-`eventId`\" class=\"btn btn-primary float-right\"type=\"button\">Register</button><noscript></a>Register for tickets on Eventbrite</noscript></div></div></div></div>";
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const ajaxSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.eventbriteapi.com/v3/organizations/464103861019/events/",
    "method": "GET",
    "headers": {
        "Authorization": "Bearer <key>",
        "Content-Type": "application/json"
    }
};

function ajaxDone(data) {
    {
        console.log(data);

        content = "";
        for (i = 0; i < data.events.length; i++) {
            event = data.events[i]
            
            startDate = new Date(event.start.utc);
            endDate = new Date(event.end.utc);
    
            var month = monthNames[startDate.getMonth()].substring(0, 3).toUpperCase();
            var day = startDate.getDate();
            var eventStart = startDate.getHours();
            var eventEnd = endDate.getHours();
            var eventName = event.name.text;
            var eventDescription = event.description.text;
            var eventId = event.id;

            var eventStartAmPm = "am";
            var eventEndAmPm = "am";

            if (eventStart > 12) {
                eventStart -= 12;
                eventStartAmPm = "pm";
            }
            if (eventEnd > 12) {
                eventEnd -= 12;
                eventEndAmPm = "pm";
            } 

            if (event.status === "live") {
                content = content + eventTemplate
                    .replace("`month`", month)
                    .replace("`day`", day)
                    .replace("`eventStart`", eventStart)
                    .replace("`eventStartAmPm`", eventStartAmPm)
                    .replace("`eventEnd`", eventEnd)
                    .replace("`eventEndAmPm`", eventEndAmPm)
                    .replace("`eventName`", eventName)
                    .replace("`eventDescription`", eventDescription)
                    .replace("`eventId`", eventId);
            }
        }
        $("#events").append(content);
    }
}

$.ajax(ajaxSettings).done(ajaxDone);
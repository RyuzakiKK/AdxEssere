var combined = false;

function sortElements() {
    /* Sort items using a sortable array */
    var itemsToSort = document.getElementsByClassName("locale");
    var data = [], order = [], item, placeHolder;
    for (var i = 0; i < itemsToSort.length; i++) {
        // Discard the hidden items
        if (itemsToSort[i].style.display == "list-item") {
            item = itemsToSort[i];
            // save position of item by inserting a placeholder
            placeHolder = document.createElement(item.tagName);
            item.parentNode.insertBefore(placeHolder, item);
            order.push(placeHolder);
            // save item and value
            var sorting = document.getElementById("sortingoptions").value;
            if (sorting == 1) {
                data.push({obj: item, value: item.getElementsByClassName("distanza")[0].innerHTML});
            } else {
                if (item.getElementsByClassName("desc").length > 0) {
                    data.push({obj: item, value: item.getElementsByClassName("desc")[0].innerHTML});
                } else {
                    data.push({obj: item, value: ""});
                }
            }
        }
    }
    // sort the item array by the value
    data.sort(function(a, b) {
        return(a.value.localeCompare(b.value));
    });
    // Insert sorted items
    for (var i = 0; i < data.length; i++) {
        item = data[i].obj;
        placeHolder = order[i];
        placeHolder.parentNode.insertBefore(item, placeHolder);
        // remove placeholder
        placeHolder.parentNode.removeChild(placeHolder);
    }
}

function PositionAndKeyword() {
    /* Search with keyword and the user location */
    geoloc();
    //keyword(true);
    combined = true;
}

function keyword(onlyNear) {
    /* Search with the keyword provided by the user */
    var word = document.getElementById("keywordtext").value;
    if(!word.match(/\S/)) {
        word = document.getElementById("keywordlist").value;
    }
    var x = document.getElementsByClassName("locale");
    var empty = true;
    // Iterate every locale present in the html
    for(var i = 0; i < x.length; i++) {
        var pKeyword = x[i].getElementsByClassName("keyword");
        var matched = false;
        for (var j = 0; j < pKeyword.length && !matched; j++) {
            if (pKeyword[j].innerHTML.toLowerCase().indexOf(word.toLowerCase()) > -1) {
                matched = true;
            }
        }
        if (matched && !onlyNear) {
                x[i].getElementsByClassName("distanza")[0].innerHTML = "";
                x[i].style.display = "list-item";
                empty = false;
        } else if (matched && onlyNear && x[i].style.display == "list-item") {
            empty = false;
        } else {
            x[i].style.display = "none";
        }
    }
    var err = document.getElementById('error');
    if (empty) {
        err.innerHTML = "No results found.";
    } else {
        err.innerHTML = "";
    }
}

function geoloc() {
    /* Get the user location and call displayNearLocalesy */
    if (navigator.geolocation) {
        var options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(displayNearLocales, showError, options);
    } else {
        var err = document.getElementById('error');
        err.innerHTML = "Geolocation is not supported with this browser.";
    }
}

function displayNearLocales(position) {
    /* Chenge the style.display property of the the locales for display the near ones */
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var limit = document.getElementById("limitdistance").value;
    var x = document.getElementsByClassName("locale");
    var empty = true;
    for(var i = 0; i < x.length; i++) {
        var pDistanza = x[i].getElementsByClassName("distanza")[0];
        var localLat = x[i].getElementsByClassName("lat")[0].innerHTML;
        var localLong = x[i].getElementsByClassName("long")[0].innerHTML;
        var metri = distance(latitude, longitude, localLat, localLong);
        if (metri <= limit) {
            pDistanza.innerHTML = metri + " metri";
            x[i].style.display = "list-item";
            empty = false;
        } else {
            x[i].style.display = "none";
        }
    }
    var err = document.getElementById('error');
    if (empty) {
        err.innerHTML = "No results found.";
    } else {
        err.innerHTML = "";
        if (combined) {
            keyword(true);
        }
    }
    combined = false;
}

function showError(error) {
    /* Called if an error occurred during the request of the position */
    combined = false;
    var err = document.getElementById('error');
    var x = document.getElementsByClassName("locale");
    for(var i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    switch (error.code) {
        case error.PERMISSION_DENIED:
            err.innerHTML = "You denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            err.innerHTML = "Location information unavailable.";
            break;
        case error.TIMEOUT:
            err.innerHTML = "The request for Geolocation timed out.";
            break;
        case error.UNKNOWN_ERROR:
            err.innerHTML = "Error, retry.";
            break;
    }
}

function distance(lat1, lng1, lat2, lng2) {
    /* Return the distance in meters from two coordinates */
    var earthRadius = 6371000;
    var dlat1 = toRadians(lat1);
    var dlat2 = toRadians(lat2);
    var difflat = toRadians(lat2 - lat1);
    var difflng = toRadians(lng2 - lng1);
    var a = Math.sin(difflat/2) * Math.sin(difflat/2) +
            Math.cos(dlat1) * Math.cos(dlat2) *
            Math.sin(difflng/2) * Math.sin(difflng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.floor(earthRadius * c);
}

function toRadians(angle) {
    /* Deg to rad */
    return angle * (Math.PI / 180);
}

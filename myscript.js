function keyword() {
    var word = document.getElementById("keyword").value;
    if(!word.match(/\S/)) {
        alert ('Il campo vuoto non è ammesso');
        return;
    }
    var x = document.getElementsByClassName("locale");
    for(var i = 0; i < x.length; i++) {
        var pKeyword = x[i].getElementsByClassName("keyword");
        var matched = false;
        for (var j = 0; j < pKeyword.length && !matched; j++) {
            if (pKeyword[j].innerHTML.indexOf(word) > -1) {
                matched = true;
            }
        }
        if (matched) {
            x[i].getElementsByClassName("distanza")[0].innerHTML = "";
            x[i].style.display = "";
        } else {
            x[i].style.display = "none";
        }
    }
}

function geoloc() {
    if (navigator.geolocation) {
        var options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(sortAndDisplay, showError, options);
    } else {
        alert('Geolocation is not supported with this browser');
    }
}

function sortAndDisplay(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var limite = document.getElementById("limitdistance").value;
    var x = document.getElementsByClassName("locale");
    for(var i = 0; i < x.length; i++) {
        var pDistanza = x[i].getElementsByClassName("distanza")[0];
        var localLat = x[i].getElementsByClassName("lat")[0].innerHTML;
        var localLong = x[i].getElementsByClassName("long")[0].innerHTML;
        var metri = distance(latitude, longitude, localLat, localLong);
        if (metri <= limite) {
            pDistanza.innerHTML = metri + " metri";
            x[i].style.display = "";
        } else {
            x[i].style.display = "none";
        }
    }
}

function showError(error) {
    var err = document.getElementById('error');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            err.innerHTML = "You denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            err.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            err.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            err.innerHTML = "An unknown error occurred.";
            break;
    }
}

function distance(lat1, lng1, lat2, lng2) {
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
    return angle * (Math.PI / 180);
}

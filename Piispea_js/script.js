(function () {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function () {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var ampm="";

            if (h < 10) {
                h = "0" + h;
            }

            if (h <= 12) {
                ampm="AM";
            } else {
                h = h - 12;
                ampm="PM";
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + ampm;
            
        }
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    document.getElementById("form").addEventListener("submit", validateForm);
    document.getElementById("radioform").addEventListener("change",showDiv);
    document.getElementById("radioform").addEventListener("submit", validateRadio);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "x,xx &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();

        var kink = document.getElementById("v1");
        var kontaktiVaba = document.getElementById("v2");        
        var linn = document.getElementById("linn");

        var hind = 0;

        if (kink.checked) {
            hind+=5;
        }

        if (kontaktiVaba.checked) {
            hind+=1;
        }
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
        }else if (linn.value === "trt"||linn.value ==="nrv"){
            hind+=2.5;
        }else if (linn.value === "prn"){
            hind+=3;
        }else {
            hind+=0;
        }  
        
        e.innerHTML = hind +" &euro;";
        console.log("Tarne hind on arvutatud");
    }

        var pank=document.getElementById("bank");
        var arve=document.getElementById("invoice");
        var sula=document.getElementById("cash");

    function showDiv(event) {
        event.preventDefault();

        if (pank.checked) {
            document.getElementById("choosebank").style.display="block";
        }

        if (arve.checked) {
            document.getElementById("invoiceMail").style.display="block";
        }

        console.log("Makseviis valitud");
    }
    
      function validateForm(event){
        event.preventDefault();

        var eesn = document.getElementById("fname");
        var peren = document.getElementById("lname");
        var inclNum=/\d/;

        if (eesn.value === ""){
            alert("Palun sisesta eesnimi!");
            eesn.focus();
            return;
        }  

        if (peren.value === "") {
            alert("Palun sisesta perenimi!")
            peren.focus();
            return;
        }

        if (eesn.value.match(inclNum)|| peren.value.match(inclNum)) {
            alert("Nimi ei või sisaldada numbreid!")
            eesn.focus();
            peren.focus();
            return;
        }

        console.log("Vorm kontrollitud")
    }

    function validateRadio(event){
        event.preventDefault();
        var pangavalik = document.getElementById("banklink");
        var arveemail = document.getElementById("email");

        if ((!pank.checked) && (!arve.checked) && (!sula.checked)) {
            alert ("Vali makseviis!")
            return;
        }

        if ((pank.checked) && (pangavalik.value=="")) {
            alert("Vali pank!")
            pangavalik.focus();
            return;
        }

        if ((arve.checked) && (arveemail.value=="")) {
            alert("Sisesta e-mail!")
            arveemail.focus();
            return;
        }

        console.log("Makseviis valik kontrollitud")
    }

   
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;
var infobox;

function GetMap() {
    "use strict";

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(63.89873, 18.72070),
        zoom: 3,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.center, {
        visible: false
    });

    infobox.setMap(map);

    var pushpin1 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(58.3810654, 26.7194996));

    pushpin1.metadata = {
            title: 'Tartu Ülikool',
            description: 'Hea koht',
            text: 'UT'
        };

    var pushpin2 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(68.1295395, 13.4050131)); 

    pushpin2.metadata = {
            title: 'Nappskaret Viewpoint',
            description: 'Ilus koht',
            text: 'NV'
        };

    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);

}

function pushpinClicked(e) {
    if (e.target.metadata){
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            text: e.target.metadata.text,
            visible:true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE


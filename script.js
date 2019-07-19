require([
    "esri/map",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/InfoTemplate",
    "esri/layers/GraphicsLayer",
    "esri/Color",
    "dojo/domReady!"

], function(
    Map,
    SimpleMarkerSymbol,
    Graphic,
    Point,
    InfoTemplate,
    GraphicsLayer,
    Color
    ) {

    var page = 0;

    var map = new Map("map", {
        basemap: "hybrid",
        logo: false,
        showAttribution: false,
        slider: false
    });

    var back = document.getElementById("back");
    var next = document.getElementById("next");

    var markers = new GraphicsLayer();
    var infoTemplate = new InfoTemplate("Attributes", "${Label}<br />");
    var sms = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_SQUARE).setColor(marker_color);

    map.on("load", function() {
        document.getElementById("story").innerHTML = "<h1>" + story_title[0] + "</h1><p>" + story[0] + "</p>" + image[0];
        map.centerAndZoom(center[0], zoom[0]);

        for (var i = 0; i < marker[0].length; i++) {
            var attr = attribute[0][i];
            var pt = new Point(marker[0][i]);
            var graphic = new Graphic(pt, sms, attr, infoTemplate);
            markers.add(graphic);
            map.addLayer(markers);
        }
    });

    map.on("click", function(evt) {
        console.log(evt.mapPoint.getLongitude() + ", " + evt.mapPoint.getLatitude() + ", " + map.getZoom());
    });

    markers.on("mouse-over",function(event) {
        var graphic = event.graphic;
        map.infoWindow.setContent(graphic.getContent());
        //map.infoWindow.setTitle(graphic.getTitle());
        map.infoWindow.show(event.screenPoint,
            map.getInfoWindowAnchor(event.screenPoint));
    });

    markers.on("mouse-out", function () {
        map.graphics.clear();
        map.infoWindow.hide();
    });

    next.addEventListener("click", function() {
        markers.clear();

        if (page == (story.length - 1)) {
            page = 0;
        } else {
            page = (page + 1);
        }

        document.getElementById("story").innerHTML = "<h1>" + story_title[page] + "</h1><p>" + story[page] + "</p>" + image[page];
        map.centerAndZoom(center[page], zoom[page]);

        for (var i = 0; i < marker[page].length; i++) {
            var attr = attribute[page][i];
            var pt = new Point(marker[page][i]);
            var graphic = new Graphic(pt, sms, attr, infoTemplate);

            markers.add(graphic);
            map.addLayer(markers);
        }
    });

    back.addEventListener("click", function() {
        markers.clear();

        if (page == 0) {
            page = (story.length - 1);
        } else {
            page = (page - 1);
        }

        document.getElementById("story").innerHTML = "<h1>" + story_title[page] + "</h1><p>" + story[page] + "</p>" + image[page];
        map.centerAndZoom(center[page], zoom[page]);

        for (var i = 0; i < marker[page].length; i++) {
            var attr = attribute[page][i];
            var pt = new Point(marker[page][i]);
            var graphic = new Graphic(pt, sms, attr, infoTemplate);

            markers.add(graphic);
            map.addLayer(markers);
        }
    });

});
var jMap = $(".map"),
  height = jMap.height(),
  width = jMap.width(),
  svg = d3.select(".map").append("svg")
  .attr("width", width)
  .attr("height", height);

var attacksCsv;
var url = new URL(window.location.href);
var c = url.searchParams.get("type");
$.ajax({
  url: "server.php",
  data: {
    "get": "attacks",
    "type": c
  },
  async: false,
  method: "GET",
  success: function(data) {
    attacksCsv = data.slice(2, data.length - 1);
  }
});

var rectProjection = d3.geoEquirectangular()
  .scale(height / Math.PI)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(rectProjection);

var graticule = d3.geoGraticule();
svg.append("path")
  .datum(graticule)
  .attr("class", "graticule")
  .attr("d", path);

d3.json("/ThreatReporter/data/world-50m.json", function(error, world) {
  if (error) throw error;

  svg.insert("path", ".graticule")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path);

  svg.insert("path", ".graticule")
    .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
      return a !== b;
    }))
    .attr("class", "boundary")
    .attr("d", path);
});
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

loadAttacks();

var xx;

function loadAttacks() {
  var results = Papa.parse(attacksCsv, {
    header: true
  });
  for (var i = 0; i < results.data.length; i++) {
    var row = results["data"][i];
    var point1 = rectProjection([parseFloat(row["fLong"]), parseFloat(row["fLat"])]);
    var point2 = rectProjection([parseFloat(row["tLong"]), parseFloat(row["tLat"])]);

    if (!isNaN(point2[0])) {
      var cc = svg.append("line")
        .attr("x1", point1[0])
        .attr("y1", point1[1])
        .attr("x2", point2[0])
        .attr("y2", point2[1])
        .attr("stroke", "rgb(210, 102, 102)")
        .attr("stroke-width", "2")
        .attr("title", "Attack Vector:" + row["vector"])
        .attr("data-toggle", "tooltip")
        .attr("data-html", "true")._groups[0];

      cc = $(cc);
      cc.on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(cc.attr("title"))
          .style("left", (d.pageX) + "px")
          .style("top", (d.pageY - 15) + "px");
      });

      cc.on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
      drawCircle(point1, [row["fIp"], row["fLong"], row["fLat"], row["date"], row["vector"]]);
      drawCircle(point2, [row["tIp"], row["tLong"], row["tLat"], row["date"], row["vector"]]);
    } else {
      drawCircle(point1, [row["fIp"], row["fLong"], row["fLat"], row["date"], row["vector"]]);
    }

  }
}

function drawCircle(point, data) {
  var cc = svg.append("circle")
    .attr("r", 5)
    .attr("cx", point[0])
    .attr("cy", point[1])
    .attr("class", "attack-circle")
    .attr("title", "<span style='font-size:10px'>IP:" + data[0] + "<br/>Long/Lat:" + data[1] + "," + data[2] + "<br/>Date:" + data[3] + "<br/>Vector: "+data[4]+"</span>")
    .attr("data-toggle", "tooltip")
    .attr("data-html", "true");

  cc = $(cc._groups[0]);

  cc.on("mouseover", function(d) {
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html(cc.attr("title"))
      .style("left", (d.pageX) + "px")
      .style("top", (d.pageY - 52) + "px");
  });

  cc.on("mouseout", function(d) {
    div.transition()
      .duration(500)
      .style("opacity", 0);
  });

}

$(document).ready(function() {
  /**
    $("[data-toggle='tooltip']").tooltip({

      'container' : 'body',
      'placement': 'top'
    });
    $("[data-toggle='tooltip']").on('show.bs.tooltip', function(event){
      var ttp =   $("[role='tooltip']");
      var topVal = parseFloat(ttp.css("top"));

    });
  **/
});

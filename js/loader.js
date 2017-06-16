$(document).ready(function() {

  $("div[id^=section]").addClass("loading");

  $.ajax({
    url: "server.php",
    data: {
      "get": "report",
      "type": tp
    },
    success: function(data) {
      setTimeout(function(){}, )
      console.log(data);
      var dBuild = "<ul class='details'>";
      for (var key in data.details) { // Assign details
        dBuild += createLi(key, data.details[key]);
      }
      dBuild += "</ul>";
      $("#general").append(dBuild);

      dBuild = "<ul class='details'>";
      dBuild += createLi("family", data.classify.family);
      dBuild += createLi("popularity", (data.classify.popularity * 100).toString() + "%");
      var severity = data.classify.severity;
      if (severity < 5) // Safe
      {
        $("#section2").css({
          "background-color": "#24857c"
        }); // Green
        $("#section2 .logo").html("<span class='mif-checkmark mif-huge'> </span>");
      } else if (severity < 7) {
        $("#section2").css({
          "background-color": "#d4c06b"
        }); // Yellow
        $("#section2 .logo").html("<span class='mif-notification mif-huge'> </span>");
      } else {
        $("#section2").css({
          "background-color": "#d76f4f"
        }); // Red
        $("#section2 .logo").html("<span class='mif-warning mif-huge'> </span>");
      }
      dBuild += createLi("severity", severity.toString() + "/10");

      $("#classify").append(dBuild);

      // Other possibilities pie chart
      var json = data.classify.other;

      var  width =350,
        height = 250,
        radius = Math.min(width, height) / 2;

      var colors = d3.scale.ordinal()
        .range([
          "#5DA5DA",
          "#FAA43A",
          "#60BD68",
          "#F15854"
        ]);

      var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);

      var pie = d3.layout.pie().sort(null).value(function(d) {
        return d.value
      });

      var svg = d3.select(".chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


      var g = svg.selectAll(".arc")
        .data(pie(json))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
          return colors(d.value);
        });

      g.append("text")
        .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) {
          return d.data.type;
        });


    }
  });

  function createLi(key, val) {
    return "<li> <span class='text-uppercase font-bold font-regular'>" +
      key + ": </span> <span class='text-capitalize font-regular'>" + val + " </span>";
  }
});

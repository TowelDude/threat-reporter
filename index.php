<!DOCTYPE html>
<html>
<meta charset="UTF-8">

<head>
  <title>Threat Reporter</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
  <!--Bootstrap css -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/metro/3.0.17/css/metro-icons.css" />
  <!-- Metro icons css -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <!--Jquery -->
  <link rel="stylesheet" href="css/style.css" />
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <!--Font -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <!--Bootstrap javascript -->


  <script src="https://d3js.org/d3.v4.min.js"></script>
  <!-- d3 -->
  <script src="https://unpkg.com/topojson@3"></script>
  <!-- topojson -->
  <script src="js/papaparse.min.js"></script>

  <script src="js/loader.js"></script>
</head>

<body>

  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
        <a class="navbar-brand font-regular" href="">Threat Reporter</a>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav font-small">
          <li><a href="?type=ddos">DDoS</a></li>
          <li><a href="?type=malware">Ransomware</a></li>

        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div id="row1" class="row match-my-cols">

      <div class="col-md-5 section font-regular" id="section1">
        <section id="general">
          <h1 class="font-bold">General Details</h1>

        </section>
      </div>

      <div class="col-md-6 section font-regular" id="section2">
        <div class="logo">


        </div>
        <section>
          <h1 class="font-bold">Classification</h1>
          <div id="classify" class="col-md-12">


          </div>
          <div class="col-md-12 chart">

          </div>
        </section>
      </div>
    </div>
    <div class="row is-flex">

      <div class="col-md-11 section " id="section4">
        <section>
          <h2 class="font-bold">Workflow</h2>
          <div class="col-md-8 col-md-offset-2">
            <div class="mermaid" id="workflowDiv">
              <?php if(strtolower($_GET["type"]) == "malware"){?>
                graph TB
                A(Email Recieved)-->|Attachment opened|C(inovice.docx)
                C==>|VB Script|D((Binary Locky))
                D==>E(Suspicious Registry Activity)
                D==>F(HTTP Request: <code>www.ecoledecorroy.be/1/1.exe</code>)
                D==>G(Encrypts Files)
              <?php }else if(strtolower($_GET["type"]) == "ddos"){?> graph TB
                D((Web Server: 127.0.0.1))
                C(Webscraper: 299.222.420.68)
                A(Attacker: 8.8.8.8)==>|False Traffic|D
                B(Attacker: 168.92.19.0)==>|False Traffic|D
                C==>|Legitimate Traffic|D
                D==>E{DDoS Protection Software}
                E==>|HTTP Response|C
                E-.->|False Traffic|F(Drop packet)

              <?php } ?>
            </div>

          </div>

        </section>

      </div>

    </div>

    <div class="row">
      <div class="row-expand">
        <div class="col-md-11 section map" id="section3">

        </div>
        <div id="map-catcher"></div>
        <script src="js/map.js"></script>
      </div>

    </div>
    <script src="https://unpkg.com/mermaid@7.0.3/dist/mermaid.min.js"></script>

    <script>
      mermaid.initialize({
        startOnLoad: true,
        flowchart: {
          htmlLabels: true
        }
      });
    </script>

  </div>

</body>

</html>

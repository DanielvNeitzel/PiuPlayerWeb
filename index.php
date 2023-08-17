<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="cache-control" content="no-cache">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">

	<title></title>

	<link href="estilo-player.css" rel="stylesheet">
	<link href="jquery-ui.css" rel="stylesheet">
	<script src="jquery-1.12.4.js"></script>
	<script src="jquery-ui.js"></script>
	<script src="script-player.js"></script>
</head>
<body>
	<div class="container">
		<div class="btn-voltar">
			<a href="../inicio.php">⋖ Voltar</a>
		</div>
		<div class="column add-bottom">
			<div id="mainwrap">
				<div id="nowPlay">
					<span class="left" id="npAction">Pausado</span>
					<span class="right" id="npTitle"></span>
				</div>
				<div id="audiowrap">
					<div class="ocultaPlayer" id="audio0">
						<audio preload id="audio1" controls="controls">Your browser does not support HTML5 Audio!</audio>
					</div>
					
					<div>
						<progress id="seekbar" value="0" max="1" style="width:100%;background-color:red;"></progress>
					</div>
					<div class="btnCmd">
						<a onclick="document.getElementById('audio1').play()"><img src="img/btnPlay.png"></a>
						<a onclick="document.getElementById('audio1').pause()"><img src="img/btnPauseStop.png"></a>
						<a onclick="document.getElementById('audio1').volume+=0.1"><img src="img/upVol.png"></a>
						<a onclick="document.getElementById('audio1').volume-=0.1"><img src="img/downVol.png"></a>
					</div>
					<div class="btnCmd" id="tracks">
						<a onmousedown="document.getElementById('audio1').currentTime-=2"><img src="img/btnVoltar.png"></a>
						<a onmousedown="document.getElementById('audio1').currentTime+=2"><img src="img/btnIr.png"></a>
						<a id="btnPrev"><img src="img/btnAnt.png"></a>
						<a id="btnNext"><img src="img/btnProx.png"></a>
					</div>
				</div>
				<div onclick="$('#lista-album').fadeToggle();" class="btn-version">PRIME 2</div>
				<div id="lista-album" class="lista-album">
					<div id="plwrap ">
						<ul id="plList"></ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

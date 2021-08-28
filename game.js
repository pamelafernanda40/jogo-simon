var coresBotoes = ["red", "blue", "green", "yellow"];
var padraoJogo = [];
var escolhasUsuario = [];
var iniciado = false;
var nivel = 0;

alert("Seja bem vindo ao Jogo!");

$(document).keypress(function () {
    if (!iniciado) {
        $("#level-title").text("Nível " + nivel);
        proximaSequencia();
        iniciado = true;
    }
});

$(".btn").click(function () {
    var corEscolhida = $(this).attr("id");
    escolhasUsuario.push(corEscolhida);
    tocarSom(corEscolhida);
    pressionarCor(corEscolhida);
    checarResposta(escolhasUsuario.length - 1);
});

function checarResposta(nivelAtual) {
    if (padraoJogo[nivelAtual] === escolhasUsuario[nivelAtual]) {
        if (escolhasUsuario.length === padraoJogo.length) {
            setTimeout(function () {
                proximaSequencia();
            }, 1000);
        }
    } else {
        tocarSom("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Fim do Jogo, pressione qualquer tecla para reiniciar");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        reiniciar();
    }
}

function proximaSequencia() {
    nivel++;
    $("#level-title").text("Nível " + nivel);
    var numeroAleatorio = Math.floor(Math.random() * 4);
    var corDefinida = coresBotoes[numeroAleatorio];
    padraoJogo.push(corDefinida);
    $("#" + corDefinida).fadeIn(100).fadeOut(100).fadeIn(100);
    tocarSom(corDefinida);
}

function pressionarCor(cor) {
    $("#" + cor).addClass("pressed");
    setTimeout(function () {
        $("#" + cor).removeClass("pressed");
    }, 100);
}

function tocarSom(cor) {
    var audio = new Audio("sounds/" + cor + ".mp3");
    audio.play();
}

function reiniciar() {
    nivel = 0;
    padraoJogo = [];
    escolhasUsuario = [];
    iniciado = false;
}
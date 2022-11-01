//ACARD.JS
class ACard {
  constructor(name, classe, id) {
    this.name = name;
    this.alt = name;
    this.class = classe;
    this.id = id;
  }

  buscarAlvosProximos() {
    const spot = document.querySelector(".selecionado").id;
    const proximo = (spot % 4) + 1;
    let anterior;
    spot == 1 ? (anterior = 4) : (anterior = spot - 1);
    return [anterior, proximo];
  }

  buscarAlvoSiProprio() {
    return document.querySelector(".selecionado").id;
  }

  buscarAlvoTodos() {
    const spot = document.getElementsByClassName("player selecionado")[0].id;
    return [...document.getElementsByClassName("player")]
      .map((element) => element.id)
      .filter((element) => element != spot);
  }

  selecionarAlvos([...array]) {
    for (let i of array) {
      document.getElementById(i).classList.add("alvos");
    }
  }


}

//APLAYER.JS
class APlayer extends ACard {
  constructor(name, pseudoname, id, hp = 5, range = 1) {
    super(name, "player", id);
    this.range = range;
    this.pseudoname = pseudoname;
    this.hp = hp;
    this.rand = [];
  }

  setHP(value) {
    this.hp = this.hp + sd;
  }
}

//BANG.JS
class Bang extends ACard {//rever exteds de card
  constructor(name, id) {
    super(name, id);
    this.atack = 1;
  }

  buscarAlvos() {
    return super.buscarAlvosProximos();
  }
}
//BEER.JS
class Beer extends ACard {
  constructor(name, id) {
    super(name, id);
    this.atack = 1;
  }

  buscarAlvos() {
    return super.buscarAlvoSiProprio();
  }
}

//ESQUIVA.JS
class Esquiva extends ACard {
  constructor(name, id) {
    super(name, id);
    this.atack = 1;
  }

  buscarAlvos() {
    return super.buscarAlvoSiProprio();
  }
}

// CLASSE
// HEAD
class Game {
  constructor(name) {
    this.name = name;
    const jogadores = [
      (document.getElementById("player1").innerHTML =
        document.getElementById("inputName1").value),
      (document.getElementById("player2").innerHTML =
        document.getElementById("inputName2").value),
      (document.getElementById("player3").innerHTML =
        document.getElementById("inputName3").value),
      (document.getElementById("player4").innerHTML =
        document.getElementById("inputName4").value),
    ];
    renderDeck(jogadores);

    this.cemytery = []; //toda carta usada vai para o cemiterio
    //(name, pseudoname, id)
    const carta1 = new Sheriff("xerife", jogadores[0], "1");
    const carta2 = new Renegade("renegado", jogadores[1], "2");
    const carta3 = new Outlaw("foradalei", jogadores[2], "3");
    const carta4 = new Outlaw("foradalei", jogadores[3], "4");
    this.player = [carta1, carta2, carta3, carta4];
    renderDeck(this.player);
    this.deck = []
    for (let i=5; i <=31; i++) {
      this.deck.push = new Bang("bang", i);
      this.deck.push = new Bang("beer", i)
      this.deck.push = new Bang("esquiva", i)
    }
  }

  renderDeck() {
    console.log("randomizar o deck ->> EMBARALHAR -> shufle");
    this.deck.sort(() => {
      return Math.random() - 0.5;
    });

    //capturar o board
    const board = document.getElementById("board");

    console.log(
      "iterar pela array do deck e criar as minhas cartas viradas para baixo"
    );
    this.deck.forEach((element) => {
      const imgBack = document.createElement("img"); // <img />
      imgBack.id = element.id;
      imgBack.src = element.verso;
      imgBack.alt = "carta virada";
      imgBack.className = "show cardBack";
      board.appendChild(imgBack);
      document.getElementById(element.id).classList.add(element.classe);
    });
  }

  flipCard(event) {
    const idCarta = event.currentTarget["id"];
    console.log(idCarta);
    if (
      document.getElementById(idCarta).classList.contains("turn", "selecionado")
    ) {
      console.log("Carta já foi selecionada");
    } else {
      document.getElementById(idCarta).src = this.deck.find(
        (element) => element.id == idCarta
      ).source;
      document.getElementById(idCarta).alt = this.deck.find(
        (element) => element.id == idCarta
      ).alt;
      document
        .getElementById(idCarta)
        .classList.add("selecionado", "cardFront");
      document.getElementById(idCarta).classList.remove("cardBack");
      if (document.querySelectorAll(".selecionado").length === 2) {
        //if (this.deck.filter(element => element.selecionado).length === 2)
        console.log("Duas cartas foram viradas. Vamos compara-las");
        this.checkPair();
      }
    }
  }
  //nessa etapa iremos configurar os turnos de cada jogador
  //ncompra carta; usa carta; uso bang; descartas cartas acima[cemytery]; fim de turno;
  turn() {
    //const carta1 = this.deck.find(element => element.selecionado);
    //const carta2 = this.deck.findLast(element => element.selecionado);
    let cartasId = [...document.querySelectorAll(".selecionado")].map(
      (element) => element.id
    );
    const idCarta1 = cartasId[0];
    const idCarta2 = cartasId[1];

    if (
      this.deck.find((element) => element.id == idCarta1).tipo ===
      this.deck.findLast((element) => element.id == idCarta2).tipo
    ) {
      console.log("Cartas são iguais!!");
      // criar um indicador de que as cartas já foram viradas
      for (let i of cartasId) document.getElementById(i).classList.add("turn");

      // checar o status do jogo
      this.checkStatus();
    } else {
      console.log("Cartas são diferentes!");
      // remover ponto do jogador
      //this.points--;
      //points.innerText = this.points;
      // desvirar as duas cartas
      setTimeout(() => {
        console.log("Fechando as cartas selecionadas");

        for (let i of cartasId) {
          document
            .getElementById(i)
            .classList.remove("selecionado", "cardFront");

          //alterando o fundo para carta de verso
          document.getElementById(i).src = this.verso;
          //alterando o alt para carta de verso
          document.getElementById(i).alt = "carta virada";

          document.getElementById(i).classList.add("cardBack");
        }
        //checar o status do jogo
        this.checkStatus();
      }, 1500);
    }
    // setar todas cartas como não selecionadas
    //this.deck.forEach(element, index => element.selecionado = false)
    setTimeout((event) => {
      for (let i of cartasId)
        document.getElementById(i).classList.remove("selecionado");
    }, 1500);
  }
  //chacar jogadores se alguem morreu, se alguem morreu e definir vencedodr
  checkStatus() {
    // checar o status do jogo
    console.log(
      "checando se o jogador ainda tem pontos OU se ele venceu o jogo!!"
    );
    console.log(this.points);
    // se o jogador ainda tem pontos -> perdeu
    if (this.points === 0) {
      console.log("Você perdeu por pontos");
      alert(`${this.player}, você não tem mais pontos! Tente novamente`);

      const board = document.querySelector("#board");
      board.classList.add("hide");
    }

    // ainda existem cartas para serem viradas -> ganhou
    const cardsTurn = document.querySelectorAll(".turn");
    if (cardsTurn.length === this.deck.length) {
      console.log("Venceu!!");
      alert(`${this.player} você venceu!!`);
    }
  }
}
/*
    class Card2 {
      constructor(name, classe, id, verso = `../../static/assets/img/fe.svg `) {
        this.name = name;
        this.classe = classe;
        this.id = id;
        this.verso = verso;
        this.source = `../../static/assets/img/${name}.svg `;
      }

      buscarAlvosProximos() {
        const spot = document.querySelector(".selecionado").id;
        const proximo = (spot % 4) + 1;
        let anterior;
        spot == 1 ? (anterior = 4) : (anterior = spot - 1);
        return [anterior, proximo];
      }

      buscarAlvoSiProprio() {
        return document.querySelector(".selecionado").id;
      }

      buscarAlvoTodos() {
        const spot =
          document.getElementsByClassName("player selecionado")[0].id;
        return [...document.getElementsByClassName("player")]
          .map((element) => element.id)
          .filter((element) => element != spot);
      }

      selecionarAlvos([...array]) {
        for (let i of array) {
          document.getElementById(i).classList.add("alvos");
        }
      }

      atacar([array]) {}
    }
    class CardPlayer2 extends Card2 {
      constructor(name, hp, range, pseudoname, id) {
        super(name, "player", id);
        this.hp = hp;
        this.range = range;
        this.pseudoname = pseudoname;
      }
    }
    class Xerife2 extends CardPlayer2 {
      constructor(name, hp, range, pseudoname, id) {
        super(name, hp, range, pseudoname, id);
      }
    }

  class CardAction2 extends Card2 {
      constructor(name, id) {
        super(name, "action", id);
      }

      buscarAlvosProximos() {
        const spot = document.querySelector(".selecionado").id;
        const proximo = (spot % 4) + 1;
        let anterior;
        spot == 1 ? (anterior = 4) : (anterior = spot - 1);
        return [anterior, proximo];
      }

      buscarAlvoSiProprio() {
        return document.querySelector(".selecionado").id;
      }

      buscarAlvoTodos() {
        const spot =
          document.getElementsByClassName("player selecionado")[0].id;
        return [...document.getElementsByClassName("player")]
          .map((element) => element.id)
          .filter((element) => element != spot);
      }

      selecionarAlvos([...array]) {
        for (let i of array) {
          document.getElementById(i).classList.add("alvos");
        }
      }

      atacar([array]) {}
    }

    class Bang2 extends CardAction2 {
      constructor(name, id) {
        super(name, id);
      }

      buscarAlvos() {
        return super.buscarAlvosProximos();
      }
    }
  */

function renderDeck(array) {
  console.log("randomizar o deck ->> EMBARALHAR -> shufle");
  array.sort(() => {
    return Math.random() - 0.5;
  });
}

//OUTLAW.JS
class Outlaw extends APlayer {
  constructor(name, pseudoname, id) {
    super(name, pseudoname, id);
  }
}

//RENEAGADE.JS
class Renegade extends APlayer {
  constructor(name, pseudoname, id) {
    super(name, pseudoname, id);
  }
}

//SELECTOR.JS
//capturando todos os elementos de html
const gameScreen = document.getElementById("gameScreen");
const gameScore = document.getElementById("gameScore");
const playerName = document.getElementById("name");
const board = document.getElementById("board");
//adicionar o event listener do submit
addEventListener("submit", () => {
  const game = new Game("game");
  // startScreen desapareça
  startScreen.classList.add("hide");
  // mostrar o gameScores
  gameScore.className = "show";
  game.renderDeck();
  settingUpGame(game);
});

function settingUpGame(game) {
  // capturar todas as cardsBack
  // adicionar a ela um eventlistener
  const allCardsBack = document.querySelectorAll(".cardBack");

  allCardsBack.forEach((cardBack) =>
    cardBack.addEventListener("click", (event) => game.flipCard(event))
  );
}

//SHERIFF.JS
class Sheriff extends APlayer {
  constructor(name, pseudoname, id) {
    super(name, pseudoname, id);
  }
}

//TARGET.JS
//recebe posicao,  analisar o range, ver posicao do alvos, usa carta
//buscar na mesa
class Target extends ACard {
  constructor(name, id, atack) {
    super(name, "action", id);
    this.atack = atack;
  }

  getAtack() {
    return this.atack;
  }

  buscarAlvosProximos() {
    const spot = document.querySelector(".selecionado").id;
    const proximo = (spot % 4) + 1;
    let anterior;
    spot == 1 ? (anterior = 4) : (anterior = spot - 1);
    return [anterior, proximo];
  }

  buscarAlvoSiProprio() {
    return document.querySelector(".selecionado").id;
  }

  buscarAlvoTodos() {
    const spot = document.getElementsByClassName("player selecionado")[0].id;
    return [...document.getElementsByClassName("player")]
      .map((element) => element.id)
      .filter((element) => element != spot);
  }

  selecionarAlvos([...array]) {
    for (let i of array) {
      document.getElementById(i).classList.add("alvos");
    }
  }  
}


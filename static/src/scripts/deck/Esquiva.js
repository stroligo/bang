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
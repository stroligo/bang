//WELLFARGO
class Wellfargo extends CardAction {
  constructor(name, id) {
    super(name, id);
  }

  buscarAlvos() {
    return super.buscarAlvoSiProprio();
  }
}
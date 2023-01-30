export class FabWindowError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "FabWindow Error"
  }
}

export class PropertyRequiredError extends FabWindowError {
  // #property: string;

  constructor(property: string) {
    super("No property: " + property)
    this.name = "PropertyRequiredError"
    // this.#property = property;
  }
}

export class WrongPropertyError extends FabWindowError {
  // #property: string;

  constructor(property: string) {
    super("Wrong property: " + property)
    this.name = "WrongPropertyError"
    // this.#property = property;
  }
}

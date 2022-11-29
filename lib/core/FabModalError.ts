export class FabModalError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'FabModal Error';
    }
}

export class PropertyRequiredError extends FabModalError {
    // #property: string;

    constructor(property: string) {
        super("No property: " + property);
        this.name = "PropertyRequiredError";
        // this.#property = property;
    }
}

export class WrongPropertyError extends FabModalError {
    // #property: string;

    constructor(property: string) {
        super("Wrong property: " + property);
        this.name = "WrongPropertyError";
        // this.#property = property;
    }

}
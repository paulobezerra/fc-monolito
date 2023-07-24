import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
  private _street: string;
  private _number: string;
  private _city: string;
  private _state: string;
  private _zip: string;
  private _complement?: string;

  constructor(
    street: string,
    number: string,
    city: string,
    state: string,
    zip: string,
    complement?: string
  ) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._complement = complement;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zip(): string {
    return this._zip;
  }

  get complement(): string | undefined {
    return this._complement;
  }
}

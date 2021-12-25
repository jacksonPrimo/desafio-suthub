interface _capitalInfo {
  latlng: Array<number>;
}
interface _car {
  side: string;
  signs: Array<string>;
}
interface _coatOfArms {
  png: string;
  svg: string;
}
interface _flags {
  png: string;
  svg: string;
}
interface _maps {
  googleMaps: string;
  openStreetMaps: string;
}
interface _name {
  common: string;
  nativeName: any;
  official: string;
}
export interface CountryInterface {
  altSpellings: Array<string>;
  area: number;
  capital: Array<string>;
  capitalInfo: _capitalInfo;
  car: _car;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: _coatOfArms;
  continents: Array<string>;
  flags: _flags;
  languages: any;
  latlng: Array<number>;
  maps: _maps;
  name: _name;
  population: number;
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: Array<string>;
}

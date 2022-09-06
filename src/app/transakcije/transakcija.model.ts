export class Transakcija {
  constructor(
    public id: string,
    public naslov: string,
    public podnaslov: string,
    public kategorija: string,
    public tipId: string,
    public iznos: number,
    public userId: string
  ) {}
}

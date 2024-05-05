export class LastfmImage {
  size: string;
  #text: string;

  public getImageUrl(): string {
    return this.#text;
  }
}

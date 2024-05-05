export class ModalImage {
  public title?: string;
  public images: ModalImageItem[];
  public content: string;
  public date: string;
  public url: string;
  public sourceSiteName: string;
}

export class ModalImageItem {
  public url: string;
  public description: string;
}

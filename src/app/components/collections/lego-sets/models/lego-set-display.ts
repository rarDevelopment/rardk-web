import { ModalImage } from 'src/app/components/shared/modal/models/modal-image';

export class LegoSetDisplay {
  public name: string;
  public owned: boolean;
  public built: boolean;
  public series: string;
  public url: string;
  public imageUrl: string;
  public previewUrl: string;
  public modalImage: ModalImage;
  public isModalVisible: boolean;
}

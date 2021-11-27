import { IObject } from "../interfaces/IObject";

class ObjectClass {

  getImage(object: IObject): string {
      const imagePath = '/images/characters/';
      const image = imagePath + object.name + '.png';

      return image;
    }
}

export default new ObjectClass();
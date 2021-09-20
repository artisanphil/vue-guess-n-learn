import { IObject } from "../interfaces/IObject";

class ObjectClass {

  getImage(object: IObject): string {
      const imagePath = process.env.VUE_APP_BACKEND + '/images/characters/test/';
      const image = imagePath + object.name + '.png';

      return image;
    }
}

export default new ObjectClass();
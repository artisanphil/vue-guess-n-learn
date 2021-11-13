import { get } from "../helpers/http";
import { IComputerGuess } from "../interfaces/IComputerGuess";
import Swal from 'sweetalert2'
import { IObject } from "../interfaces/IObject";
import ObjectClass from "../classes/ObjectClass";

class Guess {
    async getComputerQuestion(sentence?: string, computerChoice?: string): Promise<IComputerGuess> {
        if (sentence == null) {
            return await get<IComputerGuess>("/api/computer-guess");
        }

        const question: IComputerGuess = {} as IComputerGuess;
        question.choice = computerChoice ?? '';

        //@todo use tailwind
        const wrong = "<span style=\"color:red;\">Wrong!</span><br />";
        question.sentence = wrong + sentence;

        return question;
    }

    async displayGuessDialog(question: IComputerGuess): Promise<boolean>
    {
      let dialogButtons = Swal.mixin({
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
      });

      if(question.choice == '') {
          dialogButtons = Swal.mixin({
              confirmButtonText: 'OK',
        });
      }

      const objectSelected = await get<IObject>("/api/select");
      const image = ObjectClass.getImage(objectSelected)

      const dialog = await dialogButtons.fire({
        title: 'Computer Guess',
        html: '<img src="' + image + '" style="margin:auto; height: 40vh;">' + question.sentence,
        reverseButtons: true
      });

      return dialog.isConfirmed;
    }
}

export default new Guess();
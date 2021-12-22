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
        const wrong = "<span style=\"color:red;\">Wrong answer!</span><br />";
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

      const objectSelected = await get<IObject>("/api/select");
      const image = ObjectClass.getImage(objectSelected)
      let questionSentence = '';

      if (question.sentence != null) {
          questionSentence = question.sentence;
      }

      let popupContent = 'You have chosen<br><div id=your-selection-popup><img src="' + image + '" style="margin:auto; height: 40vh;"/></div>'
       + '<div style="display: inline-flex;"><div><img src="/images/logo.png" style="height:10vh;"></div><div style="align-self: end;"><h3>' + questionSentence + '</h3></div></div>';

      if(question.choice == '') {
          dialogButtons = Swal.mixin({
              confirmButtonText: 'OK',
        });
        popupContent = question.sentence;
      }

      const dialog = await dialogButtons.fire({
        title: 'Lingua\'s turn to guess',
        html: popupContent,
        reverseButtons: true
      });

      return dialog.isConfirmed;
    }
}

export default new Guess();
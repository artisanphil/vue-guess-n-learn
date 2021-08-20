import { get } from "../helpers/http";
import { IComputerGuess } from "../interfaces/IComputerGuess";
import Swal from 'sweetalert2'

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

      const dialog = await dialogButtons.fire({
        title: 'Computer Guess',
        html: question.sentence,
        reverseButtons: true
      });

      return dialog.isConfirmed;
    }
}

export default new Guess();
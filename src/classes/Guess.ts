import { get } from "../helpers/http";
import { i18n } from "../main";
import { IComputerGuess } from "../interfaces/IComputerGuess";
import Swal from 'sweetalert2'
import { IObject } from "../interfaces/IObject";
import ObjectClass from "../classes/ObjectClass";
import router from "@/router";

class Guess {
    async getComputerQuestion(count: number, question?: IComputerGuess): Promise<IComputerGuess> {
        if (question === undefined) {
            return await get<IComputerGuess>("/api/computer-guess");
        }

        question.choice = question.choice ?? '';

        if (count == 1) {
            const wrong = "<span style=\"color:red;\">" + i18n.global.t("WrongAnswer") + "</span><br />";
            question.sentence = wrong + question.sentence;
        } 

        return question;
    }

    async displayGuessDialog(question: IComputerGuess): Promise<boolean>
    {
      const objectSelected = await get<IObject>("/api/select");

      if(Object.keys(objectSelected).length == 0)
      {
            router.push('/session-timeout');

            throw new Error("objectSelected is empty");
      }

      let dialogButtons = Swal.mixin({
          showCancelButton: true,
          confirmButtonText: question.Yes,
          cancelButtonText: question.No,
      });

      const image = ObjectClass.getImage(objectSelected)
      let questionSentence = '';

      if (question.sentence != null) {
          questionSentence = question.sentence;
      }

      let popupContent = i18n.global.t("YouHaveChosen") + '<br><div id=your-selection-popup><img src="' + image + '" style="margin:auto; height: 40vh;"/></div>'
       + '<div style="display: inline-flex;"><div><img src="/images/icon.png" style="width: 50px; margin-top: 5px;"></div><div style="align-self: end; margin-left: 5px; margin-bottom: 5px;"><h3>' + questionSentence + '</h3></div></div>';

      if(question.choice == '') {
          dialogButtons = Swal.mixin({
              confirmButtonText: 'OK',
        });
        popupContent = question.sentence;
      }

      const dialog = await dialogButtons.fire({
        title: i18n.global.t("LinguaGuessTurn"),
        html: popupContent,
        reverseButtons: true,
      });

      return dialog.isConfirmed;
    }
}

export default new Guess();
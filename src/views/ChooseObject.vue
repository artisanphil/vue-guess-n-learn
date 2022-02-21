<template>
  <main class="container px-8 mx-auto mt-2 lg:px-4">
    <div class="flex" id="objectlist">
      <ObjectList
        :allObjects="allObjects"
        @messageFromChild="objectSelected"
      />
    </div>
  </main>
</template>

<style>
#your-selection-popup {
  border: 1px solid #ccc;
}

@media (orientation: landscape) {
  #container {
    margin-top: 1vh;
  }
  #commandLandscape h1 {
    font-size: 3vh;
    margin-top: 0.5vh;
    margin-bottom: 1vh;
  }
  #commandLandscape {
    height: 5vh;
  }
  #commandPortrait {
    display: none;
  }
  #objectlist {
    height: 86vh;
  }
}

@media (orientation: portrait) {
  #commandPortrait {
    height: 10vh;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  #commandLandscape {
    display: none;
  }
  #objectlist {
    flex-direction: column;
  }

  #objectselection {
    margin-top: 2vh;
  }
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ObjectList from "../components/ObjectList.vue";
import Swal from "sweetalert2";
import { IObject } from "../interfaces/IObject";
import GuessClass from "../classes/Guess";
import ObjectClass from "../classes/ObjectClass";
import { get, post } from "../helpers/http";
import { translate } from "../helpers/translate";
import router from "../router";
import { IComputerGuess } from "../interfaces/IComputerGuess";

@Options({
  data: () => {
    return {
      yourSelection: "",
      characterSelected: false,
      displayAskButton: false,
      displayCommand: true,
      allObjects: [],
      matchingObjectsCount: 0,
      yourName: "",
    };
  },
  components: {
    ObjectList,
  },
})
export default class ChooseObject extends Vue {
  protected yourName: string = "" as string;
  protected yourSelection: string = "" as string;
  protected characterSelected: boolean = false as boolean;
  protected displayAskButton: boolean = false as boolean;
  protected displayCommand: boolean = true as boolean;
  protected objectSelectDisabled: boolean = false as boolean;
  protected allObjects: Array<IObject> = [];
  protected matchingObjectsCount: number = 24 as number;

  async created(): Promise<void> {
    let objectResponse = await get<any>("/api/objects");
    this.allObjects = objectResponse.objects;
    this.matchingObjectsCount = objectResponse.remaining_count_user;
    let remainingComputerCount = objectResponse.remaining_count_computer;

    let objectSelected = localStorage.getItem("objectSelected") == "true";

    if (objectSelected || Object.keys(this.$route.params).length > 0) {
      this.characterSelected = true;

      if (this.matchingObjectsCount > 1) {
        let dialogButtons = Swal.mixin({
          showCancelButton: true,
          confirmButtonText: this.$t("NoContinue"),
          cancelButtonText: this.$t("Yes"),
        });

        let remainingText = this.$t("You") + ": <strong>" + this.matchingObjectsCount + "</strong><br>";
            remainingText += "Lingua: <strong>" + remainingComputerCount + "</strong><br>"; 

        const dialog = await dialogButtons.fire({
          width: '400px',
          title: this.$t("RemainingCharacters"),
          html: remainingText + "<br>" + this.$t("GuessNow"),
          reverseButtons: true,
        });

        if (dialog.isConfirmed) {
          this.computerGuess(0);
        }

      } else {
        Swal.fire({
          title: this.$t("OnlyOneLeft"),
          text: this.$t("ClickRemaining"),
        });
      }
    } else {
      await Swal.fire({
        title: '<img src="/images/icon.png" style="display:inline-flex; width: 40px; margin-bottom: 10px;" /> '
              + translate("IAmLingua", localStorage.getItem('learn-language')),
        input: 'text',
        inputLabel: translate("whatIsYourName", localStorage.getItem('learn-language')),
        inputValue: localStorage.getItem('name') ?? '',
        showCancelButton: false,
        inputValidator: (value) => {
          if (!value) {
            return this.$t("NameRequired")
          }
        }
        }).then((result) => {
          localStorage.setItem('name', result.value);

          Swal.fire({
            title: this.$t("YouChooseFirst"),
            html: this.$t("ChooseACharacter"),
          });
        });
    }
  }

  async objectSelected(objects: Array<IObject>, index: number): Promise<void> {
    let name = objects[index].name;
    let object = objects[index];

    if (!object.active) {
      return;
    }

    //user wins
    if (this.matchingObjectsCount == 1) {
      return this.guessObject(name);
    }

    if (!this.characterSelected) {
      if (this.objectSelectDisabled) return;
      this.displaySelection(name, object);
    } else {
      this.readyToGuessPopup(name);
    }
  }

  async computerGuess(count: number, question?: IComputerGuess): Promise<void> {
    if (count === undefined) {
      count = 0;
    }

    question = await GuessClass.getComputerQuestion(count, question);

    let answer = await GuessClass.displayGuessDialog(question);

    if (question.choice == "") {
      router.push({ name: "GameOver", params: { win: "false" } });
      return;
    }

    const data = { correct: answer, choice: question.choice };
    let response = await post<any>("/api/computer-guess", data);

    if (answer !== response.correct) {
      count++;
      return await this.computerGuess(count, question);
    }

    router.push("pick-attribute");
  }

  async guessObject(name: string): Promise<void> {
    const data = { name: name };

    let response = await post<any>("/api/user-guess/object", data);

    router.push({ name: "GameOver", params: { win: response.correct } });
  }

  async displaySelection(name: string, object: IObject): Promise<void> {
    const data = { selection: name, yourName: localStorage.getItem('name') };
    let image = ObjectClass.getImage(object);
    await Swal.fire({
      title: this.$t("YouHaveChosen"),
      html: '<img src="' + image + '" style="margin:auto; height: 40vh;">',
      cancelButtonText: this.$t("Cancel"),
      showCancelButton: true,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.objectSelectDisabled = true;
        post<any>("/api/select", data).then(() => {
          localStorage.removeItem("qNumber");
          localStorage.setItem("objectSelected", "true");
          this.yourSelection = ObjectClass.getImage(object);
          this.characterSelected = true;
          this.displayCommand = false;
          this.computerSelection();
        });
      }
    });
  }

  async computerSelection(): Promise<void> {
    await Swal.fire({
      title: this.$t("LinguaTurnChoose"),
      text: this.$t("LinguaIsSelecting"),
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      Swal.fire({
        title: this.$t("LinguaMadeChoice"),
        html:
          '<img src="/images/characters/unknown.png" style="margin:auto; height: 40vh;">',
      }).then(() => {
        this.computerGuess(0);
      });
    });
  }

  async readyToGuessPopup(name: string): Promise<void> {
    await Swal.fire({
      title: this.$t("AreYouSure", { name: name }),
      html:
        '<p style="color:red;">Warning! If you get this wrong you\'ll lose.</p>Click "Continue" to ask more questions.',
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Continue",
      confirmButtonText: "Confirm",
    }).then((result) => {

      if (result.isConfirmed) {
        this.guessObject(name);
      } 
      if (result.dismiss === Swal.DismissReason.cancel) {
        this.computerGuess(0);
      }
    });
  }
}
</script>

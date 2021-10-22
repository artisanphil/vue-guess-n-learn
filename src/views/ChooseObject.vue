<template>
  <main class="container px-8 mx-auto lg:px-4">
    <div id="commandLandscape" v-show="displayCommand">
      <h1 class="text-center">
        Please choose a character for the computer to guess
      </h1>
    </div>
    <div class="flex" id="objectlist">
      <ObjectList @messageFromChild="objectSelected" />
      <SelectedCharacter
        v-if="characterSelected"
        :yourSelection="yourSelection"
        :displayAskButton="displayAskButton"
        @messageFromChild="computerGuess"
      />
      <div id="commandPortrait" v-show="displayCommand">
        <h1 class="text-center">
          Please choose a character for the computer to guess
        </h1>
      </div>
    </div>
  </main>
</template>

<style>
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
    height: 92vh;
  }
}

@media (orientation: portrait) {
  #commandPortrait h1 {
    margin-top: 1vh;
    margin-bottom: 2vh;
  }
  #commandPortrait {
    height: 15vh;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  #commandLandscape {
    display: none;
  }
  #objectlist {
    height: 99vh;
    flex-direction: column-reverse;
  }
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ObjectList from "../components/ObjectList.vue";
import SelectedCharacter from "../components/SelectedCharacter.vue";
import Swal from "sweetalert2";
import { IObject } from "../interfaces/IObject";
import GuessClass from "../classes/Guess";
import ObjectClass from "../classes/ObjectClass";
import { get, post } from "../helpers/http";
import router from "../router";

@Options({
  data: () => {
    return {
      yourSelection: "",
      characterSelected: false,
      displayAskButton: false,
      displayCommand: true,
    };
  },
  components: {
    ObjectList,
    SelectedCharacter,
  },
})

export default class ChooseObject extends Vue {
  protected yourSelection: string = "" as string;
  protected characterSelected: boolean = false as boolean;
  protected displayAskButton: boolean = false as boolean;
  protected displayCommand: boolean = true as boolean;

  async created(): Promise<void> {
    if (Object.keys(this.$route.params).length > 0) {
      let objectSelected = await get<IObject>("/api/select");

      this.yourSelection = ObjectClass.getImage(objectSelected);
      this.characterSelected = true;
      this.displayAskButton = true;
      this.displayCommand = false;
    }
  }

  async objectSelected(objects: Array<IObject>, index: number): Promise<void> {
    let name = objects[index].name;
    let object = objects[index];

    if(!object.active) {
      return;
    }

    if (!this.characterSelected) {
      this.displaySelection(name, object);
    } else {
      this.readyToGuessPopup(name);
    }
  }

  async computerGuess(
    sentence?: string,
    computerChoice?: string
  ): Promise<void> {
    let question = await GuessClass.getComputerQuestion(
      sentence,
      computerChoice
    );
    let answer = await GuessClass.displayGuessDialog(question);

    if (question.choice == "") {
      router.push("game-over");
      return;
    }

    const data = { correct: answer, choice: question.choice };
    let response = await post<any>("/api/computer-guess", data);

    if (answer !== response.correct) {
      return this.computerGuess(question.sentence, question.choice);
    }

    router.push("pick-attribute");
  }

  async guessObject(name: string): Promise<void> {
    const data = { name: name };

    let response = await post<any>("/api/user-guess/object", data);

    if(response.correct) {
      router.push("game-over");
    } else {
        await Swal.fire({
          title: "Your Guess",
          text: "Unfortunately your guess is wrong. Click on \"Continue\" to ask more questions.",
        });
    }

  }

  async displaySelection(name: string, object: IObject): Promise<void> {
    const data = { selection: name };
    const ok = await Swal.fire({
      title: "Your selection",
      text: "You have selected " + name,
      reverseButtons: true,
    });

    if (ok) {
      await post<any>("/api/select", data);
      this.yourSelection = ObjectClass.getImage(object);
      this.characterSelected = true;
      this.displayCommand = false;
      this.computerGuess();
    }
  }

  async readyToGuessPopup(name: string): Promise<void> {
    await Swal.fire({
      title: `Are you sure "${name}" is the correct character?`,
      text: 'Click "Continue" to ask more questions.',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Continue",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        this.guessObject(name);
      } else {
        this.computerGuess();
      }
    });
  }
}
</script>
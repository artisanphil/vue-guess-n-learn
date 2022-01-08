<template>
  <main class="container px-8 mx-auto mt-2 lg:px-4">
    <div class="flex" id="objectlist">
      <ObjectList 
        :allObjects="allObjects" 
        :matchingObjects="matchingObjects"
        @messageFromChild="objectSelected" />
      <SelectedCharacter
        v-if="characterSelected"
        :yourSelection="yourSelection"
        :displayAskButton="displayAskButton"
        :matchingObjectsCount="matchingObjectsCount"
        @messageFromChild="computerGuess"
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
import SelectedCharacter from "../components/SelectedCharacter.vue";
import Swal from "sweetalert2";
import { IObject } from "../interfaces/IObject";
import GuessClass from "../classes/Guess";
import ObjectClass from "../classes/ObjectClass";
import { get, post } from "../helpers/http";
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
      matchingObjects: [],
      matchingObjectsCount: 0,
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
  protected objectSelectDisabled: boolean = false as boolean;
  protected allObjects: Array<IObject> = [];
  protected matchingObjects: Array<any> = [];
  protected matchingObjectsCount: number = 0 as number;

  async created(): Promise<void> {    
    let matchingJSON = this.$route.params.matching;

    if(matchingJSON) {
      this.matchingObjects = JSON.parse(matchingJSON.toString());
      this.matchingObjectsCount = this.matchingObjects.length;
    }

    this.allObjects = await get<Array<IObject>>("/api/index");

    if (Object.keys(this.$route.params).length > 0) {
      window.scrollTo(0,document.body.scrollHeight);
      let objectSelected = await get<IObject>("/api/select");

      this.yourSelection = ObjectClass.getImage(objectSelected);
      this.characterSelected = true;
      this.displayAskButton = true;
      this.displayCommand = false;
    } else {
      Swal.fire({
        title: "Your turn",
        text: 'Please choose a character for Lingua to guess'
      });
    }
  }

  async objectSelected(objects: Array<IObject>, index: number): Promise<void> {
    let name = objects[index].name;
    let object = objects[index];

    if(!object.active) {
      return;
    }

    if (!this.characterSelected) {
      if (this.objectSelectDisabled) return;

      this.objectSelectDisabled = true;
      this.displaySelection(name, object);
    } else {
      this.readyToGuessPopup(name);
    }
  }

  async computerGuess(
    count: number,
    question?: IComputerGuess
  ): Promise<void> {
    if(count === undefined) {
      count = 0
    }

    question = await GuessClass.getComputerQuestion(
      count,
      question
    );    

    let answer = await GuessClass.displayGuessDialog(question);

    if (question.choice == "") {
      router.push({ name: "GameOver", params: { win: 'false' } });
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
    const data = { selection: name };
    let image = ObjectClass.getImage(object)
    await Swal.fire({
      title: "Your selection",
      html: '<img src="' + image + '" style="margin:auto; height: 40vh;">',
      showCancelButton: true,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        post<any>("/api/select", data).then(() => {
            localStorage.removeItem('qNumber');
            this.yourSelection = ObjectClass.getImage(object);
            this.characterSelected = true;
            this.displayCommand = false;
            this.computerSelection();
        })
      }
    });
  }

  async computerSelection(): Promise<void> {
    await Swal.fire({
      title: "Lingua's turn to choose",
      text: 'Lingua is selecting a character for you to guess...',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      }).then(() => {
        Swal.fire({
          title: 'Lingua has made a choice',
          html: '<img src="/images/characters/unknown.png" style="margin:auto; height: 40vh;">',
          }).then(() => {
              this.computerGuess(0);
          });
      });
  }

  async readyToGuessPopup(name: string): Promise<void> {
    await Swal.fire({
      title: `Are you sure "${name}" is the correct character?`,
      html: '<p style="color:red;">Warning! If you get this wrong you\'ll lose.</p>Click "Continue" to ask more questions.',
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Continue",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        this.guessObject(name);
      } else {
        this.computerGuess(0);
      }
    });
  }
}
</script>
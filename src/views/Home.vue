<template>
  <h1 class="text-center text-xl mt-4">
    Please choose a character for the computer to guess
  </h1>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex">
      <ObjectList @messageFromChild="objectSelected" />
      <div class="flex-auto lg:w-1/5">
        <h3 class="text-lg">Your character</h3>
        <div id="your-selection">
          {{ yourSelection }}
        </div>
      </div>
    </div>
  </main>
  <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ObjectList from "../components/ObjectList.vue";
import ConfirmDialogue from "../components/ConfirmDialogue.vue";
import { IComputerGuess } from "../interfaces/IComputerGuess";
import { IObject } from "../interfaces/IObject";
import { get, post } from "../helpers/http";

@Options({
  props: {
    msg: String,
  },
  data: () => {
    return {
      yourSelection: "",
    };
  },
  components: {
    ObjectList,
    ConfirmDialogue,
  },
})
export default class Home extends Vue {

  $refs!: {
    confirmDialogue: InstanceType<typeof ConfirmDialogue>;
  };

  msg!: string;
  protected yourSelection: IObject = {} as IObject;

  async objectSelected(objects: Array<IObject>, index: number): Promise<void> {
    let name = objects[index].name;
    const data = { selection: name };

    const ok = await this.$refs.confirmDialogue.show({
      title: "Your selection",
      message: "You have selected " + name,
      okButton: "OK",
    });

    if (ok) {
      await post<any>("/api/select", data);
      this.yourSelection = objects[index];
      this.guess();
    }
  }

  async guess(sentence?: string, computerChoice?: string): Promise<void> {

    let message = "";

    //@todo needs to be refactored
    if (sentence == null) {
      let question = await get<IComputerGuess>("/api/computer-guess");
      sentence = question.sentence;
      message = sentence;
      computerChoice = question.choice;
    }
    else {
      //@todo use tailwind
      let wrong = "<span style=\"color:red;\">Wrong!</span><br />";
      message = wrong + sentence;
    }

    const answer = await this.$refs.confirmDialogue.show({
      title: "Computer Guess",
      message: message,
      okButton: "Yes",
      cancelButton: "No",
    });

    const data = { correct: answer, choice: computerChoice };
    let response = await post<any>("/api/computer-guess", data);

    if(answer !== response.correct) {
      this.guess(sentence, computerChoice);
    }
  }
}
</script>

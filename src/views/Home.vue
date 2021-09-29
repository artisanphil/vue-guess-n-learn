<template>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <h1 class="text-center text-2xl mt-4 pb-4">
      Please choose a character for the computer to guess
    </h1>
    <div class="flex">
      <ObjectList @messageFromChild="objectSelected" />
      <SelectedCharacter
        v-if="characterSelected"
        :yourSelection="yourSelection"
        :displayAskButton="displayAskButton"
        @messageFromChild="guess"
      />
    </div>
  </main>
</template>

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
    };
  },
  components: {
    ObjectList,
    SelectedCharacter,
  },
})
export default class Home extends Vue {
  protected yourSelection: string = "" as string;
  protected characterSelected: boolean = false as boolean;
  protected displayAskButton: boolean = false as boolean;

  async created(): Promise<void> {
    if (Object.keys(this.$route.params).length > 0) {
      let objectSelected = await get<IObject>("/api/select");

      this.yourSelection = ObjectClass.getImage(objectSelected);
      this.characterSelected = true;
      this.displayAskButton = true;
    }
  }

  async objectSelected(objects: Array<IObject>, index: number): Promise<void> {
    let name = objects[index].name;
    const data = { selection: name };

    const ok = await Swal.fire({
      title: "Your selection",
      text: "You have selected " + name,
      reverseButtons: true,
    });

    if (ok) {
      await post<any>("/api/select", data);
      this.yourSelection = ObjectClass.getImage(objects[index]);
      this.characterSelected = true;
      this.guess();
    }
  }

  async guess(sentence?: string, computerChoice?: string): Promise<void> {
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
      return this.guess(question.sentence, question.choice);
    }

    router.push("pick-attribute");
  }
}
</script>

<style>
@media (min-width: 668px) {
}
</style>

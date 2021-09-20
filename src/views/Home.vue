<template>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex-auto  md:hidden lg:hidden mx-auto">
      <h3 class="text-lg">Your character</h3>
      <div id="your-selection" class="w-20 mx-auto">
        <img v-bind:src="yourSelection" />
      </div>
      <!-- <div id="ask" class="my-2">
        <button @click="guess()" class="swal2-confirm swal2-styled">Continue</button>
      </div> -->
    </div>
    <h1 class="text-center text-2xl mt-4 pb-4">
      Please choose a character for the computer to guess
    </h1>
    <div class="flex">
      <ObjectList @messageFromChild="objectSelected" />
      <div class="flex-auto hidden md:block md:2/6">
        <h3 class="text-lg">Your character</h3>
        <div id="your-selection">
          <img v-bind:src="yourSelection" />
        </div>
        <!-- <div id="ask" class="my-2">
          <button @click="guess()" class="swal2-confirm swal2-styled">Continue</button>
        </div> -->
      </div>
    </div>
    
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ObjectList from "../components/ObjectList.vue";
import Swal from 'sweetalert2'
import { IObject } from "../interfaces/IObject";
import GuessClass from "../classes/Guess";
import ObjectClass from "../classes/ObjectClass";
import { get, post } from "../helpers/http";
import router from '../router';

@Options({
  data: () => {
    return {
      yourSelection: "",
    };
  },
  components: {
    ObjectList,
  },
})
export default class Home extends Vue {
  protected yourSelection: string = '' as string;

  async created(): Promise<void>  {
    if(Object.keys(this.$route.params).length > 0) {
      let objectSelected = await get<IObject>("/api/select");

      this.yourSelection = ObjectClass.getImage(objectSelected);
    }
  }

  async objectSelected(objects: Array<IObject>, index: number): Promise<void> {
    let name = objects[index].name;
    const data = { selection: name };

    const ok = await Swal.fire({
      title: "Your selection",
      text: "You have selected " + name,
      reverseButtons: true
    });

    if (ok) {
      await post<any>("/api/select", data);
      this.yourSelection = ObjectClass.getImage(objects[index]);
      this.guess();
    }
  }

  async guess(sentence?: string, computerChoice?: string): Promise<void> {
    let question = await GuessClass.getComputerQuestion(sentence, computerChoice);
    let answer = await GuessClass.displayGuessDialog(question);

    if(question.choice == '') {
      router.push('game-over');
      return;
    }

    const data = { correct: answer, choice: question.choice };
    let response = await post<any>("/api/computer-guess", data);

    if(answer !== response.correct) {
      return this.guess(question.sentence, question.choice);
    }

    router.push('pick-attribute');
  }
}
</script>

<style>
  @media (max-width: 768px) {

  }
</style>

<template>
  <div class="flex flex-wrap w-full justify-center">
    <div class="px-8 py-6 w-full max-w-6xl border-2 shadow m-1 text-2xl">
      <span v-html="sentence"></span>
      <br />
      <button @click="ask()" class="mt-5 text-sm swal2-confirm swal2-styled">
        Ask
      </button>
    </div>
  </div>
</template>

<style>
input[type="text"] {
  border: #cccccc solid 1px;
  margin-right: 3px;
  width: 120px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import { post } from "../helpers/http";

export default defineComponent({
	name: "GapQuestion",
  props: {
    questions: Object,
    attributeKey: String,
    attributeValue: String
  },
  data() {
    return {
      sentence: '',
      gap: '',
      value: '',
    };
  },
  methods: {
    getSentence(questions: any): string
    {
      return Object.values(questions as any[])[0];
    },
    displayQuestion(questions: any): void {
      let input = '<input type=text id="gap" />';
      let sentenceWithGap = this.getSentence(questions).replace('{gap}', input);
      this.sentence = sentenceWithGap;
    },
    async ask(): Promise<void> {
        let input = document.getElementById('gap') as HTMLInputElement;
        let data = {
          type: 'gap',
          chosenAttribute: this.attributeKey,
          answerAttribute: input.value
        };
        let response = await post<any>("/api/user-guess/verify-attribute", data);

        if(response.correct) {
          this.continue();
        } else {
            Swal.fire({
              title: `<h1 style='color:red;'>Wrong</h1>`,
              text: "Your answer is wrong!",
              showCancelButton: true,
              confirmButtonColor: "#808080",
              cancelButtonColor: "#7367f0",
              cancelButtonText: 'Try again',
              confirmButtonText: "Skip",
          }).then((result) => {
            if (result.isConfirmed) {
              this.continue();
            } else {
              Swal.close()
            }
          })
        }
    },
        continue(): void {
          let attributeKey = this.attributeKey as string;
          let attributeValue = this.attributeValue as string;
          let sentenceAnswer = this.getSentence(this.questions).replace('{gap}', attributeValue);
          let data = {
            choice: attributeKey,
            sentenceAnswer: sentenceAnswer
          }
          this.$emit('messageFromChild', data);
        }
      }
})
</script>

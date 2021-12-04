<template>
<div class="flex flex-wrap w-full justify-center">
        <div
          class="mchoice-item px-8 py-6 w-full max-w-6xl border-2 shadow m-1 hover:shadow-lg cursor-pointer text-2xl"
          :key="index"
          v-for="(question, index) in questions"
          id="{{ question.attribute }}"
          @click="select(index, question.attribute, question.sentence)"
          v-bind:class="{ 'border-red-400': wrongChoice[index]}"
        >
          {{ question.sentence }}
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { post } from "../helpers/http";

export default defineComponent({
	name: "MultipleChoice",
  props: {
    questions: Object,
    attributeKey: String
  },
  data() {
    return {
      wrongChoice: [
        false,
        false,
        false
      ]
    };
  },
  methods: {
    async select(index: number, questionAttribute: string, sentence: string): Promise<void>  {

        let data = {
          type: "multiple-choice",
          chosenAttribute: questionAttribute,
          answerAttribute: this.attributeKey
        };
        let response = await post<any>("/api/user-guess/verify-attribute", data);

        if(response.correct) {
          let data = {
            choice: questionAttribute,
            sentenceAnswer: sentence
          };
          this.$emit('messageFromChild', data);

          return;
        }

      this.wrongChoice[index] = true;
    }
  }
})
</script>

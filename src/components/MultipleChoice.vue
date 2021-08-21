<template>
<div class="flex flex-wrap w-full">
        <div class="w-full flex justify-center">{{ attribute }}</div>
        <div
          class="mchoice-item px-8 py-6 w-full border m-0.5 hover:shadow-lg cursor-pointer"
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

export default defineComponent({
	name: "MultipleChoice",
  props: {
    questions: Object,
    attribute: String
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
    select(index: number, questionAttribute: string, sentence: string): void {

      if(questionAttribute == this.attribute)
      {
        let data = {
          choice: questionAttribute,
          sentence: sentence
        };
        this.$emit('messageFromChild', data);

        return;
      }

      this.wrongChoice[index] = true;
    }
  }
})
</script>

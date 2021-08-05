<template>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex">
      <AttributeList v-show="displayAttributes" @messageFromChild="attributeSelected" />
      <MultipleChoice v-show="displayMChoice" :questions="questions" :attribute="attribute" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AttributeList from "../components/AttributeList.vue";
import MultipleChoice from "../components/MultipleChoice.vue";

export default defineComponent({
	name: "PickAttribute",
	data() {
		return {
			displayAttributes: true,
      displayMChoice: false,
      questions: [],
      attribute: ''
		};
	},
  components: {
    AttributeList,
    MultipleChoice
  },
	methods: {
      async attributeSelected(attributes: Array<string>, index: number): Promise<void> {
        this.attribute = attributes[index];
        this.displayAttributes = false;

        let url = `/api/user-guess?choice=${this.attribute}`;
        let response = await fetch(process.env.VUE_APP_BACKEND + url);
        let questionType = await response.headers.get('Question-Type');
        this.questions = await response.json();

        switch(questionType) {
          case 'multiple-choice':
            this.displayMChoice = true;
            break;
        }
    }
	},
});
</script>

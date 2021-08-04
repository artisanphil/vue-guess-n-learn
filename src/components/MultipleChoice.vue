<template>
<div class="flex flex-wrap w-full">
  Multiple Choice
        <div
          class="px-8 py-6 w-full border"
          :key="index"
          v-for="(question, index) in questions"
        >
          <a @click="select(index)">{{ question }}</a>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "MultipleChoice",
  props: {
    questions: Array
  },
  methods: {

  mounted() {
    //this.attributes = await get<Array<string>>("/api/remaining-attributes");
    console.log('#created#');
    console.log(this.questions);
  },

  select(index: number): void {
    //this.$emit('messageFromChild', this.attributes, index);
  }
  }
})
</script>

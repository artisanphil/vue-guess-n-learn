<template>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex">
      <AttributeList @messageFromChild="attributeSelected" />
    </div>
  </main>
  <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AttributeList from "../components/AttributeList.vue";
import ConfirmDialogue from "../components/ConfirmDialogue.vue";

@Options({
  components: {
    AttributeList,
    ConfirmDialogue,
  },
})
export default class Guess extends Vue {

  $refs!: {
    confirmDialogue: InstanceType<typeof ConfirmDialogue>;
  };
}
</script>

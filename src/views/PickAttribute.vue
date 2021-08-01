<template>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex">
      <AttributeList @messageFromChild="attributeSelected" />
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AttributeList from "../components/AttributeList.vue";

@Options({
  components: {
    AttributeList,
  },
})
export default class PickAttribute extends Vue {

  async attributeSelected(attributes: Array<string>, index: number): Promise<void> {
    let attribute = attributes[index];
    console.log(attribute);
  }
}
</script>

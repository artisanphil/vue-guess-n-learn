<template>
  <main class="px-8 pt-2 lg:px-4">
    <div>
      <AttributeList
        @messageFromChild="attributeSelected"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AttributeList from "../components/AttributeList.vue";
import { get } from "../helpers/http";
import router from "../router";

export default defineComponent({
  name: "PickAttribute",
  data() {
    return {
      questions: [],
      image: "",
    };
  },
  components: {
    AttributeList,
  },
  methods: {
    async attributeSelected(index: number): Promise<void> {
      let attributes = await get<Array<any>>("/api/remaining-attributes");
      let attributeKey = attributes[index]['key'];
      let attributeValue = attributes[index]['value'];

      router.push({ name: "AskQuestion", params: { attributeKey: attributeKey, attributeValue: attributeValue } });
    },
  },
});
</script>

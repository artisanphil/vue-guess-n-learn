<template>
  <main class="px-8 pt-2 lg:px-4">
    <div>
      <AttributeList
        @messageFromChild="attributeSelected"
      />
  
      <div class=mt-5>
        Ad: <a href="https://academy.mosalingua.com/mosaweb/?ref=982" class="text-red-800 underline" target="_blank">Memorize useful words and phrases with the powerful MosaLearning® method</a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AttributeList from "../components/AttributeList.vue";
import { get } from "../helpers/http";
import Swal from "sweetalert2";
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
  created(): void {
    Swal.fire({
      title: "Your turn to ask",
      text: 'Please select one of the images'
    });
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

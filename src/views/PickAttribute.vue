<template>
  <main class="px-8 pt-2 lg:px-4">
    <div>
      <AttributeList
        @messageFromChild="attributeSelected"
      />

    <div class=modal v-if="showObjectsModal">
      <div class="modal-content">        
        <ObjectList v-show="showObjects"
          :allObjects="allObjects" />

          <button @click="closeDisplayObjects()" class="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                    {{ $t("Close") }}
          </button>
      </div>  
    </div> 

    </div>
  </main>
</template>

<style>
.modal-content #objects:hover {
  box-shadow: none;
}

.modal-content .object {
  cursor: default;
}

@media (orientation: landscape) {
  .modal-content .object img {
    height: 16vh;
  }
}

@media (orientation: portrait) {
  .modal-content .object img {
    height: 11vh;
  }
}

</style>

<script lang="ts">
import { defineComponent } from "vue";
import AttributeList from "../components/AttributeList.vue";
import { get } from "../helpers/http";
import Swal from "sweetalert2";
import router from "../router";
import ObjectList from "../components/ObjectList.vue";
import { IObject } from "../interfaces/IObject";

export default defineComponent({
  name: "PickAttribute",
  data() {
    return {
      questions: [],
      image: "",
      showObjects: false,
      allObjects: [],
      showObjectsModal: false,
      displayAd: true,
    };
  },
  components: {
    AttributeList,
    ObjectList,
  },
  created(): void {
    if(localStorage.getItem('app-version') == 'true') {
      this.displayAd = false;
    }

    Swal.fire({
      title: this.$t("YourTurnAskLingua"),
      text: this.$t("SelectImage")
    });
  },
  methods: {
    async attributeSelected(index: number, showObjects: boolean): Promise<void> {

      if(showObjects) {        
        this.showObjects = true;
        await this.displayObjects();

        return;
      }

      let attributes = await get<Array<any>>("/api/remaining-attributes");
      let attributeKey = attributes[index]['key'];
      let attributeValue = attributes[index]['value'];

      router.push({ name: "AskQuestion", params: { attributeKey: attributeKey, attributeValue: attributeValue } });
    },
    async displayObjects(): Promise<void> {            
      this.showObjectsModal = true;
      let objectResponse = await get<any>("/api/objects");
      this.allObjects = objectResponse.objects; 
    },
    closeDisplayObjects(): void {
      this.showObjectsModal = false;
    }
  },
});
</script>

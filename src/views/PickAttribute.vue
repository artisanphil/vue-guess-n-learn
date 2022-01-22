<template>
  <main class="px-8 pt-2 lg:px-4">
    <div>
      <AttributeList
        @messageFromChild="attributeSelected"
      />

    <div class=modal v-if="showObjectsModal">
      <div class="modal-content">        
        <ObjectList v-show="showObjects"
          :allObjects="allObjects" 
          :matchingObjects="matchingObjects" />

          <button @click="closeDisplayObjects()" class="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                    Close
          </button>
      </div>  
    </div> 

      <div class=mt-5>
        Ad: <a href="https://academy.mosalingua.com/mosaweb/?ref=982" class="text-red-800 underline" target="_blank">Memorize useful words and phrases with the powerful MosaLearning® method</a>
      </div>
    </div>
  </main>
</template>

<style>

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 10px auto; /* 15% from the top and centered */
  padding: 5px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.modal-content #objects:hover {
  box-shadow: none;
}

.modal-content .object {
  cursor: default;
}

.modal-content .object img {
  height: 16vh;
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
      matchingObjects: [],
      showObjectsModal: false,
    };
  },
  components: {
    AttributeList,
    ObjectList,
  },
  created(): void {
    Swal.fire({
      title: "Your turn to ask Lingua",
      text: 'Please select one of the images'
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
      this.matchingObjects = await get<Array<any>>("/api/remaining-objects");
      this.allObjects = await get<Array<IObject>>("/api/index");      
    },
    closeDisplayObjects(): void {
      this.showObjectsModal = false;
    }
  },
});
</script>

<template>
<div class="flex flex-wrap lg:w-4/5">
        <div
          class="px-8 py-6 lg:w-1/3 md:w-full border hover:shadow-lg cursor-pointer"
          :key="index"
          v-for="(object, index) in objects"
          @click="select(index)"
        >
          <img v-bind:src="object.image" />
        </div>
      </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { IObject } from "../interfaces/IObject";
import ObjectClass from "../classes/ObjectClass";
import { get } from "../helpers/http";

export default class ObjectList extends Vue {

  protected objects: Array<IObject> = [];

  async created(): Promise<void> {
    let allObjects = await get<Array<IObject>>("/api/index");

    this.objects = this.setObjectsActiveState(allObjects);
  }

  select(index: number): void {
    this.$emit('messageFromChild', this.objects, index);
  }

  setObjectsActiveState(allObjects: Array<IObject>): Array<IObject> {
    let matchingJSON = this.$route.params.matching;
    let matchingNames = [];

    if(matchingJSON) {
      matchingNames = JSON.parse(matchingJSON.toString());
    }

    for(var i=0; i<allObjects.length; i++){
      let active = true;
      const imagePath = process.env.VUE_APP_BACKEND + '/images/characters/';
      let image = ObjectClass.getImage(allObjects[i]);

      if(matchingNames.length > 0) {
        active = matchingNames.indexOf(allObjects[i].name) > -1;
      }

      if(!active) {
        image = imagePath + 'hidden.png';
      }

      allObjects[i].image = image;
    }

    return allObjects;
  }
}
</script>

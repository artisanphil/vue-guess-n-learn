<template>
<div  id="container" class="grid w-full">
        <div
          id="objects"
          class="border hover:shadow-lg cursor-pointer"
          :key="index"
          v-for="(object, index) in objects"
          @click="select(index)"
        >
        <div class="object" :style="{'background-image':'url(' + object.image + ')'}"></div>
        </div>
      </div>
</template>

<style>
@media (orientation: landscape) {
  #container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  #objects {
    height: 100%;
  }
  .object {
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 14.5vh;
  }
}

</style>

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

<template>
<div  id="container" class="grid w-full">
        <div
          id="objects"
          class="border hover:shadow-lg"
          :key="index"
          v-for="(object, index) in objects"
          @click="select(index)"
        >
        <div v-bind:class="{ active: object.active}" v-bind:id="object.name" class="object" :style="{'background-image':'url(' + object.image + ')'}">
          <img v-bind:src="object.front" />
        </div>
        </div>
      </div>
</template>

<style>
#objects {
  height: 100%;
}
.object {
  background-repeat: no-repeat;
  background-position: center;
  opacity: 20%;
}

.object img {
  padding: 1vh;
  margin: auto;
}

.active {
  cursor: pointer;
  opacity: 100%;
}

@media (orientation: landscape) {
  #container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  #objects {
    height: 100%;
  }
  .object {
    height: 100%;
    background-size: 13vh;
  }

  .object img {
    height: 15vh;
  }
}

@media (orientation: portrait) {
  #container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .object {
    height: 10vh;
    background-size: 8vh;
  }

  .object img {
    height: 10vh;
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
      let image = ObjectClass.getImage(allObjects[i]);

      if(matchingNames.length > 0) {
        active = matchingNames.indexOf(allObjects[i].name) > -1;
      }

      let front = 'images/transparent.png';

      if(!active) {
        front = 'images/stop.png';
      }

      allObjects[i].active = active;
      allObjects[i].image = image;
      allObjects[i].front = front;
    }

    return allObjects;
  }
}
</script>

<template>
<div  id="container" class="grid w-full">
        <div
          id="objects"
          class="border"
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

#objects:hover {
  box-shadow: 1 1 #0000;
}

.object {
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.2;
}

.object img {
  padding: 1vh;
  margin: auto;
}

.active {
  cursor: pointer;
  opacity: 1;
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
import { IObject } from "../interfaces/IObject";
import ObjectClass from "../classes/ObjectClass";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ObjectList",
  props: {
    allObjects: Array,
  },
  data() {
    return {
      objects: []      
    }
  },
  watch: { 
    allObjects: function() { 
      this.objects = this.setObjectsActiveState(this.allObjects);
    }
  },
  methods: {
    select(index: number): void {
      this.$emit('messageFromChild', this.objects, index);
    },
    setObjectsActiveState(allObjects: Array<IObject>): Array<IObject> {

      for(var i=0; i<allObjects.length; i++){
        let image = ObjectClass.getImage(allObjects[i]);
        let active = allObjects[i]['active'];

        let front = 'images/transparent.png';

        if(!active) {
          front = 'images/stop.png';
        }

        allObjects[i].image = image;
        allObjects[i].front = front;
      }

      return allObjects;
    }
  }
});
</script>

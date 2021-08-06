<template>
<div class="flex flex-wrap lg:w-4/5">
        <div
          class="px-8 py-6 lg:w-1/3 md:w-full border hover:shadow-lg cursor-pointer"
          :key="index"
          v-for="(object, index) in objects"
          @click="select(index)"
        >
          {{ object.name }}
          <br />
          {{ object.attributes }}
        </div>
      </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { IObject } from "../interfaces/IObject";
import { get } from "../helpers/http";

export default class ObjectList extends Vue {

  protected objects: Array<IObject> = [];

  async created(): Promise<void> {
    this.objects = await get<Array<IObject>>("/api/index");
  }

  select(index: number): void {
    this.$emit('messageFromChild', this.objects, index);
  }
}
</script>

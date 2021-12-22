<template>
  <div id="container" class="grid w-full">
    <div
      class="attributes border hover:shadow-lg cursor-pointer"
      style="width: 100%; vertical-align: center"
      :key="index"
      v-for="(attribute, index) in attributes"
      @click="select(index)"
    >
      <div class="attributeText" v-resize-text="{minFontSize: '12px', maxFontSize: '18px', delay: 200}">
        {{ attribute.name }}
      </div>
      <img class="attributeImage inline" v-bind:src="attribute.image" />
    </div>
  </div>
</template>

<style>
@media (orientation: landscape) {
  #container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .attributes {
    height: 18vh;
    block-size: fit-content;
  }
  .attributeText {
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
    font-size: 3vh;
    white-space: nowrap;
  }
  .attributeImage {
    height: 11.5vh;
  }
}

@media (orientation: portrait) {
  #container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  #attributes {
    height: 13vh;
  }
  .attributeText {
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
    font-size: 2vh;
    white-space: nowrap;
  }
  .attributeImage {
    height: 8vh;
  }
}
</style>

<script lang="ts">
import { Vue } from "vue-class-component";
import { IAttribute } from "../interfaces/IAttribute";
import { get } from "../helpers/http";

export default class AttributeList extends Vue {
  protected attributes: Array<IAttribute> = [];

  async created(): Promise<void> {
    let attributes = await get<Array<any>>("/api/remaining-attributes");

    const imagePath = "/images/character-attributes/";
    let allAttributes: IAttribute[] = [];

    for (var i = 0; i < attributes.length; i++) {
      let image = imagePath + attributes[i]["key"].replace(" ", "-") + ".png";
      let attribute = { name: attributes[i]["value"], image: image };
      allAttributes[i] = attribute;
    }

    this.attributes = allAttributes;
  }

  select(index: number): void {
    this.$emit("messageFromChild", index);
  }
}
</script>

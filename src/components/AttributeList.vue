<template>
  <div id="container" class="grid w-full">
    <div
      id="attributes"
      class="border hover:shadow-lg cursor-pointer"
      style="width: 100%; vertical-align: center"
      :key="index"
      v-for="(attribute, index) in attributes"
      @click="select(index)"
    >
      <div class="attributeText">
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
  #attributes {
    height: 19vh;
  }
  .attributeText {
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
    font-size: 3vh;
  }
  .attributeImage {
    height: 13vh;
  }
}

@media (orientation: portrait) {
  #container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  #attributes {
    height: 14vh;
  }
  .attributeText {
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
    font-size: 2vh;
  }
  .attributeImage {
    height: 9vh;
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
    let attributes = await get<Array<string>>("/api/remaining-attributes");
    const imagePath =
      process.env.VUE_APP_BACKEND + "/images/character-attributes/";
    let allAttributes: IAttribute[] = [];

    for (var i = 0; i < attributes.length; i++) {
      let image = imagePath + attributes[i].replace(" ", "-") + ".png";
      let attribute = { name: attributes[i], image: image };
      allAttributes[i] = attribute;
    }

    this.attributes = allAttributes;
  }

  select(index: number): void {
    this.$emit("messageFromChild", index);
  }
}
</script>

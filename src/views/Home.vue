<template>
    <main id=home>
        <h1>Guess N Learn</h1>
        <div id=description>Like the game "Guess Who", but for language learning</div>

        <div id=selectLanguage class="flex">
          <figure>
              <img id="en_us"  src="images/languages/en_us.png" @click="selectLanguage('en_us')" />
              <figcaption>American English</figcaption>
          </figure>
          <figure>
            <img id="en_uk" src="images/languages/en_uk.png" @click="selectLanguage('en_uk')" />
              <figcaption>British English</figcaption>
          </figure>
        </div>
    </main>
</template>

<style>
  #home h1 {
    font-size: 5rem !important;
    line-height: 1;
  }

  #description {
    font-size: 2rem;
    margin-bottom: 10vh;
  }

  #selectLanguage {
    justify-content: center;;
  }
  #selectLanguage img {
    cursor: pointer;
    width: 20vh;
    margin-right: 2vw;
    margin-left: 2vw;
  }
</style>


<script lang="ts">
import { Vue } from "vue-class-component";
import { get } from "../helpers/http";
import router from "../router";

export default class Home extends Vue {

  async saveLanguage(languageCode: string): Promise<void> {
    await get<string>("/api/learn-language/" + languageCode);
  }
  async selectLanguage(languageCode: string): Promise<void> {
    await this.saveLanguage(languageCode);
    router.push("choose-object");
  }
}
</script>
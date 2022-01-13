<template>
    <main id=home>
        <div id=header>
          <div id=logo>
            <h1><img src="images/logo.png" alt="AskLingua"></h1>
           </div>
        </div>

        <div id=description>
          <p>Like the game "Guess Who", but for language learning</p>

          <img src="images/overview.png" class="inline">
          <br />
          <router-link to="/howto" class="text-base underline">How to play</router-link>
        </div>
      
        <div id=selectLangaugeText>Select the language you want to learn</div>
        <div id=selectLanguage class="flex flex-wrap">
          <div>
          <figure>
              <img id="en_us" class=flag src="images/languages/en_us.png" @click="selectLanguage('en_us')" />
              <figcaption>American English</figcaption>
          </figure>
          </div>
          <div>
          <figure>
            <img id="en_uk" class=flag src="images/languages/en_uk.png" @click="selectLanguage('en_uk')" />
              <figcaption>British English</figcaption>
          </figure>
          </div>
          <div>
          <figure>
            <img id="en_uk" class=flag src="images/languages/es_es.png" @click="selectLanguage('es_es')" />
              <figcaption>Spanish</figcaption>
          </figure>
          </div>
        </div>
        <br><br>
    </main>
</template>

<style>

  #home {
    /* max-width: 800px; */
    background-color: rgba(230,255,255,.2);
    color: #ff8c00;
    margin: 2vh auto;
    padding: 1vh;
  }

  #header {
    display: inline-block;
    margin-bottom: 0.5vh;
  }

  #header div {
    display: inline-block;
    margin: 0 10px;
    vertical-align: middle;
  }

  #home h1 {
    font-size: 3rem !important;
    line-height: 1;
  }

  h3 {
    font-size: 1.5rem !important;
  }

  #description {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1vh;
  }

  #selectLangaugeText {
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 1vh;
  }
  #selectLanguage {
    margin: 0 auto;
    max-width: 600px;
  }
  #selectLanguage > div {
    margin: 1vh auto;
    width: 33%;
  }

  #selectLanguage img {
    cursor: pointer;
    width: 60px;
    margin: 0 auto;
  }

  #stayinformed {
    margin-top: 2vh;
    color: #A52A2A;
  }

  #stayinformed p {
    line-height: 1.8;
  }

  .signup {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .signup a {
    text-decoration: underline;
  }

  @media (max-width:480px) {
    #header {
      margin-bottom: 1vh;
    }

    #detail {
      margin-bottom: 3vh;
    }

    #home {
      margin: 0 auto;
      border: none;
    }

    #selectLangaugeText {
      margin-left: 5vh;
      margin-right: 5vh;
    }

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
    localStorage.removeItem('objectSelected');
    localStorage.setItem('learn-language', languageCode);
    await this.saveLanguage(languageCode);
    router.push("choose-object");
  }
}
</script>
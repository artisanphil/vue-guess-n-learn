<template>
    <main id=home>
        <div id=header>
          <div id=logo><img src="images/logo.png" alt="logo"></div>
          <div>
            <h1>AskLingua</h1>
            <div id=description>
              <p>Like the game "Guess Who", but for language learning</p>
            </div>
          </div>
          <div id=filler></div>
        </div>

        <div id=detail><p>Play a game against Lingua the clever cockatoo,</p>
                      <p>by asking questions in the language you are learning.</p>
        </div>
        <div id=selectLangaugeText>Select the language you want to learn</div>
        <div id=selectLanguage class="flex flex-wrap">
          <div>
          <figure>
              <img id="en_us"  src="images/languages/en_us.png" @click="selectLanguage('en_us')" />
              <figcaption>American English</figcaption>
          </figure>
          </div>
          <div>
          <figure>
            <img id="en_uk" src="images/languages/en_uk.png" @click="selectLanguage('en_uk')" />
              <figcaption>British English</figcaption>
          </figure>
          </div>
          <div>
          <figure>
            <img id="en_uk" src="images/languages/es_es.png" @click="selectLanguage('es_es')" />
              <figcaption>Spanish</figcaption>
          </figure>
          </div>
        </div>
        <div id=stayinformed>
          <hr>
          <br />
          <h3>Stay informed on new features</h3>
          <p>We have many more things planned, for instance:</p>
          <p>Android/iOS app, leaderboard, more languages, other things to guess, etc. </p>
          <p class=signup><a href="https://twitter.com/AskLingua" target="_blank">Follow AskLingua on Twitter</a> or
          <a href="https://asklingua.us20.list-manage.com/subscribe?u=33a92fb170de7e1d490b68911&id=39ff1526de" target="_blank">subscribe to the newsletter.</a></p>
        </div>
    </main>
</template>

<style>
  body {
        background-color: rgb(230, 255, 255, 0.2);
  }

  main {
    background-color: #FFFFFF;
  }

  #home {
    max-width: 800px;
    margin: 2vh auto;
    border-radius: 25px;
    border: 2px solid #000099;
    color: #000099;
    padding: 1vh;
  }

  #header {
    display: inline-block;
    margin-bottom: 5vh;
  }

  #header div {
    display: inline-block;
    margin: 0 10px;
    vertical-align: middle;
  }

  #logo, #filler {
    width: 120px;
  }

  #logo > img{
    width: 120px;
    height: 120px;
  }

  #home h1 {
    font-size: 3rem !important;
    line-height: 1;
  }

  h3 {
    font-size: 1.5rem !important;
  }

  #description {
    font-size: 1.5rem;
    margin-bottom: 3vh;
  }

  #detail {
    margin: 0 auto;
    padding: 3px;
    width: 90%;
    max-width: 600px;
    border: 1px solid #ccc;
    box-shadow: 5px 5px;
    font-size: 1.2rem;
    margin-bottom: 5vh;
  }

  #selectLangaugeText {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1vh;
  }
  #selectLanguage {
    margin: 0 auto;
    max-width: 600px;
  }
  #selectLanguage > div {
    margin: 1vh auto;
  }

  #selectLanguage img {
    cursor: pointer;
    width: 20vh;
    margin-right: 2vw;
    margin-left: 2vw;
  }

  #stayinformed {
    margin-top: 2vh;
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
    await this.saveLanguage(languageCode);
    router.push("choose-object");
  }
}
</script>
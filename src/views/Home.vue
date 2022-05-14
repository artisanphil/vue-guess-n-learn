<template>
    <div class=modal v-if="showModal">
      <div class="modal-content">     
        <span @click="closeModal()" class="float-right text-lg cursor-pointer mr-1">&times;</span>   
        <HowTo v-if="showHowTo" />
        <ComingNext v-if="showComingNext" />

        <button @click="closeModal()" class="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                  {{ $t("Close") }}
        </button>
        <br><br>

      </div>  
    </div> 

    <main id=home>
        <div id=header>
          <div id=logo>
            <h1><img src="images/logo.png" alt="AskLingua"></h1>
           </div>
        </div>

        <div id=description>
          <p>{{ $t('description') }}</p>

          <img src="images/overview.png" class="inline mt-1">
          <br />
          <span @click="viewHowTo()" class="text-base underline cursor-pointer">{{ $t('howToPlay') }}</span>
        </div>
      
        <div id=selectLangaugeText>{{ $t('selectLanguage') }}</div>
        <div id=selectLanguage class="flex flex-wrap">
          <div>
          <figure>
              <img id="en_us" class=flag src="images/languages/en_us.png" @click="selectLanguage('en_us')" />
              <figcaption @click="selectLanguage('en_us')">{{ $t('americanEnglish') }}</figcaption>
          </figure>
          </div>
          <div>
          <figure>
            <img id="en_uk" class=flag src="images/languages/en_uk.png" @click="selectLanguage('en_uk')" />
              <figcaption @click="selectLanguage('en_uk')">{{ $t('britishEnglish') }}</figcaption>
          </figure>
          </div>
          <div>
          <figure>
            <img id="kr_kr" class=flag src="images/languages/kr_kr.png" @click="selectLanguage('kr_kr')" />
              <figcaption @click="selectLanguage('kr_kr')">{{ $t('Korean') }}</figcaption>
          </figure>
          </div>
          <div>
          <figure>
            <img id="es_es" class=flag src="images/languages/es_es.png" @click="selectLanguage('es_es')" />
              <figcaption @click="selectLanguage('es_es')">{{ $t('spanish') }}</figcaption>
          </figure>
          </div>

        </div>        
        <br><hr><br>
        <div class="app" v-show="displayAppLink">
          <a href="https://play.google.com/store/apps/details?id=com.asklingua.mob" target="_blank">
            <img src="images/google_play.png">
          </a>          
        </div>
        <br>          
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
    width: 25%;
  }

  #selectLanguage img {
    cursor: pointer;
    width: 60px;
    margin: 0 auto;
    margin-bottom: 1vh;
  }

  #selectLanguage figcaption {
    cursor: pointer;
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

  .app img {
    margin: 0 auto;
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
import { Options, Vue } from "vue-class-component";
import HowTo from "../components/HowTo.vue";
import ComingNext from "../components/ComingNext.vue";
import { get } from "../helpers/http";
import router from "../router";

@Options({
    components: {
     HowTo,
     ComingNext
  }
})

export default class Home extends Vue {
  protected displayAppLink: boolean = true as boolean;
  protected showModal: boolean = false as boolean;
  protected showHowTo: boolean = false as boolean;
  protected showComingNext: boolean = false as boolean;

  async created(): Promise<void> {
    if(localStorage.getItem('app-version') == 'true') {
      this.displayAppLink = false;
    }
  }
  async saveLanguage(languageCode: string): Promise<void> {
    await get<string>("/api/learn-language/" + languageCode);
  }
  async selectLanguage(languageCode: string): Promise<void> {
    localStorage.removeItem('objectSelected');
    localStorage.setItem('learn-language', languageCode);
    await this.saveLanguage(languageCode);
    router.push("choose-object");
  }
  viewHowTo(): void {
    this.showModal = true;
    this.showHowTo = true;
  }
  viewNextLanguage(): void {
    this.showModal = true;
    this.showComingNext = true;
  }
  closeModal(): void {
    this.showModal = false;
    this.showHowTo = false;
    this.showComingNext = false;
  }
}
</script>
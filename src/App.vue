<template>
  <div id=modal class=modal v-if="showModal">
    <div class="modal-content">        
      <span @click="closeModal()" class="float-right text-lg cursor-pointer mr-1">&times;</span>
      <terms-privacy v-if="showTermsPrivacy" />
      <about v-if="showAbout" />

        <button @click="closeModal()" class="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                  {{ $t("Close") }}
        </button>
        <br><br>
    </div>  
  </div> 

  <div id="content">
    <router-view/>
  </div>
  <div id="nav" v-show="displayNav">
    <a href="/">{{ $t("Home") }}</a> |
    <span @click="viewTermsPrivacy()" class="navlink cursor-pointer">{{ $t('TermsPrivacy') }}</span> |
    <span @click="viewAbout()" class="navlink cursor-pointer">{{ $t('AboutContact') }}</span>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#content {
  min-height: 90vh;
}

.article {
  text-align: left;
  margin: 1em;
}

.article h1 {
  font-size: 1.5em;
  margin: 0.4em 0;
  font-weight: bold;
}

.article h2 {
  font-size: 1.1em;
  margin: 0.2em 0;
  font-weight: bold;
}

.article h3 {
  font-size: 0.9em;
  margin: 0.2em 0;
  font-weight: bold;
}

.article p {
  margin: 0.4em 0;
}

.article ul {
    list-style: disc;
    margin-left: 1em;
}

.navlink {
    color: #2c3e50;
    font-size: 0.8rem;
}

#nav {
  padding: 2vh 30px 3vh 30px;

  a {
    color: #2c3e50;
    font-size: 0.8rem;

    &.router-link-exact-active {
      color: #2c3e50;
    }
  }
}

.swal-title {
  white-space: nowrap;
}

#swal2-input {
    width: auto;
    margin-left: 5em;
    margin-right: 5em;
}

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 10px auto; 
  padding: 5px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TermsPrivacy from "./components/TermsPrivacy.vue";
import About from "./components/About.vue";

 @Options({
  data: () => {
      return {
        displayNav: true,
        showModal: false,
        showHowTo: false,
      }
  },
  components: {
    TermsPrivacy,
    About
  }
})

export default class App extends Vue {
  protected displayNav: boolean = true as boolean;
  protected showModal: boolean = false as boolean;
  protected showTermsPrivacy: boolean = false as boolean;
  protected showAbout: boolean = false as boolean;

  created(): void {

    if(localStorage.getItem('app-version') == 'true') {
      this.displayNav = false;
    }

    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    
    if(params.get("app") === 'true') {
      localStorage.setItem('app-version', 'true');
      this.displayNav = false;
    }
  }

  viewTermsPrivacy(): void {
    this.showModal = true;
    this.showTermsPrivacy = true;
  }
  viewAbout(): void {
    this.showModal = true;
    this.showAbout = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.showTermsPrivacy = false;
    this.showAbout = false;
  }
}
</script>

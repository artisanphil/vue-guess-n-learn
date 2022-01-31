<template>
  <div id="content">
    <router-view/>
  </div>
  <div id="nav" v-show="displayNav">
    <a href="/">Home</a> |
    <router-link to="/terms_privacy">Terms / Privacy</router-link> |
     <router-link to="/about">About / Contact</router-link>
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
</style>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

 @Options({
  data: () => {
      return {
        displayNav: true,
      }
  }
})

export default class App extends Vue {
  protected displayNav: boolean = true as boolean;

  created(): void {
    if(localStorage.getItem('app-version') == 'true') {
      this.displayNav = false;
    }
  }
}

</script>

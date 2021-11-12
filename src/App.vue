<template>
  <div id="content">
    <router-view/>
  </div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <a
      href="javascript:void(
        window.open(
          'https://form.jotform.com/213145745724355',
          'blank',
          'scrollbars=yes,
          toolbar=no,
          width=700,
          height=500'
        )
      )
    ">
      Contact
    </a>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#content {
  min-height: 90vh;
}

#nav {
  padding: 2vh 30px 3vh 30px;

  a {
    color: #2c3e50;
    font-size: 0.8rem;

    &.router-link-exact-active {
      color: darkblue;
    }
  }
}
</style>

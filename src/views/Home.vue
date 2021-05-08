<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ListObjects />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListObjects from '@/components/ListObjects.vue'; // @ is an alias to /src

@Options({
  components: {
    ListObjects,
  },
})
export default class Home extends Vue {}
</script>

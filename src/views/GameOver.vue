<template>
  <div id=gameover>
    <h1 class="text-center text-4xl mt-10 mb-2">
      Game Over!
    </h1>
    <h2 class="text-2xl" v-if="win === 'true'">&#127881; You win! &#129395;</h2>
    <h2 v-else class="text-2xl">You lost &#x1F61E;</h2>
    <button @click="playAgain()" class="swal2-confirm swal2-styled mt-5">Play again</button>
    <!--
    <p>&nbsp;</p>    
    <h2 class="text-xl">Leaderboard</h2>
    <table border=1 style="max-width: 100%;">
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Turns</th>
      <th>Mistakes</th>
    </tr>
    <tr v-for="(user, index) in leaderboard" :key="index" :class="{ activerow: user.active  }">
      <td>{{ (Number(index) + 1) }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.turns }}</td>
      <td>{{ user.mistakes }}</td>
    </tr>
    </table>
    <br>
    <div v-if="win !== 'true'">You need to win in order for your name to show on the leaderboard.</div>
    -->
  </div>
</template>

<style>
  #gameover {
    max-width: 800px;
    margin: 2vh auto;
    background-color: rgb(230, 255, 255, 0.2);
    color: #000099;
    padding: 1vh;
    padding-bottom: 5vh;
  }

  table {
     margin-left: auto;
     margin-right: auto;
  }

  table, th, td {
    border: 1px solid #CCCCCC;
    padding: 3px;    
  }  

  .activerow {
    background-color: skyblue;
    font-weight: bold;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";
import router from '../router';
import { get } from "../helpers/http";

export default defineComponent({
  data() {
      return {
        win: this.$route.params.win,
        leaderboard: []
      }
  },
	name: "GameOver",
  async created(): Promise<void> {
    let response = await get<any>("/api/stats/leaderboard");
    this.leaderboard = response;
  },
	methods: {
      playAgain(): void {
        router.push('/');
      }
  }
});
</script>

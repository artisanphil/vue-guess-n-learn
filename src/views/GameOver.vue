<template>
  <div id=gameover>
    <h1 class="text-center text-4xl mt-10 mb-2">
      {{ $t("GameOver") }}
    </h1>
    <h2 class="text-2xl" v-if="win === 'true'">&#127881; {{ $t("YouWin") }} &#129395;</h2>
    <h2 v-else class="text-2xl">{{ $t("YouLost") }} &#x1F61E;</h2>
    <button @click="playAgain()" class="swal2-confirm swal2-styled mt-5">{{ $t("PlayAgain") }}</button>
    <p>&nbsp;</p>    
    <h2 class="text-xl">{{ $t("Leaderboard") }}</h2>
    <table border=1 style="max-width: 100%;">
    <tr>
      <th>{{ $t("Rank") }}</th>
      <th>{{ $t("Name") }}</th>
      <th>{{ $t("Turns") }}</th>
      <th>{{ $t("Mistakes") }}</th>
    </tr>
    <tr v-for="(user, index) in leaderboard" :key="index" :class="{ activerow: user.active  }">
      <td>{{ (Number(index) + 1) }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.turns }}</td>
      <td>{{ user.mistakes }}</td>
    </tr>
    </table>
    <br>
    <div v-if="win !== 'true'">{{ $t("YouNeedToWin") }}</div>
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

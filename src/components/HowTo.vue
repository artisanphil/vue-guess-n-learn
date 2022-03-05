<template>
  <div id="about">
    <h1 class="text-center text-4xl mt-2 mb-2">{{ $t("howToPlay") }}</h1>
    
    <div id="content">
      <p>{{ $t("descriptionAskLingua") }} 
        {{ $t("PlayGameAgainstLingua") }}</p>

    <br>
    1) {{ $t("ChooseLanguage") }}
    <br>
    <img v-bind:src="$t('imgLanguageSelection')">
    <br>
    2) {{ $t("HelpSelectCharacter") }}
    <br>
    <img src="/images/help/choose-object.png">
    <br>
    3) {{ $t("HelpLinguaChoice") }}
    <br>
    <img v-bind:src="$t('imgLinguaChoice')">
    <br>
    4) {{ $t("HelpLinguaAsks") }}    
    <br>
    <img v-bind:src="$t('imgLinguaAsks')">
    <br>
    4) {{ $t("HelpYourTurnToAsk") }}
    <br>
    <img src="/images/help/choose-attribute.png">
    <br>
    5) {{ $t("HelpQuestionTypes") }}
    <br><br>
    <strong>{{ $t("MultipleChoice" )}}:</strong><br>
    <img src="/images/help/multiple-choice.png">
    <br>
    <strong>{{ $t("JumbledWords") }}:</strong><br>
    {{ $t("HelpClickWords") }}
    {{ $t("HelpRemoveWord") }}
    <img v-bind:src="$t('imgJumbledSentence')">
    <br>
    <strong>{{ $t("FillInTheBlank") }}:</strong><br>
    <img v-bind:src="$t('imgGap')">

    <br><br>
    6) {{ $t("HelpAnswerAndHide") }}
    <br>
    <img src="/images/help/continue.png">
    <br>
    7) {{ $t("HelpContinue") }}
    {{ $t("HelpWin") }}    
    </div>
  </div>
</template>

<style>
 #about img {
   border-color: #EEEEEE;
   border-width: 1px;
   border-style: solid;
 }

 #about {
    max-width: 800px;
    margin: 2vh auto;
    border-radius: 25px;
    color: #A52A2A;
    padding-bottom: 1vh;
  }

  .modal #content {
    text-align: left;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "HowTo",
});
</script>

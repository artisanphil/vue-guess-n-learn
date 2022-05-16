<template>
  <main class="px-8 pt-2 lg:px-4">
    <div>
      <QuestionHeader v-show="displayQuestionHeader" :image="image" />
      <MultipleChoice
        v-show="displayMChoice"
        :questions="questions"
        :attributeKey="attributeKey"
        @messageFromChild="questionSelected"
      />
      <GapQuestion
        v-show="displayGapQuestion"
        :questions="questions"
        :attributeKey="attributeKey"
        :attributeValue="attributeValue"
        @messageFromChild="questionSelected"
        ref="gapQuestion"
      />
      <JumbledSentence
        v-show="displayJumbledSentence"
        :words="questions"
        :attributeKey="attributeKey"
        @messageFromChild="questionSelected"
      />

      <div class=mt-5 v-show="displayAd">
        <a href="https://lingopie.com/?ref=lc&tap_s=2842746-6a7e40&tap_a=99853-a138f9" target="_BLANK" rel="nofollow"><img src="https://static.tapfiliate.com/6107f758d5f61204942519.png?a=99853-a138f9&s=2842746-6a7e40" border="0" style="width: 250px; margin: 10px auto"></a>
      </div>

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultipleChoice from "../components/MultipleChoice.vue";
import GapQuestion from "../components/GapQuestion.vue";
import JumbledSentence from "../components/JumbledSentence.vue";
import QuestionHeader from "../components/QuestionHeader.vue";
import { get, post, getResponse } from "../helpers/http";
import Swal from "sweetalert2";
import router from "../router";
import { IObject } from "../interfaces/IObject";

export default defineComponent({
  name: "AskQuestion",
  data() {
    return {
      displayQuestionHeader: false,
      displayAttributes: true,
      displayJumbledSentence: false,
      displayMChoice: false,
      displayGapQuestion: false,
      displayAd: true,
      questions: [],
      attributeKey: "",
      attributeValue: "",
      image: "",
    };
  },
  components: {
    MultipleChoice,
    GapQuestion,
    JumbledSentence,
    QuestionHeader,
  },
  async created(): Promise<void> {
    if(localStorage.getItem('app-version') == 'true') {
      this.displayAd = false;
    }

    this.attributeKey = this.$route.params.attributeKey as string;
    this.attributeValue = this.$route.params.attributeValue as string;
    const imagePath = "/images/character-attributes/";
    this.image = imagePath + this.attributeKey.replace(" ", "-") + ".png";

    this.displayQuestionHeader = true;

    let url = `/api/user-guess`;
    let params = [
      ['attributeKey', this.attributeKey],
      ['attributeValue', this.attributeValue],
      ['questiontype', this.getQuestionType()]
    ];
    let response = await getResponse(url, params);
    let questionType = response.headers.get("Question-Type");
    this.questions = await response.json();

    switch (questionType) {
      case "multiple-choice":
        this.displayMChoice = true;
        break;
      case "drag-drop":
        this.displayJumbledSentence = true;
        break;
      case "gap":
        this.displayGapQuestion = true;
        (this.$refs['gapQuestion'] as any).displayQuestion(this.questions);
        break;
    }
  },
  methods: {
    async questionSelected(data: any): Promise<void> {
      let response = await post<any>("/api/user-guess", data);

      if(response.length === 0)
      {
            router.push('/session-timeout');
            throw new Error("response is empty");
      }


      let answer = response.correct ? response.Yes : response.No;
      let answerSentence = data.sentenceAnswer + '<br><br>'
        + '<div style="display: inline-flex;"><div><img src="/images/icon.png" style="width: 40px;"></div>'
        + '<div style="align-self: end; margin-left: 5px; margin-bottom: 5px;"><h3>' + answer + '</h3></div></div>';

      const dialog = Swal.fire({
        title: this.$t("YouAsked"),
        html: answerSentence,
        confirmButtonText: "OK",
      });

      if ((await dialog).isConfirmed) {
        router.push({ name: "ChooseObject" });
      }
    },
    getQuestionType(): string{
      let number = 0;

      if(localStorage.getItem('qNumber') !== null) {
        number = parseInt(localStorage.getItem('qNumber')!);
      }

      number++;
      localStorage.setItem('qNumber', number.toString());

      if (number === 1 || number === 4) {
        return "multiple-choice";
      } else if (number % 2 === 0) {
        return "drag-drop";
      } else {
        return "gap";
      }
    }
  },
});
</script>

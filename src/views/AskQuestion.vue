<template>
  <main class="px-8 pt-2 lg:px-4">
    <div>
      <QuestionHeader v-show="displayQuestionHeader" :image="image" />
      <MultipleChoice
        v-show="displayMChoice"
        :questions="questions"
        :attribute="attributeKey"
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
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MultipleChoice from "../components/MultipleChoice.vue";
import GapQuestion from "../components/GapQuestion.vue";
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
      displayMChoice: false,
      displayGapQuestion: false,
      questions: [],
      attributeKey: "",
      attributeValue: "",
      image: "",
    };
  },
  components: {
    MultipleChoice,
    GapQuestion,
    QuestionHeader,
  },
  async created(): Promise<void> {
    this.attributeKey = this.$route.params.attributeKey as string;
    this.attributeValue = this.$route.params.attributeValue as string;
    const imagePath =
      process.env.VUE_APP_BACKEND + "/images/character-attributes/";
    this.image = imagePath + this.attributeKey.replace(" ", "-") + ".png";

    this.displayQuestionHeader = true;

    let url = `/api/user-guess`;
    let params = [
      ['attributeKey', this.attributeKey],
      ['attributeValue', this.attributeValue],
      ['questiontype', 'gap']
    ];
    let response = await getResponse(url, params);
    let questionType = response.headers.get("Question-Type");
    this.questions = await response.json();

    switch (questionType) {
      case "multiple-choice":
        this.displayMChoice = true;
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
      let answer = response.correct ? "Yes" : "No";

      Swal.fire({
        title: "You asked:",
        html: data.sentenceAnswer + "<br><br><b>Answer</b>: " + answer,
        confirmButtonText: "OK",
      });

      let matchingNames = response.matching.map(function (object: IObject) {
        return object.name;
      });
      let matchingJson = JSON.stringify(matchingNames);
      router.push({ name: "ChooseObject", params: { matching: matchingJson } });
    },
  },
});
</script>
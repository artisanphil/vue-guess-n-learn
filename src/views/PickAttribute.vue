<template>
  <main class="px-8 pt-2 lg:px-4">
    <div>
      <QuestionHeader
       v-show="displayQuestionHeader"
       :image="image"
       />
      <AttributeList
        v-show="displayAttributes"
        @messageFromChild="attributeSelected"
      />
      <MultipleChoice
        v-show="displayMChoice"
        :questions="questions"
        :attribute="attribute"
        @messageFromChild="questionSelected"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AttributeList from "../components/AttributeList.vue";
import MultipleChoice from "../components/MultipleChoice.vue";
import QuestionHeader from "../components/QuestionHeader.vue";
import { get, post, getResponse } from "../helpers/http";
import Swal from "sweetalert2";
import router from "../router";
import { IObject } from "../interfaces/IObject";

export default defineComponent({
  name: "PickAttribute",
  data() {
    return {
      displayQuestionHeader: false,
      displayAttributes: true,
      displayMChoice: false,
      questions: [],
      attribute: "",
      image: "",
    };
  },
  components: {
    AttributeList,
    MultipleChoice,
    QuestionHeader,
  },
  methods: {
    async attributeSelected(index: number): Promise<void> {
      let attributes = await get<Array<any>>("/api/remaining-attributes");
      this.attribute = attributes[index]['key'];
      const imagePath =
        process.env.VUE_APP_BACKEND + "/images/character-attributes/";
      this.image = imagePath + this.attribute.replace(" ", "-") + ".png";

      this.displayQuestionHeader = true;
      this.displayAttributes = false;

      let url = `/api/user-guess?choice=${this.attribute}&questiontype=multiple-choice`;
      let response = await getResponse(url);
      let questionType = response.headers.get("Question-Type");
      this.questions = await response.json();

      switch (questionType) {
        case "multiple-choice":
          this.displayMChoice = true;
          break;
      }
    },
    async questionSelected(data: any): Promise<void> {
      let response = await post<any>("/api/user-guess", data);
      let answer = response.correct ? "Yes" : "No";

      Swal.fire({
        title: "You asked:",
        html: data.sentence + "<br><br><b>Answer</b>: " + answer,
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

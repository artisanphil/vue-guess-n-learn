<template>
<div class="flex flex-wrap w-full justify-center">
    <div class="px-4 py-6 w-full max-w-6xl border-2 shadow m-1 text-2xl">
      <div id=words>
      <div
        class="inline-block py-2 px-6 mx-2 border-2 shadow m-1 hover:shadow-lg cursor-pointer md:text-2xl text-sm"
        :key="index"
        v-for="(word, index) in words"
        @click="select(word)"
      >
        {{ word }}
      </div>
      </div>
      <br />
      <div id=selection>
        <div id=questionbox>
          <textarea readonly v-model="answer" id=answertext class="md:text-2xl text-base" />
        </div>
        <div>
          <img src="images/rubber.png" alt="rubber" id=rubber @click="erase()" />
        </div>
      </div>
      <button @click="ask()" class="mt-5 text-sm swal2-confirm swal2-styled">
        {{ $t("Ask") }}
      </button>
    </div>
</div>
</template>

<style scoped>
  #answertext {
    width: 100%;
    max-width: 600px;
    resize: none;
    border: #9ca3af solid 1px;
    min-height: 12vh;
  }
  #selection {
    display: flex;
    justify-content: center;
  }
  #questionbox {
    width: 90%;
    max-width: 600px;
    margin-right: 5px;
  }
  #rubber {
    cursor: pointer;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import { getResponse, post } from "../helpers/http";

export default defineComponent({
	name: "JumbledSentence",
  props: {
    words: Array,
    attributeKey: String
  },
  data() {
    return {
      answer: "",
    };
  },
  methods: {
    async correctSentence(attribute: string): Promise<void>
    {
        let params = [
          ['chosenAttribute', attribute],
        ];
        let response = await getResponse<any>("/api/user-guess/correct-sentence", params);
        let answer = Object.values(await response.json() as any[]);

        return answer[0];
    },
    select(word: string): void {
      if (this.answer.length > 0 && word != '?') {
        this.answer += " ";
      }
      this.answer += word;
    },
    erase(): void {
      var lastIndex = this.answer.lastIndexOf(" ");
      this.answer = this.answer.substring(0, lastIndex);
    },
    async ask(): Promise<void> {
        let input = document.getElementById('answertext') as HTMLInputElement;
        let data = {
          chosenAttribute: this.attributeKey,
          answerSentence: input.value.trim()
        };
        let response = await post<any>("/api/user-guess/verify-sentence", data);

        if(response.correct) {
          this.continue(data.answerSentence);
        } else {
            Swal.fire({
              title: `<h1 style='color:red;'>` + this.$t("Wrong") + `</h1>`,
              text: this.$t("AnswerIsWrong"),
              showCancelButton: true,
              confirmButtonColor: "#808080",
              cancelButtonColor: "#7367f0",
              cancelButtonText: this.$t("TryAgain"),
              confirmButtonText: this.$t("Skip"),
          }).then((result) => {
            if (result.isConfirmed) {
              this.skip();
            } else {
              Swal.close()
            }
          })
        }
    },
    continue(answer: string): void {
      let data = {
            choice: this.attributeKey,
            sentenceAnswer: answer
      }
      this.$emit('messageFromChild', data);
    },
    async skip(): Promise<void> {
      let correctSentence= await this.correctSentence(this.attributeKey);
      let data = {
            choice: this.attributeKey,
            sentenceAnswer: correctSentence,
            skipped: true
      }
      this.$emit('messageFromChild', data);
    }

  }
})
</script>

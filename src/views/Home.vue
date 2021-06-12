<template>
    <h1 class="text-center text-xl mt-4">Please choose a character for the computer to guess</h1>
    <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex">
      <div class="flex flex-wrap lg:w-4/5">
        <div class="px-8 py-6 lg:w-1/3 md:w-full" :key="index" v-for="(object, index) in objects">
          <a @click="select(index)">{{ object.name }}</a>
          <br>
          {{ object.attributes }}
        </div>
      </div>
      <div class="flex-auto lg:w-1/5">
          <h3 class="text-lg">Your character</h3>
          <div id=your-selection>
            {{ yourSelection }}
          </div>
      </div>
    </div>
  </main>
  <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
</template>

<script lang="ts">
import { Options, Vue  } from 'vue-class-component';
import ConfirmDialogue from '../components/ConfirmDialogue.vue'
import { IObject } from '../interfaces/IObject';
import { get, post } from '../helpers/http';

@Options({
  props: {
    msg: String,
  },
  data: () => {
    return {
      yourSelection: ''
    }
  },
  components: {
    ConfirmDialogue,
  },
})
export default class ListObjects extends Vue {

  $refs!: {
    confirmDialogue: InstanceType<typeof ConfirmDialogue>;
};

  msg!: string
  protected yourSelection: IObject = {} as IObject;
  protected objects: Array<IObject> = [];

  async created(): Promise<void> {
    this.objects = await get<Array<IObject>>(
      "/api/index"
    );
  }

  async select(index: number): Promise<void> {
    let name = this.objects[index].name;
    const data = { selection: name};

    const ok = await this.$refs.confirmDialogue.show({
        title: 'Your selection',
        message: 'You have selected ' + name,
        okButton: 'OK',
    })

    if (ok) {
        post('/api/select', data);
        this.yourSelection = this.objects[index];
        this.guess();
    }
  }

  async guess(): Promise<void> {
    let question = await get<any>(
      "/api/computer-guess"
    );

    const ok = await this.$refs.confirmDialogue.show({
        title: 'Computer Guess',
        message: question.sentence,
        okButton: 'OK',
    })

    /*
    if (ok) {
        post('/api/select', data);
        this.yourSelection = this.objects[index];
    }
    */
  }
}
</script>

<template>
    <h1 class="text-center text-xl mt-4">Please choose a character for the computer to guess</h1>
    <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex flex-wrap">
      <div class="px-8 py-6 lg:w-1/3 md:w-full" :key="index" v-for="(object, index) in objects">
        <a @click="select(object.name)">{{ object.name }}</a>
        <br>
        {{ object.attributes }}
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
    msg: String
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
  protected objects: IObject[] = [];

  async created(): Promise<void> {
    const data = await get<IObject[]>(
      "/api/index"
    );

    this.objects = data;
  }

  async select(name: string): Promise<void> {
    const data = { selection: name };

    const ok = await this.$refs.confirmDialogue.show({
        title: 'Your selection',
        message: 'You have selected ' + name,
        okButton: 'OK',
    })

    if (ok) {
        post('/api/select', data);
        this.$router.push({ path: `/about` })
    }
  }
}
</script>

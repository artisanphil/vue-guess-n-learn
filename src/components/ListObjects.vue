<template>
  <div class="ListObjects">
    <h1>Please choose a character for the computer to guess</h1>
    <div class=objects :key="index" v-for="(object, index) in objects">
      <div class=object>
        {{ object.name }}
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IObject } from '../interfaces/IObject';
import { http } from '../helpers/http';

@Options({
  props: {
    msg: String
  }
})
export default class ListObjects extends Vue {
  msg!: string
  private objects: IObject[] = [];

  async created() {
    const data = await http<IObject[]>(
      "http://localhost/api/index"
    );

    this.objects = data;
    //console.log(data[0].name);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

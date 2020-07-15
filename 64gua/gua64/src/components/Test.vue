<template>
  <div>
    <date-picker v-model="time1" valueType="format"></date-picker>
    <date-picker v-model="time2" type="datetime"></date-picker>
    <date-picker v-model="time3" range></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  name: 'Test',
  data () {
    return {
        time1: null,
        time2: null,
        time3: null
    }
  },
  methods: {

  },
  components: {
    DatePicker
  }
}
</script>

<style lang="scss" scoped>

</style>

export default {
  data() {
    return {
      count:1
    }
  },
  computed: {
    double() {
      return this.count * 2
    }
  },
  methods:{
    add(){
      this.count++
    }
  }
}
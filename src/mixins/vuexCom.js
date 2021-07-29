import { mapState, mapActions, mapGetters } from '@wepy/x'
export default {
  data: {},
  computed: {
    ...mapState(['counter'])
  },
  methods: {
    ...mapActions([]),
    ...mapGetters([])
  },
  created() {
    console.log('created in mixin')
  }
}

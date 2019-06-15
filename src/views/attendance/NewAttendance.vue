<template>
  <div class="app-container">
    <el-row type="flex" justify="space-around" style="margin-top: 100px">
      <el-button
        style="width: 400px;margin-left: 10px;margin-right: 10px;font-size: 22px;border-radius: 100px"
        icon="el-icon-edit"
        type="primary"
        round
        @click="onSubmit('上班')"
      >上班打卡
      </el-button>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: 100px">
      <el-button
        style="width: 400px;margin-left: 10px;margin-right: 10px;font-size: 22px;border-radius: 100px"
        icon="el-icon-edit"
        type="danger"
        round
        @click="onSubmit('下班')"
      >下班打卡
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getPersonDetail } from '@/api/person'
import { addAttendance } from '@/api/attendance'

export default {
  name: 'NewAttendance',

  data() {
    return {
      message: '',
      form: {
        username: '',
        name: '',
        sex: '',
        department: '',
        position: '',
        time: parseTime(new Date(), ''),
        type: '',
        remark: ''
      },
    }
  },
  computed: {
    'username': function() {
      return this.$store.getters.username
    }
  },

  watch: {},

  created: function() {

  },

  mounted: function() {
    getPersonDetail(this.username).then(response => {
      const person = response.data
      this.form.name = person.name
      this.form.sex = person.sex
      this.form.department = person.department
      this.form.position = person.position
    })
    this.form.username = this.username
  },

  methods: {
    onSubmit(type) {
      this.form.type = type
      this.form.remark = '无'
      addAttendance(this.form).then(response => {
        this.$message({
          message: '打卡成功！',
          type: 'success',
          center: true,
          duration: 3000
        })
        const _this = this
        setTimeout(function() {
          _this.$router.push('/attendance/my')
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>

</style>

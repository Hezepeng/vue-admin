<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="员工姓名">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="员工性别">
        <el-col :span="10">
          <el-input v-model="form.sex" />
        </el-col>
      </el-form-item>
      <el-form-item label="员工部门">
        <el-col :span="10">
          <el-input v-model="form.department" />
        </el-col>
      </el-form-item>
      <el-form-item label="打卡时间">
        <el-col :span="10">
          <el-input v-model="form.time" type="password" />
        </el-col>
      </el-form-item>
      <el-form-item label="打卡类型">
        <el-radio-group v-model="form.type">
          <el-radio label="上班打卡" />
          <el-radio label="下班打卡" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-col :span="10">
          <el-input v-model="form.remark" type="textarea" rows="6" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" type="success" @click="onSubmit" round>立即打卡</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NewAttendance',

  data() {
    return {
      form: {
        name: '',
        sex: '',
        department: '',
        time: null,
        type: '',
        remark: ''
      }
    }
  },

  computed: {},

  watch: {},

  created: function() {

  },

  mounted: function() {

  },

  methods: {
    onSubmit() {
      this.$message({
        message: '打卡成功！',
        type: 'success',
        center: true,
        duration: 4000
      })
    }
  }
}
</script>

<style scoped>

</style>

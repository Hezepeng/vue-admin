<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" auto-complete="on" label-width="120px">
      <el-form-item label="员工姓名" prop="name">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="员工性别" prop="sex">
        <el-col :span="10">
          <el-radio-group v-model="form.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-col :span="10">
          <el-select v-model="form.department" placeholder="选择员工所属部分" disabled>
            <el-option label="后勤" value="后勤" />
            <el-option label="行政" value="行政" />
            <el-option label="财务" value="财务" />
            <el-option label="销售" value="销售" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="打卡时间" prop="time">
        <el-col :span="10">
          <el-input v-model="form.time" placeholder="打卡时间" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="打卡类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="上班">上班打卡</el-radio>
          <el-radio label="下班">下班打卡</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-col :span="10">
          <el-input v-model="form.remark" type="textarea" rows="6" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" type="success" round @click="onSubmit">立即打卡</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getPersonDetail } from '@/api/person'

export default {
  name: 'NewAttendance',

  data() {
    return {
      message: '',
      form: {
        name: '',
        sex: '',
        department: '',
        time: parseTime(new Date(), ''),
        type: '',
        remark: ''
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '姓名不能为空' }],
        sex: [{ required: true, trigger: 'blur', message: '性别不能为空' }],
        type: [{ required: true, trigger: 'blur', message: '打卡类型不能为空' }]
      }
    }
  },

  computed: {},

  watch: {},

  created: function() {

  },

  mounted: function() {
    getPersonDetail().then(response => {
      const person = response.data
      this.form.name = person.name
      this.form.sex = person.sex
      this.form.department = person.department
    })
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
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
        } else {
          console.log('输入数据不合法！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

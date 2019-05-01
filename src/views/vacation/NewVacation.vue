<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" auto-complete="on" label-width="120px">
      <el-form-item label="员工工号">
        <el-col :span="10">
          <el-input v-model="form.username" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="申请时间">
        <el-col :span="10">
          <el-input v-model="form.createTime" placeholder="申请时间" style="width: 100%;" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="请假天数" prop="days">
        <el-col :span="10">
          <el-input v-model.number="form.days" />
        </el-col>
      </el-form-item>
      <el-form-item label="请假原因" prop="reason">
        <el-col :span="10">
          <el-input v-model="form.reason" type="textarea" rows="6" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" type="success" round @click="onSubmit">立即申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addVacation } from '@/api/vacation'
import { parseTime } from '../../utils'
export default {
  name: 'NewVacation',

  data() {
    return {
      message: '',
      form: {
        username: '',
        // time: parseTime(new Date(), ''),
        createTime: parseTime(new Date(), ''),
        days: '',
        reason: ''
      },
      formRules: {
        days: [{ required: true, trigger: 'blur', message: '天数不能为空' }, { type: 'number', message: '天数必须为数字' }],
        reason: [{ required: true, trigger: 'blur', message: '请假原因不能为空' }]
      }
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
    // getPersonDetail(this.username).then(response => {
    //   const person = response.data;
    //   this.form.name = person.name;
    //   this.form.sex = person.sex;
    //   this.form.department = person.department;
    // });
    this.form.username = this.username
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('验证')
          addVacation(this.form).then(response => {
            console.log('验证1')
            this.$message({
              message: '申请成功！',
              type: 'success',
              center: true,
              duration: 3000
            })
            const _this = this
            setTimeout(function() {
              _this.$router.push('/vacation/my')
            }, 1000)
          })
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

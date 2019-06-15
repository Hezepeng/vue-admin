<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" auto-complete="on" label-width="120px">
      <el-form-item label="员工工号">
        <el-col :span="10">
          <el-input v-model="form.username" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-col :span="10">
          <el-input v-model="form.name" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-col :span="10">
          <el-select v-model="form.department" placeholder="选择员工所属部分" disabled>
            <el-option label="人事" value="人事" />
            <el-option label="行政" value="行政" />
            <el-option label="财务" value="财务" />
            <el-option label="业务" value="业务" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-col :span="10">
          <el-select v-model="form.position" placeholder="选择员工的职位" disabled>
            <el-option label="员工" value="员工" />
            <el-option label="组长" value="组长" />
            <el-option label="主管" value="主管" />
            <el-option label="总经理" value="总经理" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="任务年月">
        <el-col :span="3">
          <el-input v-model="form.year" disabled />
        </el-col>
        <el-col style="text-align: center;" :span="1">年</el-col>
        <el-col :span="3">
          <el-input v-model="form.month" disabled />
        </el-col>
        <el-col style="text-align: center;" :span="1">月</el-col>
      </el-form-item>
      <el-form-item label="任务量">
        <el-col :span="10">
          <el-input-number v-model="form.targetTask" :min="1" :step="1" label="设置该月的任务量" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" type="success" round @click="onSubmit">创建业绩目标</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getPersonDetail } from '@/api/person'
import { addPerformance } from '@/api/performance'

export default {
  name: 'NewPerformance',

  data() {
    return {
      message: '',
      form: {
        username: '',
        name: '',
        department: '',
        position: '',
        time: parseTime(new Date(), ''),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        targetTask: '',
        remark: ''
      },
      formRules: {
        targetTask: [{ required: true, trigger: 'blur', message: '任务量不能为空' }]
      }
    }
  },

  mounted: function() {
    const username = this.$route.params['id']
    getPersonDetail(username).then(response => {
      const person = response.data
      this.form.name = person.name
      this.form.username = person.username
      this.form.department = person.department
      this.form.position = person.position
    })
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addPerformance(this.form).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success',
              center: true,
              duration: 3000
            })
            const _this = this
            setTimeout(function() {
              _this.$router.push('/performance/list')
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

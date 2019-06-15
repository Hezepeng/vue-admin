<template>
  <div class="app-container">
    <el-form ref="form" :inline="true" :model="form" :rules="formRules" auto-complete="on" label-width="120px">
      <el-form-item label="员工工号">
        <el-col :span="24">
          <el-input v-model="form.username" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-col :span="24">
          <el-input v-model="form.name" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-col :span="24">
          <el-select v-model="form.department" placeholder="选择员工部门" disabled>
            <el-option label="人事" value="人事" />
            <el-option label="行政" value="行政" />
            <el-option label="财务" value="财务" />
            <el-option label="业务" value="业务" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-col>
          <el-select v-model="form.position" placeholder="选择员工职位" disabled>
            <el-option label="员工" value="员工" />
            <el-option label="组长" value="组长" />
            <el-option label="主管" value="主管" />
            <el-option label="总经理" value="总经理" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="工资年份">
        <el-col>
          <el-input v-model="form.year" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="工资月份">
        <el-col>
          <el-input v-model="form.month" disabled />
        </el-col>

      </el-form-item>
      <el-form-item label="上班打卡次数">
        <el-col :span="24">
          <el-input v-model="form.startTimes" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="下班打卡次数">
        <el-col :span="24">
          <el-input v-model="form.startTimes" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="目标任务量">
        <el-col :span="24">
          <el-input v-model="targetTask" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="目标完成量">
        <el-col :span="24">
          <el-input-number v-model="completeTask" :min="0" :controls="false" />
        </el-col>
      </el-form-item>
      <el-form-item label="底薪">
        <el-col :span="24">
          <el-input-number v-model="baseSalary" :min="0" :controls="false" />
        </el-col>
      </el-form-item>
      <el-form-item label="扣除部分">
        <el-col :span="24">
          <el-input-number v-model="deduct" :min="0" :controls="false" />
        </el-col>
      </el-form-item>
      <el-form-item label="奖励部分">
        <el-col :span="24">
          <el-input-number v-model="reward" :min="0" :controls="false" />
        </el-col>
      </el-form-item>
      <el-form-item label="五险扣税">
        <el-col :span="24">
          <el-input v-model="tax" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="当月总收入">
        <el-col :span="24">
          <el-input v-model="total" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="实际所得">
        <el-col :span="24">
          <el-input v-model="income" disabled />
        </el-col>
      </el-form-item>
      <el-row style="margin-top: 100px;text-align: center">
        <el-form-item>
          <el-button style="width: 300px" size="large" icon="el-icon-edit" type="success" round @click="onSubmit">发放薪酬
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getPersonDetail } from '@/api/person'
import { getOnePerformance } from '@/api/performance'
import { addSalary } from '@/api/salary'

export default {
  name: 'NewSalary',

  data () {
    return {
      message: '',
      form: {
        username: '',
        performance_id: '',
        name: '',
        department: '',
        position: '',
        startTimes: 0,
        endTimes: 0,
        time: parseTime(new Date(), ''),
        year: 0,
        month: 0,
        targetTask: 0,
        completeTask: 0,
        baseSalary: 0,
        deduct: 0,
        reward: 0,
        tax: 0,
        total: 0,
        income: 0
      },
      targetTask: 0,
      completeTask: 0,
      baseSalary: 0,
      deduct: 0,
      reward: 0,
      tax: 0,
      total: 0,
      income: 0,
      formRules: {
        targetTask: [{required: true, trigger: 'blur', message: '任务量不能为空'}]
      }
    }
  },
  watch: {
    completeTask: function(newVal, oldVal) {
      this.total = (parseFloat(this.form.startTimes + this.form.endTimes) / 60 * parseFloat(this.baseSalary) + newVal / this.targetTask * 4000 - this.deduct + this.reward).toFixed(2)
      this.tax = (this.total * 0.15).toFixed(2)
      this.income = (this.total * 0.85).toFixed(2)
    },
    baseSalary: function(newVal, oldVal) {
      console.log(newVal)
      this.total = (parseFloat(this.form.startTimes + this.form.endTimes) / 60.0 * parseFloat(newVal) + this.completeTask / this.targetTask * 4000 - this.deduct + this.reward).toFixed(2)
      this.tax = (this.total * 0.15).toFixed(2)
      this.income = (this.total * 0.85).toFixed(2)
    },
    deduct: function(newVal, oldVal) {
      this.total = (parseFloat(this.form.startTimes + this.form.endTimes) / 60 * parseFloat(this.baseSalary) + this.completeTask / this.targetTask * 4000 - newVal + this.reward).toFixed(2)
      this.tax = (this.total * 0.15).toFixed(2)
      this.income = (this.total * 0.85).toFixed(2)
    },
    reward: function(newVal, oldVal) {
      this.total = (parseFloat(this.form.startTimes + this.form.endTimes) / 60 * parseFloat(this.baseSalary) + this.completeTask / this.targetTask * 4000 - this.deduct + newVal).toFixed(2)
      this.tax = (this.total * 0.15).toFixed(2)
      this.income = (this.total * 0.85).toFixed(2)
    }
  },
  mounted: function() {
    const id = this.$route.params['id']
    getOnePerformance(id).then(response => {
      const performance = response.data
      this.form.performance_id = id
      this.targetTask = performance.targetTask
      this.completeTask = performance.completeTask
      this.form.username = performance.username
      this.form.year = performance.year
      this.form.month = performance.month
    }).then(() => {
      getPersonDetail(this.form.username).then(response => {
        const person = response.data
        this.form.name = person.name
        this.form.department = person.department
        this.form.position = person.position
      })
    })
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.completeTask = this.completeTask
          this.form.targetTask = this.targetTask
          this.form.baseSalary = this.baseSalary
          this.form.deduct = this.deduct
          this.form.reward = this.reward
          this.form.tax = this.tax
          this.form.total = this.total
          this.form.income = this.income
          addSalary(this.form).then(response => {
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

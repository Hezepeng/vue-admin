<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="员工姓名" prop="name">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="10">
          <el-input v-model="form.password" type="password" />
        </el-col>
      </el-form-item>
      <el-form-item label="员工性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="入职部门" prop="department">
        <el-col :span="10">
          <el-select v-model="form.department" placeholder="选择员工所属部分">
            <el-option label="后勤" value="后勤" />
            <el-option label="行政" value="行政" />
            <el-option label="财务" value="财务" />
            <el-option label="销售" value="销售" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="入职时间" prop="entryTime">
        <el-col :span="10">
          <el-date-picker v-model="form.entryTime" type="date" placeholder="选择员工开始入职时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <!--<el-form-item label="Instant delivery">-->
      <!--<el-switch v-model="form.delivery" />-->
      <!--</el-form-item>-->
      <!--<el-form-item label="Activity type">-->
      <!--<el-checkbox-group v-model="form.type">-->
      <!--<el-checkbox label="Online activities" name="type" />-->
      <!--<el-checkbox label="Promotion activities" name="type" />-->
      <!--<el-checkbox label="Offline activities" name="type" />-->
      <!--<el-checkbox label="Simple brand exposure" name="type" />-->
      <!--</el-checkbox-group>-->
      <!--</el-form-item>-->
      <el-form-item label="备注信息">
        <el-col :span="10">
          <el-input v-model="form.remark" type="textarea" rows="6" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交员工信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addPerson } from '@/api/person';

export default {
  name: 'NewPerson',

  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不少于6位'))
      } else {
        callback()
      }
    }
    // const validateIdCard = (rule, value, callback) => {
    //   if (value.length !== 18 || !/^\d+[x|X]?$/.test(value)) {
    //     callback(new Error('身份证号格式错误'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      message: '',
      form: {
        name: '',
        password: '',
        sex: '',
        department: '',
        entryTime: null,
        remark: ''
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '姓名不能为空' }],
        // idCard: [{ required: true, trigger: 'blur', validator: validateIdCard }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        sex: [{ required: true, trigger: 'blur', message: '性别不能为空' }],
        department: [{ required: true, trigger: 'blur', message: '部门不能为空' }],
        entryTime: [{ required: true, trigger: 'blur', message: '入职时间不能为空' }]

      }
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addPerson(this.form).then(response => {
            this.$message({
              message: '添加人员成功！',
              type: 'success',
              center: true,
              duration: 2000
            })
            const _this = this
            setTimeout(function() {
              _this.$router.push('/person/list')
            }, 1000)
          })
        } else {
          console.log('输入数据不合法！')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>

</style>

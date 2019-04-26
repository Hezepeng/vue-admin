<template>
  <div class="app-container">
    <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
      <el-form-item label="工号">
        <el-col :span="10">
          <el-input v-model="form.username" disabled />
        </el-col>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="姓名" prop="school">
        <el-col :span="10">
          <el-input v-model="form.school" />
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="10">
          <el-input v-model="form.password" type="password" />
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
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

      <el-form-item>
        <el-button type="primary" :disabled="!infoChanged" @click="onSubmit">保存信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPersonDetail, updatePerson } from '@/api/person'

export default {
  name: 'EditPerson',

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
      form: {
        id: '',
        name: '',
        position: '',
        school: '',
        sex: '',
        department: '',
        remark: ''
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '姓名不能为空' }],
        school: [{ required: true, trigger: 'blur', message: '毕业院校不能为空' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        sex: [{ required: true, trigger: 'blur', message: '性别不能为空' }],
        department: [{ required: true, trigger: 'blur', message: '部门不能为空' }],
        position: [{ required: true, trigger: 'blur', message: '职位不能为空' }]
      },
      startRender: false,
      infoChanged: false
    }
  },
  computed: {
    'username': function() {
      return this.$store.getters.username
    }
  },
  watch: {
    'form': {
      handler: function(value, oldValue) {
        if (this.startRender) {
          this.infoChanged = true
        }
      },
      deep: true,
      immediate: false
    }
  },
  mounted: function() {
    getPersonDetail(this.username).then(response => {
      this.form = response.data
    }).then(() => {
      this.infoChanged = false
      this.startRender = true
    })
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updatePerson(this.form).then(response => {
            this.$message({
              message: '保存成功！',
              type: 'success',
              center: true,
              duration: 4000
            })
            this.infoChanged = false
            const _this = this
            setTimeout(function() {
              _this.$router.push('/my')
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

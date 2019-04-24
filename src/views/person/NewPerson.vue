<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="员工姓名">
        <el-col :span="10">
          <el-input v-model="form.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="10">
          <el-input v-model="form.password" type="password"/>
        </el-col>
      </el-form-item>
      <el-form-item label="员工性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>

      <el-form-item label="入职部门">
        <el-col :span="10">
          <el-select v-model="form.department" placeholder="选择员工所属部分">
            <el-option label="后勤" value="1" />
            <el-option label="行政" value="2" />
            <el-option label="财务" value="3" />
            <el-option label="销售" value="4" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-col :span="10">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择员工开始入职时间" style="width: 100%;" />
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
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NewPerson',

  data() {
    return {
      form: {
        name: '',
        idCard: '',
        sex: '',
        department: '',
        entryTime: null,
        remark: '',
      }
    }
  },

  methods: {
    onSubmit() {
      this.$message('submit!')
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

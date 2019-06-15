<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.Person.username.toString().toLowerCase().includes(search.toLowerCase())||
            data.Person.name.toLowerCase().includes(search.toLowerCase())||
            data.Person.department.toLowerCase().includes(search.toLowerCase()) ||
            data.Person.position.toLowerCase().includes(search.toLowerCase()) ||
            data.time.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.completeTask.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.targetTask.toString().toLowerCase().includes(search.toLowerCase()))"
          height="600"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="No."
            width="50"
          />
          <el-table-column
            prop="Person.username"
            label="工号"
            width="100"
          />
          <el-table-column
            prop="Person.name"
            label="姓名"
            width="100"
          />
          <el-table-column
            prop="year"
            label="年份"
            sortable
            width="80"
          />
          <el-table-column
            prop="month"
            label="月份"
            sortable
            width="80"
          />
          <el-table-column
            prop="targetTask"
            label="任务目标量"
            sortable
            width="120"
          />
          <el-table-column
            prop="completeTask"
            label="任务完成量"
            sortable
            width="120"
          />
          <el-table-column
            prop="baseSalary"
            label="底薪"
            sortable
            width="120"
          />
          <el-table-column
            prop="deduct"
            label="扣除"
            sortable
            width="120"
          />
          <el-table-column
            prop="reward"
            label="奖励"
            sortable
            width="120"
          />
          <el-table-column
            prop="tax"
            label="五险税费"
            sortable
            width="120"
          />
          <el-table-column
            prop="total"
            label="总收入"
            sortable
            width="120"
          />
          <el-table-column
            prop="income"
            label="实际收入"
            sortable
            width="120"
          />
          <el-table-column
            align="center"
            width="180"
          >
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getMySalaryList, getSalaryList } from '@/api/salary'

export default {
  name: 'MyHistorySalary',

  data() {
    return {
      tableData: [],
      search: '',
      showDialog: false,
      editRow: null
    }
  },
  computed: {
    'username': function() {
      return this.$store.getters.username
    }
  },
  mounted: function() {
    const _this = this
    getMySalaryList(this.username).then(response => {
      const data = response.data
      for (const i in data) {
        data[i].time = parseTime(data[i].time)
      }
      _this.tableData = data
    })
  },
}
</script>

<style scoped>

</style>

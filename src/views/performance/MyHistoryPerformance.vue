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
            data.targetTask.toLowerCase().includes(search.toLowerCase()))"
          height="600"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="No."
            width="60"
          />
          <el-table-column
            prop="Person.username"
            label="工号"
            width="120"
          />
          <el-table-column
            prop="Person.name"
            label="姓名"
            width="160"
          />
          <el-table-column
            prop="Person.department"
            label="部门"
            width="120"
          />
          <el-table-column
            prop="Person.position"
            label="职位"
            width="120"
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
            prop="type"
            label="完成情况"
            width="120"
            sortable
            :filters="[{ text: '进行中', value: '进行中' }, { text: '已完成', value: '已完成' }, { text: '已超出', value: '已超出' }]"
            :filter-method="filterType"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.completeTask < scope.row.targetTask ? 'warning' : scope.row.completeTask === scope.row.targetTask ? 'primary' : 'success'"
                disable-transitions
              >{{ scope.row.completeTask < scope.row.targetTask ? '进行中' : scope.row.completeTask === scoperow.targetTask ? '已完成' : '已超出' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
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
import { getMyPerformanceList} from '@/api/performance'

export default {
  name: 'MyHistoryPerformance',

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
    getMyPerformanceList(this.username).then(response => {
      const data = response.data
      for (const i in data) {
        data[i].time = parseTime(data[i].time)
      }
      _this.tableData = data
    })
  },
  methods:{
    filterType(value, row) {
      return row.type === value
    },
    filterDepartment(value, row) {
      return row.department === value
    },
    filterPosition(value, row) {
      return row.position === value
    },
  }
}
</script>

<style scoped>

</style>

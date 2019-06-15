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
            width="120"
          />
          <el-table-column
            prop="Person.department"
            label="部门"
            width="100"
            sortable
            :filters="[{ text: '行政', value: '行政' }, { text: '人事', value: '人事' }, { text: '财务', value: '财务' }, { text: '业务', value: '业务' }]"
            :filter-method="filterDepartment"
            filter-placement="bottom-end"
          />
          <el-table-column
            prop="Person.position"
            label="职位"
            width="100"
            sortable
            :filters="[{ text: '员工', value: '员工' }, { text: '组长', value: '组长' }, { text: '主管', value: '主管' }, { text: '总经理', value: '总经理' }]"
            :filter-method="filterPosition"
            filter-placement="bottom-end"
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
              >{{ scope.row.completeTask < scope.row.targetTask ? '进行中' : scope.row.completeTask === scope.row.targetTask ? '已完成' : '已超出' }}
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
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="$router.push('/salary/add/'+scope.row.id)"
                :disabled="scope.row.isEnd"
              >发放当月工资
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="onEditRow(scope.$index, scope.row)"
                :disabled="scope.row.isEnd"
              >编辑
              </el-button>
<el-button
                size="mini"
                type="text"
                @click="onDeleteRow(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div v-if="showDialog">
      <el-dialog title="业绩信息管理" :visible.sync="showDialog">
        <el-form :model="editRow" label-width="120px">
          <el-form-item label="工号">
            <el-col :span="16">
              <el-input v-model="editRow.Person.username" disabled />
            </el-col>
          </el-form-item>
          <el-form-item label="姓名">
            <el-col :span="16">
              <el-input v-model="editRow.Person.name" disabled />
            </el-col>
          </el-form-item>
          <el-form-item label="任务目标量">
            <el-col :span="16">
              <el-input-number v-model="editRow.targetTask" :min="1" :step="1" label="设置该月的任务量" />
            </el-col>
          </el-form-item>
          <el-form-item label="任务完成量">
            <el-col :span="16">
              <el-input-number v-model="editRow.completeTask" :min="0" :step="1" label="设置该月的完成量" />
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="onSaveEditRow()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { deepCopy, parseTime } from '@/utils'
import { deletePerformance, getPerformanceList, updatePerformance } from '@/api/performance'

export default {
  name: 'PerformanceList',

  data() {
    return {
      tableData: [],
      search: '',
      showDialog: false,
      editRow: null
    }
  },

  mounted: function() {
    const _this = this
    getPerformanceList().then(response => {
      const data = response.data
      for (const i in data) {
        data[i].time = parseTime(data[i].time)
      }
      _this.tableData = data
    })
  },

  methods: {
    filterType(value, row) {
      return row.type === value
    },
    filterDepartment(value, row) {
      return row.department === value
    },
    filterPosition(value, row) {
      return row.position === value
    },
    onEditRow(index, row) {
      this.editRow = deepCopy(row)
      this.showDialog = true
    },
    onSaveEditRow() {
      const _this = this
      const row = this.editRow
      updatePerformance(this.editRow).then(response => {
        console.log(this.editRow.username)
        this.tableData.filter(function(item) {
          if (item.id === row.id) {
            item.targetTask = row.targetTask
            item.completeTask = row.completeTask
            _this.$message({
              message: '保存成功！',
              type: 'success',
              center: true,
              duration: 2000
            })
          }
          return item.id === row.id
        })
      }).then(() => {
        _this.editRow = null
        _this.showDialog = false
      })
    },
    onDeleteRow(index, row) {
      this.$confirm('此操作将删除与该绩效关联的工资发放记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePerformance(row).then(response => {
          this.tableData.splice(this.tableData.indexOf(row), 1)
          this.$message({
            message: '删除成功！',
            type: 'success',
            center: true,
            duration: 2000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

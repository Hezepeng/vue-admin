<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.Person.username.toString().toLowerCase().includes(search.toLowerCase())||
            data.Person.name.toLowerCase().includes(search.toLowerCase())||
            data.Person.department.toLowerCase().includes(search.toLowerCase()) ||
            data.type.toLowerCase().includes(search.toLowerCase()) ||
            data.time.toString().toLowerCase().includes(search.toLowerCase()))"
          height="600"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="Person.username"
            label="工号"
            width="180"
          />
          <el-table-column
            prop="Person.name"
            label="姓名"
            width="180"
          />
          <el-table-column
            prop="Person.department"
            label="部门"
            width="180"
            sortable
            :filters="[{ text: '行政', value: '行政' }, { text: '人事', value: '人事' }, { text: '财务', value: '财务' }, { text: '业务', value: '业务' }]"
            :filter-method="filterDepartment"
            filter-placement="bottom-end"
          />
          <el-table-column
            prop="type"
            label="打卡类型"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="打卡时间"
            sortable
            width="180"
          />
          <!--<el-table-column-->
          <!--prop="remark"-->
          <!--label="备注"-->
          <!--/>-->
          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template slot-scope="scope">
              <!--<el-button-->
                <!--size="mini"-->
                <!--type="text"-->
                <!--@click="onEditRow(scope.$index, scope.row)"-->
              <!--&gt;编辑-->
              <!--</el-button>-->
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
      <el-dialog title="编辑信息" :visible.sync="showDialog">
        <el-form :model="editRow" label-width="120px">
          <el-form-item label="备注信息">
            <el-col :span="16">
              <el-input v-model="editRow.remark" type="textarea" rows="5" />
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="onSaveEditRow()">保存更改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { deleteAttendance, getMyAttendanceList, updateAttendance } from '@/api/attendance'
import { deepCopy, parseTime } from '@/utils'

export default {
  name: 'MyHistoryAttendance',
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
    getMyAttendanceList(this.username).then(response => {
      _this.tableData = response.data
      for (const i in _this.tableData) {
        _this.tableData[i].time = parseTime( _this.tableData[i].time)
      }
    })
  },

  methods: {
    filterType(value, row) {
      return row.type === value
    },
    filterDepartment(value, row) {
      return row.department === value
    },
    onEditRow(index, row) {
      this.editRow = deepCopy(row)
      this.showDialog = true
    },
    onSaveEditRow() {
      const _this = this
      const row = this.editRow
      updateAttendance(this.editRow).then(response => {
        console.log(this.editRow.username)
        this.tableData.filter(function(item) {
          if (item.id === row.id) {
            item.remark = row.remark
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
      deleteAttendance(row).then(response => {
        this.tableData.splice(this.tableData.indexOf(row), 1)
        this.$message({
          message: '删除成功！',
          type: 'success',
          center: true,
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

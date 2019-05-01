<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.Person.username.toString().toLowerCase().includes(search.toLowerCase())||
            data.Person.name.toLowerCase().includes(search.toLowerCase())||
            data.Person.department.toLowerCase().includes(search.toLowerCase()) ||
            data.type.toLowerCase().includes(search.toLowerCase()) ||
            data.time.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.remark.toLowerCase().includes(search.toLowerCase()))"
          height="600"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="username"
            label="工号"
            width="130"
          />
          <el-table-column
            prop="Person.name"
            label="姓名"
            width="90"
          />
          <!--<el-table-column-->
          <!--prop="Person.department"-->
          <!--label="部门"-->
          <!--width="180"-->
          <!--sortable-->
          <!--:filters="[{ text: '行政', value: '行政' }, { text: '后勤', value: '后勤' }, { text: '财务', value: '财务' }, { text: '销售', value: '销售' }]"-->
          <!--:filter-method="filterDepartment"-->
          <!--filter-placement="bottom-end"-->
          <!--/>-->
          <!--<el-table-column-->
          <!--prop="type"-->
          <!--label="打卡类型"-->
          <!--width="120"-->
          <!--sortable-->
          <!--:filters="[{ text: '上班', value: '上班' }, { text: '下班', value: '下班' }]"-->
          <!--:filter-method="filterType"-->
          <!--filter-placement="bottom-end"-->
          <!--&gt;-->
          <!--<template slot-scope="scope">-->
          <!--<el-tag-->
          <!--:type="scope.row.type === '上班' ? 'primary' : 'success'"-->
          <!--disable-transitions-->
          <!--&gt;{{ scope.row.type }}-->
          <!--</el-tag>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            prop="createTime"
            label="申请时间"
            sortable
            width="180"
          />
          <el-table-column
            prop="days"
            label="请假天数"
            width="60"
          />
          <el-table-column
            prop="reason"
            label="请假原因"
          />
          <el-table-column
            prop="state"
            label="申请状态"
            width="120"
            sortable
            :filters="[{ text: '待审核', value: '待审核' }, { text: '已通过', value: '已通过' },{ text: '已拒绝', value: '已拒绝' }]"
            :filter-method="filterState"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === '已通过' ? 'success' : scope.row.state === '待审核'?'warning':'danger'"
                disable-transitions
              >{{ scope.row.state }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="replyTime"
            label="审核时间"
          />
          <el-table-column
            prop="replyContent"
            label="审核回复内容"
          />
          <el-table-column
            prop="month"
            label="申请所在月份"
            width="60"
          />
          <!--<el-table-column align="center">-->
          <!--<template slot="header" slot-scope="scope">-->
          <!--<el-input-->
          <!--v-model="search"-->
          <!--size="mini"-->
          <!--placeholder="输入关键字搜索"-->
          <!--/>-->
          <!--</template>-->
          <!--<template slot-scope="scope">-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--@click="onEditRow(scope.$index, scope.row)"-->
          <!--&gt;编辑-->
          <!--</el-button>-->
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="onDeleteRow(scope.$index, scope.row)"-->
          <!--&gt;删除-->
          <!--</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
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
import { getMyVacationList } from '../../api/vacation'
import { parseTime } from "@/utils";

export default {
  name: 'MyHistoryVacation',

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
    getMyVacationList(this.username).then(response => {
      _this.tableData = response.data
      for (const i in _this.tableData) {
        _this.tableData[i].replyTime = parseTime(_this.tableData[i].replyTime)
        _this.tableData[i].createTime = parseTime(_this.tableData[i].createTime)
      }
    })
  },

  methods: {
    filterState(value, row) {
      return row.state === value
    },
    filterDepartment(value, row) {
      return row.department === value
    }
    // onEditRow(index, row) {
    //   this.editRow = deepCopy(row)
    //   this.showDialog = true
    // },
    // onSaveEditRow() {
    //   const _this = this
    //   const row = this.editRow
    //   updateAttendance(this.editRow).then(response => {
    //     console.log(this.editRow.username)
    //     this.tableData.filter(function(item) {
    //       if (item.id === row.id) {
    //         item.remark = row.remark
    //         _this.$message({
    //           message: '保存成功！',
    //           type: 'success',
    //           center: true,
    //           duration: 2000
    //         })
    //       }
    //       return item.id === row.id
    //     })
    //   }).then(() => {
    //     _this.editRow = null
    //     _this.showDialog = false
    //   })
    // },
    // onDeleteRow(index, row) {
    //   deleteAttendance(row).then(response => {
    //     this.tableData.splice(this.tableData.indexOf(row), 1)
    //     this.$message({
    //       message: '删除成功！',
    //       type: 'success',
    //       center: true,
    //       duration: 2000
    //     })
    //   })
    // }
  }
}
</script>

<style scoped>

</style>

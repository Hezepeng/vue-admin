<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()) ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.sex.toLowerCase().includes(search.toLowerCase()) ||
            data.department.toLowerCase().includes(search.toLowerCase()) ||
            data.startTimes.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.endTimes.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.remark.toLowerCase().includes(search.toLowerCase()))"
          height="600"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="username"
            label="工号"
            width="100"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="120"
          />
          <el-table-column
            prop="sex"
            label="性别"
            sortable
            width="80"
          />
          <el-table-column
            prop="password"
            label="密码"
            show-overflow-tooltip
          />
          <el-table-column
            prop="department"
            label="部门"
            width="120"
            sortable
            :filters="[{ text: '行政', value: '行政' }, { text: '后勤', value: '后勤' }, { text: '财务', value: '财务' }, { text: '销售', value: '销售' }]"
            :filter-method="filterDepartment"
            filter-placement="bottom-end"
          />
          <el-table-column
            prop="startTimes"
            label="上班打卡次数"
            sortable
            width="140"
          />
          <el-table-column
            prop="endTimes"
            label="下班打卡次数"
            sortable
            width="140"
          />
          <el-table-column
            prop="state"
            label="今日状态"
            width="120"
            sortable
            :filters="[{ text: '上班', value: '上班' }, { text: '请假', value: '请假' }, { text: '出差', value: '出差' }]"
            :filter-method="filterState"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === '上班' ? 'success' : scope.row.state === '请假' ? 'danger' :'primary'"
                disable-transitions
              >{{ scope.row.state }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注信息"
            width="100"
          />
          <el-table-column align="center" width="240">
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
                @click="onEditRow(scope.$index, scope.row)"
              >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
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
          <el-form-item label="部门" prop="department">
            <el-col :span="16">
              <el-select v-model="editRow.department" placeholder="选择员工所属部分">
                <el-option label="后勤" value="后勤" />
                <el-option label="行政" value="行政" />
                <el-option label="财务" value="财务" />
                <el-option label="销售" value="销售" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-col :span="16">
              <el-input v-model="editRow.remark" type="textarea" rows="5" />
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
import { getPersonList } from '../../api/person'
import { deepCopy } from '@/utils'
import { deletePerson, updatePerson } from '@/api/person'

export default {
  name: 'PersonList',

  data () {
    return {
      tableData: [],
      search: '',
      editRow: null,
      showDialog: false
    }
  },

  computed: {},

  watch: {},

  created: function() {

  },

  mounted: function() {
    const _this = this
    getPersonList().then(response => {
      _this.tableData = response.data
    })
  },

  methods: {
    filterState (value, row) {
      return row.state === value
    },
    filterDepartment (value, row) {
      return row.department === value
    },
    onEditRow (index, row) {
      this.editRow = deepCopy(row)
      this.showDialog = true
    },
    onSaveEditRow () {
      const _this = this
      const row = this.editRow
      updatePerson(this.editRow).then(response => {
        console.log(this.editRow.username)
        this.tableData.filter(function(item) {
          if (item.username === row.username) {
            item.department = row.department
            item.remark = row.remark
            _this.$message({
              message: '保存成功！',
              type: 'success',
              center: true,
              duration: 2000
            })
          }
          return item.username === row.username
        })
      }).then(() => {
        _this.editRow = null
        _this.showDialog = false
      })
    },
    onDeleteRow (index, row) {
      deletePerson(row).then(response => {
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

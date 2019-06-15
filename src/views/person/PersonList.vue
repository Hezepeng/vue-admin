<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.username.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
            data.name.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
            data.sex.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
            data.school.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
            data.department.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
            data.position.toString().toLowerCase().includes(search.toString().toLowerCase()))"
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
            prop="password"
            label="密码"
            show-overflow-tooltip
          />
          <el-table-column
            prop="sex"
            label="性别"
            sortable
            width="80"
          />
          <el-table-column
            prop="school"
            label="毕业院校"
            sortable
            width="120"
          />
          <el-table-column
            prop="department"
            label="部门"
            width="120"
            sortable
            :filters="[{ text: '行政', value: '行政' }, { text: '人事', value: '人事' }, { text: '财务', value: '财务' }, { text: '业务', value: '业务' }]"
            :filter-method="filterDepartment"
            filter-placement="bottom-end"
          />
          <el-table-column
            prop="position"
            label="职位"
            width="120"
            sortable
            :filters="[{ text: '员工', value: '员工' }, { text: '组长', value: '组长' }, { text: '主管', value: '主管' }, { text: '总经理', value: '总经理' }]"
            :filter-method="filterPosition"
            filter-placement="bottom-end"
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
                type="text"
                @click="onEditRow(scope.$index, scope.row)"
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
      <el-dialog title="编辑信息" :visible.sync="showDialog">
        <el-form :model="editRow" label-width="80px">
          <el-form-item label="部门" prop="department">
            <el-col :span="12">
              <el-select v-model="editRow.department" placeholder="选择员工所属部分">
                <el-option label="人事" value="人事" />
                <el-option label="行政" value="行政" />
                <el-option label="财务" value="财务" />
                <el-option label="业务" value="业务" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-col :span="12">
              <el-select v-model="editRow.position" placeholder="选择员工的职位">
                <el-option label="员工" value="员工" />
                <el-option label="组长" value="组长" />
                <el-option label="主管" value="主管" />
                <el-option label="总经理" value="总经理" />
              </el-select>
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

  data() {
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
      updatePerson(this.editRow).then(response => {
        console.log(this.editRow.username)
        this.tableData.filter(function(item) {
          if (item.username === row.username) {
            item.department = row.department
            item.position = row.position
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
    onDeleteRow(index, row) {
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

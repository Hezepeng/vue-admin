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
          style="width: 100%">
          <el-table-column
            prop="id"
            label="工号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            sortable
            width="80">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            width="120"
            sortable
            :filters="[{ text: '行政', value: '行政' }, { text: '后勤', value: '后勤' }, { text: '财务', value: '财务' }, { text: '销售', value: '销售' }]"
            :filter-method="filterDepartment"
            filter-placement="bottom-end">
          </el-table-column>
          <el-table-column
            prop="startTimes"
            label="上班打卡次数"
            sortable
            width="140">
          </el-table-column>
          <el-table-column
            prop="endTimes"
            label="下班打卡次数"
            sortable
            width="140">
          </el-table-column>
          <el-table-column
            prop="state"
            label="今日状态"
            width="120"
            sortable
            :filters="[{ text: '正常', value: 1 }, { text: '请假', value: 2 }, { text: '出差', value: 3 }]"
            :filter-method="filterState"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === 1 ? 'success' : scope.row.state === 2 ? 'danger' :'primary'"
                disable-transitions>{{scope.row.state === 1 ? '正常' : scope.row.state === 2 ? '请假' :'出差'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注信息"
            width="100">
          </el-table-column>
          <el-table-column align="center" width="240">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getPersonList } from '../../api/person'

export default {
  name: 'PersonList',

  data() {
    return {
      tableData: [],
      search: ''
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
    filterState(value, row) {
      return row.state === value
    },
    filterDepartment(value, row) {
      return row.department === value
    }
  }
}
</script>

<style scoped>

</style>

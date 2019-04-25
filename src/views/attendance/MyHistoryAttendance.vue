<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase())||
            data.name.toLowerCase().includes(search.toLowerCase())||
            data.department.toLowerCase().includes(search.toLowerCase()) ||
            data.type.toLowerCase().includes(search.toLowerCase()) ||
            data.time.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.remark.toLowerCase().includes(search.toLowerCase()))"
          height="600"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="工号"
            width="180"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          />
          <el-table-column
            prop="department"
            label="部门"
            width="180"
            sortable
            :filters="[{ text: '行政', value: '行政' }, { text: '后勤', value: '后勤' }, { text: '财务', value: '财务' }, { text: '销售', value: '销售' }]"
            :filter-method="filterDepartment"
            filter-placement="bottom-end"
          />
          <el-table-column
            prop="type"
            label="打卡类型"
            width="120"
            sortable
            :filters="[{ text: '上班', value: '上班' }, { text: '下班', value: '下班' }]"
            :filter-method="filterType"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type === '上班' ? 'primary' : 'success'"
                disable-transitions
              >{{ scope.row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            label="打卡时间"
            sortable
            width="180"
          />
          <el-table-column
            prop="remark"
            label="备注"
          />
          <el-table-column align="center">
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
                @click="handleEdit(scope.$index, scope.row)"
              >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMyAttendanceList } from '@/api/attendance'

export default {
  name: 'MyHistoryAttendance',
  data() {
    return {
      tableData: [],
      search: ''
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
    })
  },

  methods: {
    filterType(value, row) {
      return row.type === value
    },
    filterDepartment(value, row) {
      return row.department === value
    }
  }
}
</script>

<style scoped>

</style>

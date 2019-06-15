<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.username.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.sex.toLowerCase().includes(search.toLowerCase()) ||
            data.school.toLowerCase().includes(search.toLowerCase()) ||
            data.department.toLowerCase().includes(search.toLowerCase()) ||
            data.position.toLowerCase().includes(search.toLowerCase()))"
          height="600"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="username"
            label="工号"
            width="120"
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
                type="success"
                @click="$router.push('/performance/add/'+scope.row.username)"
              >设定绩效目标
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
  }
}
</script>

<style scoped>

</style>

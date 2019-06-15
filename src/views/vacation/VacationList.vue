<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData.filter(data => !search || data.username.toString().toLowerCase().includes(search.toLowerCase())||
            data.Person.name.toLowerCase().includes(search.toLowerCase()) ||
            data.Person.school.toLowerCase().includes(search.toLowerCase()) ||
            data.state.toLowerCase().includes(search.toLowerCase()) ||
            data.days.toString().toLowerCase().includes(search.toLowerCase()) ||
            data.createTime.toLowerCase().includes(search.toLowerCase()) ||
            data.reason.toLowerCase().includes(search.toLowerCase()) ||
            data.replyContent.toLowerCase().includes(search.toLowerCase()))"
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
          <el-table-column
            prop="Person.school"
            label="学校"
            width="160"
          />
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
            width="180"
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
            prop="replyContent"
            label="申请回复"
          />
          <el-table-column align="center" width="180">
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
                :disabled="scope.row.state==='已通过'"
                @click="onPass(scope.$index, scope.row)"
              >通过
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="onReject(scope.$index, scope.row)"
              >拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div v-if="showDialog">
      <el-dialog :title="replyTitle" :visible.sync="showDialog">
        <el-form :model="editRow" label-width="120px">
          <el-form-item label="回复内容">
            <el-col :span="16">
              <el-input v-model="editRow.replyContent" type="textarea" rows="5" placeholder="请写下回复内容" />
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="onIfPass()">{{ buttonContent }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getVacationList, updateVacation } from '../../api/vacation'
import { deepCopy, parseTime } from '@/utils'

export default {
  name: 'VacationList',

  data() {
    return {
      tableData: [],
      search: '',
      showDialog: false,
      editRow: null,
      replyTitle: '',
      buttonContent: ''
    }
  },

  mounted: function() {
    const _this = this
    getVacationList().then(response => {
      const data = response.data
      for (const i in data) {
        data[i].replyTime = parseTime(data[i].replyTime)
        data[i].createTime = parseTime(data[i].createTime)
        data[i].replyContent = data[i].replyContent === null ? '' : data[i].replyContent.toString()
      }
      _this.tableData = data
    })
  },

  methods: {
    filterState(value, row) {
      return row.state === value
    },
    onPass(index, row) {
      this.editRow = deepCopy(row)
      console.log(this.editRow)
      console.log(row)
      this.buttonContent = '确认通过'
      this.replyTitle = '通过申请，请写下回复内容'
      this.showDialog = true
    },
    onReject(index, row) {
      this.editRow = deepCopy(row)
      this.buttonContent = '确认拒绝'
      this.replyTitle = '拒绝申请，请写下回复内容'
      this.showDialog = true
    },
    onIfPass() {
      if (this.buttonContent === '确认通过') {
        this.editRow.state = '已通过'
      } else {
        this.editRow.state = '已拒绝'
      }
      const _this = this
      const row = this.editRow
      updateVacation(this.editRow).then(response => {
        this.tableData.filter(function(item) {
          if (item.id === row.id) {
            item.state = row.state
            item.replyContent = row.replyContent
            _this.$message({
              message: '已更新审核状态',
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
    }

  }
}
</script>

<style scoped>

</style>

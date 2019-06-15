<template>
  <div id="login">
    <div class="loginHeader">
      <p>外贸公司人事管理系统</p>
    </div>
    <div class="banner">
      <el-radio-group v-model="labelPosition" size="small" />
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password" type="password" />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="formLabelAlign.role" placeholder="请选择用户类型">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Test',
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        password: '',
        role: ''
      },
      bodyStyle: {
        background: 'url(' + require('../../assets/sky.jpg') + ') n-repeat',
        backgroundSize: 'cover'
      }
    }
  },

  mounted() {
    document.querySelector('body').setAttribute('style', 'background:url(' + require('@/assets/sky.jpg') + ') no-repeat;background-size:cover')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    onSubmit() {
      if (this.formLabelAlign.username === '') {
        this.$message('用户名不能为空')
      } else if (this.formLabelAlign.password === '') {
        this.$message('密码不能为空')
      } else if (this.formLabelAlign.role === '') {
        this.$message('用户类型不能为空')
      } else {
        this.loading = true
        this.$store
          .dispatch('login', this.formLabelAlign)
          .then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          })
          .catch(() => {
            this.loading = false
            console.log('输入数据不合法！')
          })
      }
    }
  }
}
</script>

<style>
#login {
  margin: 100px auto;
}

.loginHeader {
  width: 35%;
  margin: 0 auto;
  padding: 20px 30px;
  height: 58px;
  opacity: 0.9;
  /*box-shadow: 0 0 10px #5e5b5b;*/
  -webkit-border-radius: 10px 10px 0 0;
  -moz-border-radius: 10px 10px 0 0;
  border-radius: 10px 10px 0 0;
  background-color: #409EFF;
}

.loginHeader p {
  display: inline-block;
  height: 100%;
  width: 100%;
  margin: 0;
  /*line-height: 58px;*/
  text-align: center;
  color: #fff;
  font-size: 23px;
}

.banner {
  /*box-shadow: 0 0 10px #5e5b5b;*/
  width: 35%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: dimgray;
  opacity: 0.7;
  -webkit-border-radius: 0 0 10px 10px;
  -moz-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

.banner .el-form-item__label {
  color: #fff;
}

.banner .el-form--label-top {
  margin: 8px 35px;
}

.banner .el-button--primary, .banner .el-select {
  width: 100%;
}

.banner .el-form--label-right {
  width: 86%;
}
</style>

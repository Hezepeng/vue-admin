<template>
  <div class="navbar">
    <div class="right-menu">
      <a style="display:block;font-size: 15px;color: #5a5e66;margin-right: 10px" @click="logout">退出登录</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {},
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    icon: function() {
      return this.avatar.toString()
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('logOut')
      this.$router.push(`/login?redirect=${ this.$route.fullPath }`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 30px;
  overflow: hidden;
  position: relative;
  background: #fff;

  .hamburger-container {
    line-height: 35px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 35px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

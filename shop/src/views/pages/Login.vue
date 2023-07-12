<template>
  <div class="login_wrap">
    <div class="form_wrap">
      <el-form
        ref="formRef"
        :model="loginData"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="username"
          label="用户名"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="loginData.username" />
        </el-form-item>

        <el-form-item
          prop="password"
          label="密码"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
        >
          <el-input type="password" v-model="loginData.password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login_btn" @click="handleLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>    
<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { loginApi } from "@/util/request";
export default {
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      loginData: {
        username: "",
        password: "",
      },
    });
    const handleLogin = () => {
      // 请求后台接口
      // 默认用户：admin/123456
      loginApi(data.loginData).then((res) => {
        if (res.data) {
          store.commit("setUserInfo", res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          // 跳转
          router.push({
            path: "/helloWorld",
          });
        }
      });
    };
    return {
      ...toRefs(data),
      handleLogin,
    };
  },
};
</script>
<style  scoped>
.login_wrap {
  width: 100%;
  height: 100vh;
  background: rgb(56, 86, 139);
  position: relative;
}
.form_wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 30px 50px;
  border-radius: 5px;
}
.login_btn {
  display: block;
  margin: 10px auto;
}
</style>
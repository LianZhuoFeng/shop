<template>
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>账户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 白色内容 -->
  <div class="page_content">
    <div class="flex">
      <div class="input_box">
        <el-input
          v-model="serachParams.query"
          placeholder="搜索关键字"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="serachList"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </div>
      <el-button type="primary" @click="addUser">新建用户</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="username" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="mobile" label="电话" />
      <el-table-column prop="role_name" label="角色" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.mg_state" @change="switchChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="total, prev, pager, next, sizes, jumper"
      :total="total"
      v-model:currentPage="serachParams.pagenum"
      v-model:page-size="serachParams.pagesize"
      :page-sizes="[2,3,4,5]"
      @size-change="serachList"
      @current-change="serachList"  
    />
  </div>

  <!-- 新建弹窗 -->
  <el-dialog v-model="dialogFormVisible" title="新建用户">
    <el-form :model="formData" :rules="rules" ref="userForm">
      <el-form-item label="用户名称" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="请输入用户密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="formData.email"
          placeholder="请输入用户邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入用户手机号码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submitFrom(userForm)">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 编辑弹窗 -->
  <el-dialog v-model="dialogFormEVisible" title="编辑用户">
    <el-form :model="formDataEdit" :rules="rulesEdit" ref="userFormEdit">
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="formDataEdit.email"
          placeholder="请输入用户邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="formDataEdit.mobile"
          placeholder="请输入用户手机号码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submitFromEdit(userFormEdit)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { toRefs, reactive, ref } from "vue";
import { userListApi, userAddApi,userChangeStateApi,userEditApi,deleteUserApi } from "@/util/request";
export default {
  name: "UsersList",
  setup() {
    const data = reactive({
      serachParams: {
        query: "",
        pagesize: 5,
        pagenum: 1,
      },
      total:0,
      userList: [],
      dialogFormVisible: false,
      dialogFormEVisible:false,
      formData: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "此项为必填项", trigger: "blur" },
        ],
        email: [
          {
            required: false,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "请填写正确邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: false,
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请填写正确手机号码",
            trigger: "blur",
          },
        ],
      },
      formDataEdit:{
        id:'',
        email: "",
        mobile: "",
      },
      rulesEdit:{
        email: [
          {
            required: false,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "请填写正确邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: false,
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请填写正确手机号码",
            trigger: "blur",
          },
        ],
      }
    });
    const serachList = () => {
      userListApi(data.serachParams).then((res) => {
        if (res.data) {
          data.userList = res.data.users;
          data.total = res.data.total
        }
      });
    };
    const addUser = () => {
      data.dialogFormVisible = true;
    };
    const cancel = ()=>{
      data.dialogFormVisible = false;
      data.dialogFormEVisible = false;
    }
    serachList();
    const userForm = ref();
    const userFormEdit =ref();
    // 新增提交
    const submitFrom = (formEl) => {
      formEl.validate((res) => {
        if (!res) {
          return;
        }
        userAddApi(data.formData).then((res) => {
          if (res.data) {
            data.dialogFormVisible = false;
            data.formData = {
              username: "",
              password: "",
              email: "",
              mobile: "",
            };
            serachList();
          }
        });
        alert("通过");
      });
    };
    //修改提交
    const submitFromEdit = (formEdit) =>{
      formEdit.validate((res) => {
        if (!res) {
          return;
        }
        userEditApi(data.formDataEdit).then((res) => {
          if (res.data) {
            data.dialogFormEVisible = false;
            serachList();
          }
        });
      });
    }
    //状态更改
    const switchChange =(mg_state)=>{
      userChangeStateApi(mg_state).then(res=>{
        if(res.data){
          serachList()
        }
      })
    }
    //编辑数据
    const editRow = (row) =>{
      const {email,mobile,id} = row
      data.dialogFormEVisible = true
      data.formDataEdit.email = email
      data.formDataEdit.mobile = mobile
      data.formDataEdit.id = id
    } 
    //删除数据
    const deleteList = row =>{
      deleteUserApi(row).then(res=>{
        serachList()
      })
    }
    return {
      ...toRefs(data),
      serachList,
      addUser,
      submitFrom,
      userForm,
      userFormEdit,
      switchChange,
      editRow,
      submitFromEdit,
      cancel,
      deleteList
    };
  },
};
</script>

<style scoped>
.input_box {
  width: 200px;
  margin-right: 15px;
}
</style>
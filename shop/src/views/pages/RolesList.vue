<template>
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 白色弹框 -->
  <div class="page_content">
    <el-button type="primary" @click="dialogFormVisible = true"
      >新建角色</el-button
    >
    <el-table :data="rolesList" style="width: 100%">
      <el-table-column prop="roleName" label="角色名" />
      <el-table-column prop="roleDesc" label="角色描述" />
      <el-table-column>
        <template #default="scope">
          <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteList(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog
    v-model="dialogFormVisible"
    @close="clearForm"
    :title="formData.id ? '编辑角色' : '新建角色'"
  >
    <el-form :model="formData" :rules="rules" ref="rolesForm">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="formData.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input
          v-model="formData.roleDesc"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitFrom(rolesForm)"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { getRolesApi, addRolesApi, editRolesApi, rolesDeleteApi} from "@/util/request";
import { reactive, toRefs, ref } from "vue";
export default {
  name: "RolesList",
  setup() {
    const data = reactive({
      rolesList: [],
      dialogFormVisible: false,
      formData: {
        roleName: "",
        roleDesc: "",
      },
      rules: {
        roleName: {
          required: true,
          message: "此项必填",
          trigger: "blur",
        },
      },
    });
    const getList = () => {
      getRolesApi().then((res) => {
        data.rolesList = res.data;
      });
    };
    getList();
    const submitFrom = (formD) => {
      formD.validate((res) => {
        if (!res) {
          return;
        }
        if(data.formData.id){
          editRolesApi(data.formData).then((res)=>{
          if (res.data) {
            data.dialogFormVisible = false;
            getList();
          }
        })
        }else{
          addRolesApi(data.formData).then((res) => {
          if (res.data) {
            data.dialogFormVisible = false;
            getList();
          }
        });
        }
        
      });
    };
    const rolesForm = ref();
    const editRow = (row) => {
      data.dialogFormVisible = true;
      const { id, roleName, roleDesc } = row;
      data.formData = {
        id,
        roleName,
        roleDesc,
      };
    };
    const deleteList = (row) => {
      rolesDeleteApi(row).then(res=>{
        getList();
      })
    };
    const clearForm = ()=>{
      data.formData={
        roleName: "",
        roleDesc: "",
      }
    }
    return {
      ...toRefs(data),
      getList,
      editRow,
      deleteList,
      rolesForm,
      submitFrom,
      clearForm
    };
  },
};
</script>

<style>
</style>
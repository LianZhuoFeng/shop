<template>
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
    </div>

    <!-- 表格 -->
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="goods_name" label="商品名字" width="500px"/>
      <el-table-column prop="goods_price" label="价格（￥）" />
      <el-table-column prop="goods_weight" label="商品重量（g）" />
      <el-table-column prop="goods_state" label="商品状态">
        <template #default="scope">
            <p>{{switchState(scope.row.goods_state)}}</p>
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
      :page-sizes="[2,3,4,5,7]"
      @size-change="serachList"
      @current-change="serachList"  
    />
  </div>
</template>

<script>

import { toRefs, reactive,} from "vue";
import { goodsListApi} from "@/util/request";
export default {
  name: "GoodList",
  setup() {
    const data = reactive({
        serachParams: {
        query: "",
        pagesize: 5,
        pagenum: 1,
      },
      total:0,
      goodsList: [],
    });
    const serachList = () => {
      goodsListApi(data.serachParams).then((res) => {
        if(res.data){
            data.goodsList = res.data.goods
            data.total = res.data.total
        }
      });
    };
    serachList();
   const switchState = (num) =>{
    if(num === 0){
        return '未通过'
    }
    if(num === 1){
        return '审核中'
    }
    if(num === 2){
        return '已审核'
    }
    
   }
    return {
      ...toRefs(data),
      serachList,
      switchState
    };
  },
};
</script>

<style>
</style>
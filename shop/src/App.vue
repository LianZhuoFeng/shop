<template>
  <router-view/>
</template>

<style>
body,html{
  margin: 0;
  padding: 0;
}
/* 布局类名 */
.flex-float{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex{
  display: flex;
  align-items: center;
}
.page_content{
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
}
</style>

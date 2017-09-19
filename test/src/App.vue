<template>
  <div id="app" class="wrapper" ref="wrapper"> 
    <!-- 最好是全屏div作为父节点，第一个子节点会被控件写入一个css动画，所以第一个子节点一定要是循环体，外部的父节点需要控制height为100%，并且overflow:hidden; -->
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
      <ul class="content">
        <li v-for="(item,key) in items" :key="key">{{item}}</li>
      </ul>
      <div v-if="top" class="loading-top">{{topText}}</div>
      <div v-if="bottom" class="loading-bottom">{{bottomText}}</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import {loadData} from './assets/data.js';
export default {
  name: 'app',
  data(){
    return {
      items:[],
      topText:'下拉刷新',
      bottomText:'上拉加载',
      pageNum:1,
      top:true,
      bottom:true,
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      loadData(this.pageNum).then((data) => {
        console.log(data);
        if(this.pageNum==1){
          this.items = data;
        }else{
          if(data.length==0){
            this.pageNum = 10;
            this.bottomText = '已经到底了';
          }
          this.items = [...this.items,'-------'+this.pageNum+'-------',...data];
        }
        // this.top = false;
        // this.bottom = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {})
            this.scroll.on('touchEnd', (pos) => {
                // this.top = true;
              // 下拉动作
              if (pos.y > 50) {
                this.pageNum = 1;
                this.init(1)
              }
            })
            this.scroll.on('scrollEnd',(pos) => {
              // this.bottom = true;
              console.log(this.scroll.y,this.scroll.maxScrollY + 100);
              if (this.scroll.y <= (this.scroll.maxScrollY + 100)) {
                this.pageNum++;
                this.init(this.pageNum)
              }
            });
          } else {
            this.scroll.refresh()
          }
            console.log(this.scroll);
        });
      },(error) => {
        console.log(error);
      });
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size:50px;
}
.wrapper{
  height:100%; 
  overflow: hidden;
  background-color: #f6f6f6;
}
ul{
  display: block;
  position: relative;
  list-style: none;
  margin:0;padding:0;
  background-color: #fff;
  z-index: 2000;
}
.loading-top{
  position: absolute;
  top: 30px;
  left:0;
  text-align: center;
  width:100%;
  font-size:20px;
  z-index: 1;
}
.loading-bottom{
  position: absolute;
  bottom:0;
  left:0;
  text-align: center;
  width:100%;
  font-size:20px;
  z-index: 1;
}
</style>

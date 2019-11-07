<template>
	<view v-if="isLoding" class="container" :style="{height:1 < 3 ? '100vh' : 'auto'}">
		<!-- 空白页 -->
		<view class="empty" v-if="!cartData.length">
			<image src="https://meizi.manogue.com.cn/static/wap/images/emptycart.png" mode="scaleToFill"></image>
			<view class="empty_tips">购物车空荡荡的,随便看看...</view>
		</view>
    <!-- 贴顶商店 -->
    <view v-if="cartData.length" class="topBar" @tap="radioTap" >
      <label>
        <radio :checked="isRadio" color="red" />
        <image src="https://meizi.manogue.com.cn/static/wap/images/cart_store_03.png"></image>
        <text class="txt">美资自营</text>
      </label>
    </view>
    <!-- 购物车商品列表 -->
    <view class="cart_list">
       <view class="cart_list_item" 
       v-for="(item,index) in cartData" 
       :key="index"
       @tap="jumpProduct(item.goods_id)"
       >
         <radio :checked="item.is_check" color="red" @tap="goodsRadio(item.id)"/>
           <view class="cart_list_item_info">
             <image class="img" :src="item.goods_cover">
             </image>
             <view class="info_rigth">
               <view class="info_text">
                  <view class="txt">{{item.goods_name}}</view>
                  <view class="button" @tap="deleteGoods(item,index)">
                    <image src="https://meizi.manogue.com.cn/static/wap/images/cart_delimg_01.png"></image>
                  </view>
               </view>
               <view class="specs">
                 {{item.spec_name}}
               </view>
               <view class="quantity_control">
                 <view class="price">¥<text>{{item.goods_price}}</text></view>
                 <view class="change_number">
                    <button @tap="changeQuantity('-',index)">-</button>
                    <input type="number" 
                    :value="item.goods_num" 
                    :data-id="index"
                    @input="detectionValue">
                    <button @tap="changeQuantity('+',index)">+</button>
                 </view>
               </view>
             </view>
           </view>
       </view>
    </view>
			<!-- 底部菜单栏 -->
			<view class="bottomSettlement">
        <view class="choice">
          <label>
            <radio :disabled="!isProhibit" :checked="isRadio" @tap="radioTap" color="red"></radio> 
            <text class="txt">全选</text>
          </label>
        </view>
        <view class="price">
          <view class="commodity">商品合计：
            <text>¥0.00</text></view>
          <view class="freight">运费：<text>6元</text></view>
        </view>
        <view class="settlement">结算(0)</view>
			</view>
		</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('storeCommodity');
import UniNumberBox from "@/components/UniNumberBox/UniNumberBox"
export default {
  components: {
    UniNumberBox,
  },
  data() {
    return {
      cartData:[],
      isRadio:false,
      isLoding:false,
      purchaseQuantity:1,
      isProhibit:true
    };
  },
  onShow(){
    this.$request.GET({
      url: this.$api.apiUrl.GOODS_CART
    }).then(res=>{
      // 请求数据成功后控制页面显示状态
      this.isLoding = true;
      // 赋值数据
      this.cartData = res.data
      // 把数据数量告诉全选按钮,自动控制是否禁用
      this.isProhibit = this.cartData.length;
      // 查看列表内容是否全选
      this.slectAll()
    })
   
  },
  methods: {
    // 店铺和全选按钮点击
    radioTap(){
      this.isRadio = !this.isRadio;
      // 修改列表中所有字段
      for (let i = 0; i < this.cartData.length; i++) {
        const element = this.cartData[i];
        if(this.isRadio){
          element.is_check = 1;
        }else{
          element.is_check = 0;
        }
      }      
    },
    jumpProduct(e){
      // 跳到商品页面
      // uni.navigateTo({
      //   url: `/pages/goodss/product/product?id=${e}`,
      // });
    },
    // 单个商品按钮点击，修改数据中的状态
    goodsRadio(e){
      let index = this.cartData.findIndex(function(item){
          return item.id === e;
      })
      this.cartData[index].is_check = !this.cartData[index].is_check;
      // 执行查看是否全选了
      this.slectAll();
    },
    // 加减按钮执行
    changeQuantity(mathematicalSymbols,index){
			// 增加于删除按钮
			if(mathematicalSymbols === "+"){
        this.cartData[index].goods_num++
			}else if(this.cartData[index].goods_num>1){
				this.cartData[index].goods_num--
			}
    },
    // 直接修改input值，执行函数
    detectionValue(e){
      const index = e.target.dataset.id
			const num = e.detail.value;
			if (num === "") {
				// 如果输入为空
				this.cartData[index].goods_num = 1;
				return 1
			} else {
				// 判断值是否小于0或者是小数
				var r = /^\+?[1-9][0-9]*$/;
				if (r.test(num)) {
					this.cartData[index].goods_num = num;
					return num
				} else {
					// 如果数值不符合:大于0,并且是正整数
					this.cartData[index].goods_num = 1;
					return 1
				}
			}
    },
    // 删除商品
    deleteGoods(item,index){
      uni.showModal({
        title: '消息提示',
        content: '确定删除该商品',
        success:  (res) => {
            if (res.confirm) {
                this.$request.GET({
                  url:this.$api.apiUrl.CART_DEL,
                  data:{
                    id:item.id
                  }
                }).then(res=>{
                  // 请求删除接口成功后，再把页面显示中的也删除了
                  let index = this.cartData.findIndex((cartDataItem,index)=>{
                    return cartDataItem.id === item.id
                  })
                  this.cartData.splice(index, 1);
                  // 全选按钮是否禁用
                  this.isProhibit = this.cartData.length;
                  // 检测选中多少函数,可页面不刷新更改全选状态
                  this.slectAll();
                })
            } else if (res.cancel) {
              return false;
            }
        }
    });
    },
    // 查看购物车列表选中情况
    slectAll(){
      let index = this.cartData.find((item,index)=>{
        // 看看有没有,没选中的
        return item.is_check === false || item.is_check === 0;
      })
      if(!index){
        // 如果列表内容不为空
        if(this.cartData.length){
          this.isRadio = true;
        }else{
          this.isRadio = false;
        }
      }else{
       this.isRadio = false; 
      }
    }
  },
};
</script>

<style lang='scss'>
  @import "./cart.scss";
</style>

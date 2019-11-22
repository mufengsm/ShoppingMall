<template>
    <view class="container">
        <view class="carousel">
            <!-- 轮播图 -->
            <swiper indicator-dots circular="true" duration="400">
                <swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index">
                    <view class="image-wrapper">
                        <image :src="item.src" class="loaded" mode="aspectFill"></image>
                    </view>
                </swiper-item>
            </swiper>
            <!-- 分享按钮 -->
            <view class="forward" @tap="forward">
                <text class="iconfont icon-zhuanfa-xian"></text>
            </view>
        </view>
        <!-- 商品信息 -->
        <view class="introduce-section">
            <view class="price-box">
                <text class="price-tip">¥</text>
                <text class="price">{{commodityInfo.first}}</text>
                <text class="coupon-tip">{{commodityInfo.disacount}}折</text>
                <view class="bot-row sell">
                    <!-- 已卖出: {{123}}件 -->
                </view>
            </view>
            <view class="bot-row">
                市场价：
                <text class="third">¥{{commodityInfo.third}}</text>
            </view>
            <view class="goods_info">
                <view class="from">自营</view>
                <view class="title">{{commodityInfo.title}}</view>
            </view>
            <text class="supply_type">{{commodityInfo.supplyType}}</text>
        </view>

        <view class="c-list">
            <!-- 规格选择 -->
            <view class="c-row b-b" @tap="toggleSpec('specs')">
                <text class="tit">选择</text>
                <view class="con">
                    <text class="selected-text">{{selected}}{{popup.haveChosen}}</text>
                </view>
                <text class="iconfont icon-youjiantou"></text>
            </view>
            <!-- 购物保障 -->
            <view class="c-row b-b" @tap="toggleSpec('service')">
                <text class="tit">服务</text>
                <view class="bz-list con">
                    <text style="color: #df0e1d;">多多美优购</text>
                    <text>全程保障，购物无忧</text>
                </view>
                <text class="iconfont icon-youjiantou"></text>
            </view>
        </view>

        <!-- 评价 -->
        <view class="eva-section">
            <view class="e-header">
                <text class="tit">评价</text>
                <text class="tip"
                v-if="commentListItem"
                @tap="toEvaluatePage"
                >查看更多评价</text>
                <text class="iconfont icon-youjiantou"></text>
            </view>
            <view class="eva-box" v-if="commentListItem">
                <image 
                    class="portrait" 
                    :src="commentListItem.avatar" 
                    mode="aspectFill"
                ></image>
                <view class="right">
                    <text class="name">{{commentListItem.nickname}}</text>
                    <text class="con">{{commentListItem.content}}</text>
                    <view class="bot">
                        <text class="attr">
                            <!-- 购买类型：XL 红色 -->
                        </text>
                        <text class="time">{{commentListItem.add_time}}</text>
                    </view>
                </view>
            </view>
            <view class="eva-box" v-else>
                <image 
                class="portrait" 
                src="https://meizi.manogue.com.cn/static/wap/images/myct_indentl_grey__07.png" 
                mode="aspectFill"
                ></image>
               <view class="right">
                    <text class="con">暂无评价，欢迎选购后留下您宝贵的意见哦~</text>
                </view>
            </view>
        </view>

        <!-- 商品介绍 -->
        <view class="detail-desc">
            <view class="d-header">
                <text>图文详情</text>
            </view>
            <rich-text :nodes="desc"></rich-text>
        </view>

        <!-- 底部操作菜单 -->
        <view class="page-bottom">
            <navigator url="/pages/goodss/wolive/wolive" open-type="switchTab" class="p-b-btn">
                <text class="yticon icon-xiatubiao--copy"></text>
                <text>客服</text>
            </navigator>
            <view class="p-b-btn" :class="{ active: favorite }" @tap="toFavorite">
                <text class="yticon icon-shoucang"></text>
                <text>{{favorite ? "已收藏" : "收藏"}}</text>
            </view>
            <navigator url="/pages/carts/cart/cart" open-type="switchTab" class="p-b-btn">
                <text class="yticon icon-gouwuche"></text>
                <text>购物车</text>
            </navigator>
            <view class="action-btn-group">
                <button 
                type="primary" 
                class="action-btn no-border buy-now-btn" 
                @tap="addCart">立即购买</button>
                <button
                    type="primary"
                    class="action-btn no-border add-cart-btn"
                    @tap="addCart"
                >加入购物车</button>
            </view>
        </view>

        <!-- 规格-模态层弹窗 -->
        <view
            class="popup spec"
            :class="specClass"
            @touchmove.stop.prevent="stopPrevent"
            @tap="toggleSpec"
        >
            <!-- 遮罩层 -->
            <view class="mask"></view>
            <!-- 购买商品弹窗 -->
            <view
                v-if="isPopup==='specs'"
                class="layer attr-content guarantee_layer"
                @tap.stop="stopPrevent"
            >
                <view class="a-t">
                    <image :src="popup.logoImg"></image>
                    <view class="right">
                        <text class="price">商品单价：¥{{popup.marketPrice}}</text>
                        <text class="stock">零售价：{{popup.purchasePrice}}</text>
                        <text class="stock">起订价：{{popup.salesPrice}}</text>
                        <view class="selected">
                            <text
                                class="selected-text"
                            >{{selected}}{{popup.haveChosen ? popup.haveChosen : popup.specChildList[0].names}}</text>
                        </view>
                    </view>
                </view>
                <!-- 规格列表 -->
                <view id="spac_id">
                    <scroll-view scroll-y="true" class="scroll-Y">
                        <view
                            class="attr-list"
                            v-for="(childItem, childIndex) in popup.specChildList"
                            :key="childIndex"
                        >
                            <text>{{ childItem.names }}</text>
                            <view class="item-list">
                                <text
                                    class="tit"
                                    :class="{ selected: name.selected }"
                                    @tap="selectSpec(childItem,childIndex,name,nameIndex)"
                                    v-for="(name, nameIndex) in childItem.name"
                                    :key="nameIndex"
                                >{{ name.name }}</text>
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <!-- 增加商品数量 -->
                <view class="attr-list">
                    <view class="quantity_adjusted">
                        <text class="selected_quantity">已选</text>
                        <button @tap="changeQuantity('-')">-</button>
                        <input type="number" :value="purchaseQuantity" @input="detectionValue" />
                        <button @tap="changeQuantity('+')">+</button>
                    </view>
                </view>
                <button
                    :disabled="isGoods"
                    class="btn"
                    :style="{backgroundColor:isGoods ? 'gray' : '#fa436a' }"
                    @tap="toggleSpecSpecial"
                >{{isGoodsTxt}}</button>
            </view>
            <!-- 服务弹窗 -->
            <view
                v-if="isPopup==='service'"
                class="layer attr-content guarantee_layer"
                @tap.stop="stopPrevent"
            >
                <view class="guarantee">基础保障</view>
                <view class="guarantee_item">
                    <view class="mark">保</view>
                    <view class="title">正品保障</view>
                    <view class="info">商品支持正品保障服务</view>
                </view>
                <view class="guarantee_item">
                    <view class="mark">七</view>
                    <view class="title">七天无理由退货</view>
                    <view class="info">消费者在满足7天无理由退换货申请条件的前提下，可以提出“7天无理由退换货”的申请</view>
                </view>
                <button class="btn" @tap="toggleSpec">确定</button>
            </view>
        </view>
        <!-- <Share ref="share" :contentHeight="580" :shareList="shareList"></Share> -->
    </view>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import Share from "@/components/Share/Share";
const { mapState, mapActions } = createNamespacedHelpers("storeCommodity");
export default {
    data() {
        return {
            specClass: "none",
            specSelected: {},
            favorite: true,
            shareList: [],
            imgList: [],
            selected: "请选择规格: ",
            popup: {
                logoImg: "",
                name: "",
                salesPrice: "",
                specChildList: [],
                haveChosen: "",
                marketPrice: ""
            },
            commodityInfo: {
                title: "",
                first: "",
                disacount: "",
                third: "",
                supplyType: ""
            },
            desc: "",
            isPopup: "specs",
            purchaseQuantity: 1,
            isGoods: false,
			isGoodsTxt: "确定",
            forElection:[],
            commentListItem:null,
        };
    },
    components: {
        Share
    },
    async onLoad(options) {
        // 商品信息
        this.goodsId = options.id;
        this.$request.GET({
                url: this.$api.apiUrl.GET_GOODS_INFO,
                data: {
                    id: options.id
                }
            }).then(res => {
                if (res.code === 200) {
                    let result = res.data;
                    // 轮播图
                    this.imgList = result.slider_img.map((item, index) => ({
                        src: item
                    }));
                    // 商品信息
                    this.commodityInfo = {
                        title: result.title,
                        first: result.price.first,
                        disacount: result.price.disacount,
                        third: result.price.third,
                        supplyType: result.supply_type
                    };
                    // 规格信息
                    this.specSelected = result.goods_spec;
                    // 弹出层信息
                    this.popup = {
                        logoImg: result.logo_img,
												spec:result.spec,
                        marketPrice: result.price.first,
                        purchasePrice: result.price.third,
                        salesPrice: result.price.second,
                        specChildList: Object.keys(result.goods_spec).map(
                            (item, index) => {
                                return {
                                    id: index,
                                    names: item,
                                    name: result.goods_spec[item].map(item => ({name:item,selected:false})),
                                    allName: item,
                                    itemId: result.id
                                };
                            }
                        ),
                        haveChosen: ""
                    };
                    // 图文介绍
                    this.desc = `<div style="width:100%">${result.content.replace(
                        /<img/g,
                        "<img class='imgWidth'"
                    )}</div>`;
                } else {this.$api.msg(res.msg)}
            });
        // 商品评论
        this.$request.GET({
            url: this.$api.apiUrl.GET_GOODS_COMMENT,
            data: {
                id: options.id,
                page: 1
            }
        }).then(res => {
            if(res.data.length){
                this.commentListItem = res.data[0]
            }
        });
        // 可分享当前页面   
        uni.showShareMenu({
            withShareTicket:true,
        });
    },
    methods: {
        // 规格弹窗开关
        toggleSpec(popup) {
            this.isPopup = popup;
            if (this.specClass === "show") {
                this.specClass = "hide";
                setTimeout(() => {
                    this.specClass = "none";
                }, 250);
            } else if (this.specClass === "none") {
                this.specClass = "show";
            }
				},
				// 如果选规格的时候没有选
        toggleSpecSpecial() {           
            if (this.selected === "请选择规格: ") {
							this.$api.msg("请选择规格")
              return false;
            } else if(this.findIsSelected().length!=this.popup.specChildList.length){
               this.$api.msg("请选择"+this.forElection[0])
            }else{
							this.toggleSpec();
              this.addCart();
						}
        },
        // 选择规格
        selectSpec(item, index, name, nameIndex) {
						// 设置两个显示文本状态
						this.selected = "已选: ";
						// 选中颜色
						const list = this.popup.specChildList;
						list.forEach((item,listIndex) => {
							item.name.forEach((item2,listIndex2)=>{
								// 如果选择中的名字相等
								if(item2 === name){
									this.$set(this.popup.specChildList[listIndex].name[listIndex2], 'selected', true);
								}else if(listIndex===index){
									// 只清除同一个数组中的样式
									this.$set(this.popup.specChildList[listIndex].name[listIndex2], 'selected', false);
								}
							})
						});
						// 点击更改选中了那些文字
						const resultArr = this.findIsSelected();						
						this.popup.haveChosen = resultArr.join(",");

						// 查看哪些没选中
						const beDetectedArr = resultArr.map(item=>item.split(":")[0]);
						const testingArr = list.map(item => item.allName)
						function diff(arr1, arr2) {
									var newArr1 = [];
									var newArr2 = [];
									// Same, same; but different.
									newArr1 = arr1.filter(function(e){
										return arr2.indexOf(e)==-1;
									});
									newArr2 = arr2.filter(function(e){
										return arr1.indexOf(e)==-1;
									});
									return newArr1.concat(newArr2);
						}
						var result = diff(beDetectedArr, testingArr);
						this.forElection = result;
						if(result.length){
							for (let i = 0; i < result.length; i++) {
								const element = result[i];
								this.$set(this.popup,"haveChosen",this.popup.haveChosen + " 请选择: " + element)
							}
						}						
						// 查看是否有库存
            if(this.findIsSelected().length === list.length){
							this.$request.POST({
                    url: this.$api.apiUrl.POST_GOODS_STOCK,
                    data: {
                        id: item.itemId,
                        spec: this.findIsSelected().join(",")
                    }
                }).then(res => {
                    if(res.code === 200){
                         // 设置商品价格
                        this.$set(this.popup,"marketPrice",res.data.market_price)     
                        this.$set(this.popup,"purchasePrice",res.data.purchase_price)         
                        this.$set(this.popup,"salesPrice",res.data.sales_price)         
                        if(res.code === -1 || res.data.stock <= 0){
                            this.isGoods = true;
                            this.isGoodsTxt = "暂无库存";
                        }else{
                            this.isGoods = false;
                            this.isGoodsTxt = "确定";
                        }
                    }else{
                        this.isGoods = true;
                        this.isGoodsTxt = res.msg;
                    }
                });
			}
        },
        // 分享
        share() {
            this.$refs.share.toggleMask();
        },
        // 收藏
        toFavorite() {
            this.favorite = !this.favorite;
        },
        buy() {
            // uni.navigateTo({
            //     url: "/pages/mys/login/login"
            // });
        },
				stopPrevent() {},
				// 分享
        forward() {
           this.$api.msg("开发中,可通过右上角进行分享")
				},
        // 增加于删除按钮				
        changeQuantity(mathematicalSymbols) {
            if (mathematicalSymbols === "+") {
                this.purchaseQuantity++;
            } else if (this.purchaseQuantity > 1) {
                this.purchaseQuantity--;
            }
				},
				// 检测输入框输入
        detectionValue(e) {
            const num = e.detail.value;
            if (num === "") {
                // 如果输入为空
                this.purchaseQuantity = 1;
                return 1;
            } else {
                // 判断值是否小于0或者是小数
                var r = /^\+?[1-9][0-9]*$/;
                if (r.test(num)) {
                    this.purchaseQuantity = num;
                    return num;
                } else {
                    // 如果数值不符合:大于0,并且是正整数
                    this.purchaseQuantity = 1;
                    return 1;
                }
            }
        },
      addCart() {
        if(this.selected === "请选择规格: "){
            this.toggleSpec("specs")
        }else{
            // 是否登录
            this.navToLogin();
            // 查看是否认证
            this.$request.GET({
                url:this.$api.apiUrl.GET_USER_AUTH_STATUS
            }).then(res=>{
                if(res.code === 200){
                    // 查找选择到的id
                    const result = this.popup.spec.find(item => {
                        return item.name === this.findIsSelected().join(",")
                    })
                    this.$request.POST({
                        url: this.$api.apiUrl.POST_SAVE_CART,
                        data: {
                                goods_id: this.goodsId,
                                spec_id: result.id,
                                goods_num: this.purchaseQuantity,
                                is_page: "product"
                        }
                    }).then(res => {this.$api.msg(res.msg)});
                }else{
                    this.$api.msg("请登录,并认证")
                }
            })
            
        }
        },
        // 查找哪些被选中了
        findIsSelected(){
            let list = this.popup.specChildList;
                let arr = [];
                for (let i = 0; i < list.length; i++) {
                    const element = list[i].name;
                        for (let k = 0; k < element.length; k++) {
                            const element2 = element[k];
                            if(element2.selected){
                                arr.push(list[i].allName+":"+element2.name)
                            }
                        }							
                }						
                return arr
        },
        navToLogin(){
        // 页面鉴权
        const TOKEN = uni.getStorageSync('access_token');
            if (!TOKEN){
                uni.navigateTo({
                    url:"/pages/mys/login/login",
                })
            }
        },
        toEvaluatePage(){
            uni.navigateTo({
                url:`/pages/goodss/evaluate/evaluate?id=${this.goodsId}`
            })
        }
    }
};
</script>

<style lang="scss">
@import "./product.scss";
</style>

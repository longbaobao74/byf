<template>
    <view>
        <!-- 微信登录，获取微信相关用户信息 -->
        <button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>
		<button type="primary" @click="store">游客登录</button>
		<!-- <button type="primary" @click="findu">找</button> -->
	</view>
</template>

<script>
    export default {
        data() {
            return {
				oid:''
			}
        },
        onLoad() {
            // 执行查看授权选项
            // this.getSettingMes();
			this.jump()
        },
        methods: {
			jump(){		//跳过已登录用户登录
				if(uni.getStorageSync('_id')){

					this.getSettingMes();

				}
			},
			store(){
				try {
				    uni.setStorageSync('_id', "5fb63caf48eb4300019c1d55");
					uni.setStorageSync('username', "游客");
					console.log("success");
					uni.reLaunch({
					    url: '/pages/index/index'
					})
				} catch (e) {
				   console.log(e); // error
				}
			},
			findu(){
				try {
				    const value = uni.getStorageSync('_id');
				    if (value) {
				        console.log(value);
				    }
				} catch (e) {
				    // error
				}
			},
            // 查看已授权选项
            getSettingMes() {
				console.log("获取用户信息中")
                let _this = this;
                uni.getSetting({
                    success(res) {
                        if (res.authSetting['scope.userInfo']) {
                            // 用户信息已授权，获取用户信息
                            uni.getUserInfo({
                                success(res) {
									
                                    console.log('第一次获取信息：',res);
                                    console.log("用户信息对象: ",res.userInfo.nickName)
                                    uni.setStorageSync("username",res.userInfo.nickName)
                                    uni.setStorageSync("pic",res.userInfo.avatarUrl)
                                    // 成功后进行登录,获取code
                                    uni.login({
                                      success (res) {
                                    	  console.log('code: ',res.code)
                                    	  uniCloud.callFunction({
                                    		name:'getoid',
                                    		data:{
                                    			code:res.code
                                    		},
                                    		success(res ){
                                    			console.log('云函数reques： ',res)
                                    			console.log("openid: ",res.result.data.openid);
                                    			console.log("openid: ",res)
                                    			if (res.result.status==200) {
                                    				// that.login(res.data); //将接口返回的数据保存在全局变量中.
                                    				// //登录成功跳转首页或者你想跳转的地方... 
                                    				// //注意：如果时导航页 请用uni.switchTab
                                    				// // 		其他页面建议使用uni.reLaunch
                                    				uni.setStorageSync("_id",res.result.data.openid)
                                    				console.log("查询_id : ",uni.getStorageSync('_id'))
                                    				uniCloud.callFunction({
                                    					name:'getu',
                                    					data:{
                                    						_id:res.result.data.openid
                                    					},
                                    					success(res) {
                                    						console.log('人数：',res.result.affectedDocs)
                                    						if(res.result.affectedDocs==0){
                                    							uniCloud.callFunction({
                                    								name:'addu',
                                    								data:{
                                    									_id:uni.getStorageSync('_id'),
                                    									username:uni.getStorageSync('username'),
                                    									pic:uni.getStorageSync("pic"),
                                    									lover_id:''
                                    								},
                                    								success(res) {
                                    									console.log('注册成功！')
                                    								}
                                    							})
                                    						}
                                    					}
                                    				})
                                    			} else {
                                    				uni.showToast({
                                    					title: '授权登录失败！',
                                    					mask: true,
                                    					icon: 'none'
                                    				})
                                    			}
                                    		}
                                    	  })
										
										
									     console.log('第二次获取信息：',res);
									    if (res.code) {
											console.log('登录成功！')
											uni.reLaunch({
											    url: '/pages/index/index'
											})
									    } else {
									      console.log('登录失败！' + res.errMsg)
									    }
									  }
									})
                                },
                                fail() {
                                    console.log("获取用户信息失败");
                                }
                            })
                        } else if (!res.authSetting['scope.userInfo']) {
                            console.log("需要点击按钮手动授权")
                        }
                    },
                    fail() {
                        console.log("获取已授权选项失败")
                    }
                })
            },
            // 手动授权方法
            onGotUserInfo(e) {
                // 获取用户信息
				console.log("获取授权信息中。。。。")
                uni.getUserInfo({
                    // 获取信息成功
                    success(res) {
                        console.log('第一次获取信息：',res);
						console.log("用户信息对象: ",res.userInfo.nickName)
						uni.setStorageSync("username",res.userInfo.nickName)
						uni.setStorageSync("pic",res.userInfo.avatarUrl)
                        // 成功后进行登录,获取code
                        uni.login({
                          success (res) {
							  console.log('code: ',res.code)
							  uniCloud.callFunction({
								name:'getoid',
								data:{
									code:res.code
								},
								success(res ){
									console.log('云函数reques： ',res)
									console.log("openid: ",res.result.data.openid);
									console.log("openid: ",res)
									if (res.result.status==200) {
										// that.login(res.data); //将接口返回的数据保存在全局变量中.
										// //登录成功跳转首页或者你想跳转的地方... 
										// //注意：如果时导航页 请用uni.switchTab
										// // 		其他页面建议使用uni.reLaunch
										uni.setStorageSync("_id",res.result.data.openid)
										console.log("查询_id : ",uni.getStorageSync('_id'))
										uniCloud.callFunction({
											name:'getu',
											data:{
												_id:res.result.data.openid
											},
											success(res) {
												console.log('人数：',res.result.affectedDocs)
												if(res.result.affectedDocs==0){
													uniCloud.callFunction({
														name:'addu',
														data:{
															_id:uni.getStorageSync('_id'),
															username:uni.getStorageSync('username'),
															pic:uni.getStorageSync("pic"),
															lover_id:''
														},
														success(res) {
															console.log('注册成功！')
														}
													})
												}
												uni.setStorageSync('status1',1);
												uni.redirectTo({
												    url: '/pages/index/index'
												});
											}
										})
									} else {
										uni.showToast({
											title: '授权登录失败！',
											mask: true,
											icon: 'none'
										})
									}
								}
							  })
					// 		  uni.request({
					// 			header: {
					// 				'content-type': 'application/x-www-form-urlencoded'
					// 			},
					// 			url: 'https://api.weixin.qq.com/sns/jscode2session?appid= &secret= &js_code='+res.code, //你的接口地址
					// 			method: 'POST',//接口类型 
					// 			// data: '', //接口需要的数据
					// 			success: function(res) {
					// 				console.log("openid: ",res.data.openid);
					// 				console.log("openid: ",res)
					// 				if (res.statusCode==200) {
					// 					// that.login(res.data); //将接口返回的数据保存在全局变量中.
					// 					// //登录成功跳转首页或者你想跳转的地方... 
					// 					// //注意：如果时导航页 请用uni.switchTab
					// 					// // 		其他页面建议使用uni.reLaunch
					// 					uni.setStorageSync("_id",res.data.openid)
					// 					console.log("查询中 ")
					// 					uniCloud.callFunction({
					// 						name:'getu',
					// 						data:{
					// 							_id:res.data.openid
					// 						},
					// 						success(res) {
					// 							console.log('人数：',res.result.affectedDocs)
					// 							if(res.result.affectedDocs==0){
					// 								uniCloud.callFunction({
					// 									name:'addu',
					// 									data:{
					// 										_id:uni.getStorageSync('_id'),
					// 										username:uni.getStorageSync('username'),
					// 										pic:uni.getStorageSync("pic"),
					// 										lover_id:''
					// 									},
					// 									success(res) {
					// 										console.log('注册成功！')
					// 									}
					// 								})
					// 							}
					// 						}
					// 					})
					// 				} else {
					// 					uni.showToast({
					// 						title: '授权登录失败！',
					// 						mask: true,
					// 						icon: 'none'
					// 					})
					// 				}
					// 			}
					
					// 		})
                             console.log('第二次获取信息：',res);
                            if (res.code) {
								console.log('登录成功！')
								// uni.redirectTo({
								//     url: '/pages/index/index'
								// });
								// setTimeout(function(){uni.redirectTo({
								//     url: '/pages/index/index'
								// });
								// },1000)
								
                            } else {
                              console.log('登录失败！' + res.errMsg)
                            }
                          }
                        })
                    },
                    fail() {
                        console.log("获取用户信息失败");
                    }
                })
            }
        }
    }
</script>
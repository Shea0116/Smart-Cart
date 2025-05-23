    <script>
        import { getPicCode, getMsgCode, Login } from '@/api/login'
        export default {
            name: 'LoginIndex',
            async created () {
                this.getPic()
            },
            data () {
                return {
                    picUrl: '',
                    picKey: '',
                    totalSeconds: 60,
                    curSeconds: 60,
                    timer: null,
                    mobile: '',
                    picCode: '',
                    msgCode: ''
                }
            },
            methods: {
                //? 获取图片验证码
                async getPic () {
                    const { data: { base64, key } } = await getPicCode()
                    this.picUrl = base64
                    this.picKey = key
                    //! 提示 from Vant
                    this.$toast.success('获取图形验证码成功!')
                },

                //? 获取短信验证码
                async getCode () {
                    //! 在获取短信验证码前进行校验
                    if( !this.verifyFn() ){
                        return
                    }

                    //! 判断定时器是否开启
                    if( !this.timer && this.curSeconds === this.totalSeconds ){
                        //todo 发送请求，获取验证码
                        await getMsgCode(this.picCode, this.picKey, this.mobile)
                        this.$toast('发送成功，请注意查收')

                        //todo 开始倒计时
                        this.timer = setInterval( () => {
                            this.curSeconds--
                            if( this.curSeconds <= 0){
                                clearInterval( this.timer )
                                this.timer = null
                                this.curSeconds = 60
                            }
                        }, 1000 )
                    }
                    
                },

                //? 校验输入框内容
                verifyFn () {
                    if(!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.mobile)) {
                        this.$toast('请输入正确的手机号')
                        return false
                    }
                    if (!/^\w{4}$/.test(this.picCode)) {
                        this.$toast('请输入正确的图形验证码')
                        return false
                    }
                    return true
                },

                //? 登录
                async login () {
                    if (!this.verifyFn()) {
                        return
                    }

                    if(!/^\d{6}$/.test(this.msgCode)) {
                        this.$toast('请输入正确短信验证码')
                        return
                    }

                    const res = await Login(this.mobile, this.msgCode)
                    console.log(res)
                    
                    this.$store.commit( 'user/setUserInfo', res.data )
                    this.$toast( '登陆成功' )

                    // 判断有无回跳地址
                    const url = this.$route.query.backUrl || '/'
                    this.$router.replace(url)
                }
            },
            destroyed () {
                clearInterval( this.timer )
            }
        }
    </script>

    <template>
        <div>
            <!-- 头部 -->
            <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"></van-nav-bar>

            <!-- 主体 -->
            <div class="main">
                <header>
                    <h3>手机号登录</h3>
                    <p>未注册的手机号登录后将自动注册</p>
                </header>

                <ul class="info">
                    <li>
                        <input type="text" v-model="mobile" maxlength="11" placeholder="请输入手机号码">
                    </li>

                    <li>
                        <input type="text" v-model="picCode" maxlength="5" placeholder="请输入图形验证码">
                        <img v-if="picUrl" :src="picUrl" @click="getPic">
                    </li>

                    <li>
                        <input type="text" v-model="msgCode" placeholder="请输入短信验证码">
                        <span @click="getCode" class="verifycode">
                            {{ this.curSeconds === 60 ?"获取验证码" :curSeconds+"秒后重新发送" }}
                        </span>
                    </li>
                </ul>

                <button @click="login" class="login">登录</button>
            </div>
        </div>
    </template>
  

    <style lang="less" scoped>
        .main{
            padding: 3rem 5vw;
            display: flex;
            flex-direction: column;
        }

        header{
            margin-bottom: 1rem;
          h3{
            font-size: 1.8rem;
            font-weight: 500;
            margin-bottom: .5rem;
          }
          p{
            color: rgba(180,180,180);
            font-size: 1rem;
          }
        }

        .info{
            padding: .625rem;
            li{
                width: 100%;
                height: 8vh;
                border-bottom: 1px solid #e6e2e2;
                padding-top: .625rem;
                display: flex;
                input{
                    height: 100%;
                    outline: none;
                    border: none;
                    width: 60%;
                    padding-left: .625rem;
                }
                img{
                    flex: 1;
                    display: inline-block;
                    width: 36%;
                    height: 80%;
                }
                .verifycode{
                    flex: 1;
                    display: inline-block;
                    width: 36%;
                    height: 80%;
                    text-align: center;
                    line-height: 6.4vh;
                    cursor: pointer;
                    color: #ff6600;
                }
            }
        }

        .login{
            margin-top: 50px;
            height: 50px;
            background: linear-gradient(to right, #e8ac36 ,#eca021, #f79215 );
            border: none;
            border-radius: 20px;
            color: #fff;
            letter-spacing: 5px;
        }

    </style>
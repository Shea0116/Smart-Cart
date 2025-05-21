    <script>
        export default {
            name: 'LoginIndex'
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
                        <input type="text" placeholder="请输入手机号码">
                    </li>

                    <li>
                        <input type="text" placeholder="请输入图形验证码">
                        <img src="@/assets/code.png">
                    </li>

                    <li>
                        <input type="text" placeholder="请输入短信验证码">
                        <span class="verifyCode">获取验证码</span>
                    </li>
                </ul>

                <button class="login">登录</button>
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
                .verifyCode{
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
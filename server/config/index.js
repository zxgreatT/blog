const devMode = process.env.NODE_ENV === 'development'

const config = {
  PORT: 6060, // 启动端口
  ADMIN_GITHUB_LOGIN_NAME: 'zxgreatT', // 博主的 github 登录的账户名 user
  GITHUB: {
    client_id: '6d5c0f74c0968e381459',
    client_secret: 'c88b6b6d343b5390a1846dc6ed97157440336a01',
    access_token_url: 'https://github.com/login/oauth/access_token',
    fetch_user_url: 'https://api.github.com/user', // 用于 oauth2
    fetch_user: 'https://api.github.com/users/' // fetch user url https://api.github.com/users/gershonv
  },
  EMAIL_NOTICE: {
    enable: true, // 开关
    transporterConfig: {
      host: 'smtp.qq.email',
      service:'qq',
      port: 465,
      secure: true, 
      auth: {
        user: '906431137@qq.com', 
        pass: 'pkenwbbkwfjzbcdb' 
      }
    },
    subject: 'GreatT的博客 - 您的评论获得新的回复！', // 主题
    text: '您的评论获得新的回复！',
    WEB_HOST: 'http://127.0.0.1:3000' 
  },
  TOKEN: {
    secret: 'guo-test', 
    expiresIn: '720h' 
  },
  DATABASE: {
    database: 'blog',
    user: 'root',
    password: '123',
    options: {
      host: 'localhost', 
      dialect: 'mysql', 
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: false, 
        freezeTableName: true 
      },
      timezone: '+08:00'
    }
  }
}

// 部署的环境变量设置
if (!devMode) {
  console.log('env production....')

  // ==== 配置数据库
  config.DATABASE = {
    ...config.DATABASE,
    database: 'blog', // 数据库名
    user: 'root', // 账号
    password: '123' // 密码
  }

  // 配置 github 授权
  config.GITHUB.client_id = ''
  config.GITHUB.client_secret = ''

  // ==== 配置 token 密钥
  config.TOKEN.secret = ''

  // ==== 配置邮箱

  // config.EMAIL_NOTICE.enable = true
  config.EMAIL_NOTICE.transporterConfig.auth = {
    user: 'guodadablog@163.com', // generated ethereal user
    pass: '123456XXX' // generated ethereal password 授权码 而非 密码
  }
  config.EMAIL_NOTICE.WEB_HOST = 'https://guodada.fun'
}

module.exports = config

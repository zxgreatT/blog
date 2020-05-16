import React from 'react'
import { Icon } from 'antd'
import SvgIcon from '@/components/SvgIcon'

import Href from '@/components/Href'
import MyInfo from '@/views/web/about/MyInfo'

// API_BASE_URL
export const API_BASE_URL = 'http://127.0.0.1:6060'

// project config
export const HEADER_BLOG_NAME = 'GreatT的博客' // header title 显示的名字

// === sidebar
export const SIDEBAR = {
  avatar: require('@/assets/images/GreatT.jpg'), // 侧边栏头像
  title: 'GreatT', // 标题
  subTitle: '热爱生活，努力成为更好的自己', // 子标题
  // 个人主页
  homepages: {
    github: {
      link: 'https://github.com/zxgreatT',
      icon: <Icon type='github' theme='filled' className='homepage-icon' />
    },
    juejin: {
      link: 'https://juejin.im/user/5cb5c151f265da038860ac75',
      icon: <SvgIcon type='iconjuejin' className='homepage-icon' />
    }
  }
}

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar // 评论框博主头像

/**
 * github config
 */
export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: '6d5c0f74c0968e381459', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize' // 跳转的登录的地址
}

export const ABOUT = {
  avatar: SIDEBAR.avatar,
  describe: SIDEBAR.subTitle,
  discuss: true, // 关于页面是否开启讨论
  renderMyInfo: <MyInfo /> // 我的介绍 自定义组件 => src/views/web/about/MyInfo.jsx
}

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: false, // 是否开启
  content: (
    <>
      由于服务器期限将至 / ssl 证书过期 / 域名过期，请访问
      <Href href='http://47.112.48.225:4002/'>最新的博客地址</Href>
    </>
  )
}

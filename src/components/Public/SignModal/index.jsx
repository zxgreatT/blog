import React, { useState, useEffect } from 'react'
import { Form, Icon, Input, Button, Modal } from 'antd'
import { useLocation } from 'react-router-dom'

import { GITHUB } from '@/config'
import { save } from '@/utils/storage'

// redux
import { login, register } from '@/redux/user/actions'
import { useDispatch } from 'react-redux'

// hooks
import { useListener } from '@/hooks/useBus'

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

function FormItem(props) {
  const { children, ...rest } = props
  return <Form.Item {...FormItemLayout} {...rest}>{children}</Form.Item>
}

function SignModal(props) {
  const dispatch = useDispatch() // dispatch hooks
  const location = useLocation() // location
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('login')
  const { getFieldDecorator } = props.form

  useListener('openSignModal', type => {
    props.form.resetFields()
    setType(type)
    setVisible(true)
  })

  function handleSubmit(e) {
    e.preventDefault()
    props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return
      const action = type === 'login' ? login : register
      dispatch(action(values)).then(() => {
        setVisible(false) // type =  login | register
      })
    })
  }

  function githubLogin() {
    const { pathname, search } = location
    save('prevRouter', `${pathname}${search}`)
    console.log(window.location.href)
    window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}`
  }

  // 确认密码
  function compareToFirstPassword(rule, value, callback) {
    const form = props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!')
    } else {
      callback()
    }
  }

  return (
    <Modal
      width={460}
      title={type}
      visible={visible}
      onCancel={e => setVisible(false)}
      footer={null}>
      <Form layout='horizontal'>
        {type === 'login' ? (
          <>
            <FormItem label='用户名'>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '用户名不存在！' }]
              })(<Input placeholder='请输入用户名' />)}
            </FormItem>
            <FormItem label='密码'>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码错误！' }]
              })(<Input placeholder='请输入密码' type='password' />)}
            </FormItem>
          </>
        )
          : (
            <>
              <FormItem label='用户名'>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '用户名已经存在！' }]
                })(<Input placeholder='请输入用户名' />)}
              </FormItem>
              <FormItem label='密码'>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请填写密码！' }]
                })(<Input placeholder='请输入密码' type='password' />)}
              </FormItem>
              <FormItem label='确认密码'>
                {getFieldDecorator('confirm', {
                  rules: [
                    { required: true, message: '请填写密码！' },
                    { validator: compareToFirstPassword }
                  ]
                })(<Input placeholder='确认密码' type='password' />)}
              </FormItem>
              <FormItem label='邮箱'>
                {getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: '请输入正确的邮箱格式！' },
                    { required: true, message: '请填写邮箱信息！' }
                  ]
                })(<Input placeholder='请输入您的邮箱' />)}
              </FormItem>
            </>
          )}
      </Form>
      <Button type='primary' block onClick={handleSubmit}>
        {type}
      </Button>
      {GITHUB.enable && (
        <Button block icon='github' onClick={githubLogin} style={{ marginTop: 10 }}>
          github login
        </Button>
      )}
    </Modal>
  )
}

export default Form.create()(SignModal)

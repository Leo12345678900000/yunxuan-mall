import { App, Button, Checkbox, Form, Input } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import './index.scss'

export function LoginPage() {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const getUserInfo = useUserStore((s) => s.getUserInfo)
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { account: string; password: string; agree: boolean }) => {
    setLoading(true)
    try {
      await getUserInfo({ account: values.account, password: values.password })
      message.success('登录成功')
      const from = (location.state as { from?: string } | null)?.from
      const safe = from && from.startsWith('/') && !from.startsWith('/login') ? from : '/'
      navigate(safe, { replace: true })
    } catch {
      /* 错误文案由 http 拦截器提示 */
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="container m-top-20">
          <h1 className="logo">
            <Link to="/">云选优品</Link>
          </h1>
          <Link className="entry" to="/">
            进入网站首页
            <i className="iconfont icon-angle-right" />
            <i className="iconfont icon-angle-right" />
          </Link>
        </div>
      </header>
      <section className="login-section">
        <div className="wrapper">
          <nav>
            <a href="#">账户登录</a>
          </nav>
          <div className="account-box">
            <div className="form">
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ account: '', password: '', agree: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="账户"
                  name="account"
                  rules={[{ required: true, message: '用户名不能为空' }]}
                >
                  <Input placeholder="手机号（需在接口服务中已注册）" autoComplete="username" />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    { required: true, message: '密码不能为空' },
                    { min: 6, max: 14, message: '密码长度为6-14个字符' },
                  ]}
                >
                  <Input.Password autoComplete="current-password" />
                </Form.Item>
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  wrapperCol={{ offset: 6, span: 16 }}
                  rules={[
                    {
                      validator: (_, v) =>
                        v ? Promise.resolve() : Promise.reject(new Error('请勾选协议')),
                    },
                  ]}
                >
                  <Checkbox>我已同意隐私条款和服务条款</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="subBtn"
                    block
                    loading={loading}
                  >
                    点击登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <footer className="login-footer">
        <div className="container">
          <p>
            <a href="#">关于我们</a>
            <a href="#">帮助中心</a>
            <a href="#">售后服务</a>
            <a href="#">配送与验收</a>
            <a href="#">商务合作</a>
            <a href="#">搜索推荐</a>
            <a href="#">友情链接</a>
          </p>
          <p>CopyRight © 云选优品</p>
        </div>
      </footer>
    </div>
  )
}

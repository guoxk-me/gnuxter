import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LoginForm from '../../app/components/LoginForm.vue'

describe('login form prototype flow', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('validates required fields before accepting the frontend-only login', async () => {
    const component = await mountSuspended(LoginForm)

    // AI modified: exercise the visible form flow rather than only checking its schema shape.
    await component.get('form').trigger('submit')
    await vi.waitFor(() => {
      expect(component.text()).toContain('请输入邮箱或账号')
      expect(component.text()).toContain('密码至少需要 6 位')
      expect(component.text()).toContain('请输入验证码答案')
    })

    await component.get('#login-account').setValue('demo')
    await component.get('#login-password').setValue('gnuxter')
    await component.get('#login-challenge').setValue('10')
    await component.get('form').trigger('submit')

    await vi.waitFor(() => {
      expect(component.get('.login-form__submit').text()).toContain('登录成功')
    }, { timeout: 1000 })
  })

  it('toggles password visibility and refreshes the arithmetic challenge', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const component = await mountSuspended(LoginForm)

    await component.get('.login-field__visibility').trigger('click')
    expect(component.get('#login-password').attributes('type')).toBe('text')

    await component.get('#login-challenge').setValue('10')
    await component.get('[aria-label="刷新验证码"]').trigger('click')
    expect(component.get('.verification-equation').text()).toContain('1 + 1 = ?')
    expect((component.get('#login-challenge').element as HTMLInputElement).value).toBe('')
  })
})

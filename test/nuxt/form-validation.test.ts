import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, shallowRef } from 'vue'
import { z } from 'zod'
import { useForm } from '#imports'

const FormValidationProbe = defineComponent({
  setup() {
    const validationStatus = shallowRef('idle')
    const { defineField, errors, validate } = useForm({
      initialValues: {
        email: '',
      },
      // AI modified: Vee Validate v5 consumes Zod directly through Standard Schema.
      validationSchema: z.object({
        email: z.string().min(1, 'Email is required').email('Email is invalid'),
      }),
    })
    const [email, emailAttributes] = defineField('email')

    async function checkEmailForm() {
      const validation = await validate()
      validationStatus.value = validation.valid ? 'valid' : 'invalid'
    }

    return {
      checkEmailForm,
      email,
      emailAttributes,
      errors,
      validationStatus,
    }
  },
  template: `
    <form @submit.prevent>
      <label for="email">Email</label>
      <input id="email" v-model="email" v-bind="emailAttributes">
      <p v-if="errors.email" role="alert">{{ errors.email }}</p>
      <output data-testid="validation-status">{{ validationStatus }}</output>
      <button type="button" @click="checkEmailForm">Validate</button>
    </form>
  `,
})

describe('form validation integration', () => {
  it('validates a Zod schema through the Nuxt auto-imported Vee Validate API', async () => {
    const component = mount(FormValidationProbe)

    await component.get('button').trigger('click')
    await vi.waitFor(() => {
      expect(component.get('[data-testid="validation-status"]').text()).toBe('invalid')
    })
    expect(component.get('[role="alert"]').text()).toBe('Email is required')

    await component.get('input').setValue('user@example.com')
    await component.get('button').trigger('click')
    await vi.waitFor(() => {
      expect(component.find('[role="alert"]').exists()).toBe(false)
      expect(component.get('[data-testid="validation-status"]').text()).toBe('valid')
    })
  })
})

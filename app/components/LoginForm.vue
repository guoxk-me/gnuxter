<script setup lang="ts">
import { z } from 'zod'

interface LoginValues {
  account: string
  password: string
  challenge: string
}

type SubmitState = 'idle' | 'submitting' | 'success'

const { t } = useI18n()
const firstOperand = shallowRef(2)
const secondOperand = shallowRef(8)
const isPasswordVisible = shallowRef(false)
const submitState = shallowRef<SubmitState>('idle')
const notice = shallowRef<string | null>(null)

const challengeTotal = computed(() => firstOperand.value + secondOperand.value)
const challengeEquation = computed(() => `${firstOperand.value} + ${secondOperand.value} = ?`)
const validationSchema = computed(() => z.object({
  account: z.string().trim().min(1, t('login.validation.account')),
  password: z.string().min(6, t('login.validation.password')),
  challenge: z.string()
    .trim()
    .min(1, t('login.validation.challengeRequired'))
    .refine(answer => Number(answer) === challengeTotal.value, t('login.validation.challengeIncorrect')),
}))

const { defineField, errors, handleSubmit, setFieldValue } = useForm<LoginValues>({
  initialValues: {
    account: '',
    password: '',
    challenge: '',
  },
  validationSchema,
})

const [account, accountAttributes] = defineField('account')
const [password, passwordAttributes] = defineField('password')
const [challenge, challengeAttributes] = defineField('challenge')

const submitLabel = computed(() => {
  if (submitState.value === 'submitting')
    return t('login.submitting')
  if (submitState.value === 'success')
    return t('login.success')
  return t('login.submit')
})

// AI modified: keep the reference login fully interactive without implying a backend session.
const submitLogin = handleSubmit(async () => {
  submitState.value = 'submitting'
  notice.value = null
  await new Promise(resolve => setTimeout(resolve, 450))
  submitState.value = 'success'
})

function refreshChallenge() {
  firstOperand.value = Math.floor(Math.random() * 8) + 1
  secondOperand.value = Math.floor(Math.random() * 8) + 1
  setFieldValue('challenge', '')
  submitState.value = 'idle'
}

function showForgotNotice() {
  notice.value = t('login.forgotNotice')
}

function showSignupNotice() {
  notice.value = t('login.signupNotice')
}
</script>

<template>
  <form class="login-form" novalidate @submit="submitLogin">
    <header class="login-form__header">
      <h2>{{ $t('login.title') }}</h2>
      <p>{{ $t('login.description') }}</p>
    </header>

    <div class="login-form__fields">
      <div class="login-field">
        <div class="login-field__label-row">
          <label for="login-account">{{ $t('login.account') }}</label>
          <span v-if="errors.account" id="login-account-error" role="alert">{{ errors.account }}</span>
        </div>
        <div class="login-field__control" :class="{ 'login-field__control--invalid': errors.account }">
          <Icon name="lucide:user-round" />
          <input
            id="login-account"
            v-model="account"
            v-bind="accountAttributes"
            type="text"
            autocomplete="username"
            :placeholder="$t('login.accountPlaceholder')"
            :aria-invalid="Boolean(errors.account)"
            :aria-describedby="errors.account ? 'login-account-error' : undefined"
          >
        </div>
      </div>

      <div class="login-field">
        <div class="login-field__label-row">
          <label for="login-password">{{ $t('login.password') }}</label>
          <button type="button" @click="showForgotNotice">
            {{ $t('login.forgot') }}
          </button>
        </div>
        <div class="login-field__control" :class="{ 'login-field__control--invalid': errors.password }">
          <Icon name="lucide:lock-keyhole" />
          <input
            id="login-password"
            v-model="password"
            v-bind="passwordAttributes"
            :type="isPasswordVisible ? 'text' : 'password'"
            autocomplete="current-password"
            :placeholder="$t('login.passwordPlaceholder')"
            :aria-invalid="Boolean(errors.password)"
            :aria-describedby="errors.password ? 'login-password-error' : undefined"
          >
          <button
            class="login-field__visibility"
            type="button"
            :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
            @click="isPasswordVisible = !isPasswordVisible"
          >
            <Icon :name="isPasswordVisible ? 'lucide:eye-off' : 'lucide:eye'" />
          </button>
        </div>
        <span v-if="errors.password" id="login-password-error" class="sr-only" role="alert">{{ errors.password }}</span>
      </div>

      <div class="login-field">
        <div class="login-field__label-row">
          <label for="login-challenge">{{ $t('login.challenge') }}</label>
          <span v-if="errors.challenge" id="login-challenge-error" role="alert">{{ errors.challenge }}</span>
        </div>
        <div class="verification-control">
          <input
            id="login-challenge"
            v-model="challenge"
            v-bind="challengeAttributes"
            inputmode="numeric"
            autocomplete="off"
            :placeholder="$t('login.challengePlaceholder')"
            :aria-invalid="Boolean(errors.challenge)"
            :aria-describedby="errors.challenge ? 'login-challenge-error' : undefined"
          >
          <div class="verification-equation">
            <span>{{ challengeEquation }}</span>
            <button type="button" :aria-label="$t('login.refresh')" @click="refreshChallenge">
              <Icon name="lucide:refresh-cw" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <button class="login-form__submit" type="submit" :disabled="submitState === 'submitting'">
      {{ submitLabel }}
      <Icon :name="submitState === 'success' ? 'lucide:check' : 'lucide:arrow-right'" />
    </button>

    <div class="login-form__signup">
      <span>{{ $t('login.signupPrompt') }}</span>
      <button type="button" @click="showSignupNotice">
        {{ $t('login.signup') }}
      </button>
    </div>

    <p v-if="notice" class="login-form__notice" role="status">
      {{ notice }}
    </p>
  </form>
</template>

<style scoped>
.login-form {
  position: relative;
  display: flex;
  width: 360px;
  flex-direction: column;
  gap: 22px;
}

.login-form__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.login-form__header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 41px;
}

.login-form__header p {
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 19px;
}

.login-form__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-field {
  display: flex;
  height: 63px;
  flex-direction: column;
  gap: 7px;
}

.login-field__label-row {
  display: flex;
  height: 16px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.login-field__label-row label {
  flex: none;
  color: var(--secondary-foreground);
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
}

.login-field__label-row span {
  overflow: hidden;
  color: var(--danger);
  font-size: 9px;
  line-height: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.login-field__label-row button {
  color: var(--primary);
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
}

.login-field__control {
  display: flex;
  height: 40px;
  align-items: center;
  gap: 9px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding-inline: 11px;
  background: var(--background);
}

.login-field__control:focus-within {
  border-color: var(--ring);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 14%, transparent);
}

.login-field__control--invalid {
  border-color: var(--danger);
}

.login-field__control > :deep(.iconify) {
  width: 14px;
  height: 14px;
  flex: none;
  color: var(--muted-foreground);
}

.login-field__control input,
.verification-control input {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--foreground);
  font-size: 12px;
  line-height: 17px;
}

.login-field__control input::placeholder,
.verification-control input::placeholder {
  color: var(--muted-foreground);
  opacity: 1;
}

.login-field__visibility {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex: none;
  align-items: center;
  justify-content: center;
  color: var(--muted-foreground);
}

.login-field__visibility :deep(.iconify),
.verification-equation button :deep(.iconify) {
  width: 14px;
  height: 14px;
}

.verification-control {
  display: grid;
  height: 40px;
  grid-template-columns: minmax(0, 1fr) 142px;
  gap: 8px;
}

.verification-control > input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding-inline: 12px;
}

.verification-control > input:focus {
  border-color: var(--ring);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 14%, transparent);
}

.verification-control > input[aria-invalid="true"] {
  border-color: var(--danger);
}

.verification-equation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--secondary);
  padding-inline: 12px;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 13px;
  font-weight: 600;
  line-height: 17px;
}

.verification-equation button {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
}

.login-form__submit {
  display: inline-flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  background: var(--primary);
  color: var(--primary-foreground);
  font-size: 12px;
  font-weight: 600;
  line-height: 17px;
}

.login-form__submit:hover {
  filter: brightness(1.06);
}

.login-form__submit:disabled {
  cursor: wait;
  opacity: 0.72;
}

.login-form__submit :deep(.iconify) {
  width: 14px;
  height: 14px;
}

.login-form__signup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--muted-foreground);
  font-size: 11px;
  line-height: 16px;
}

.login-form__signup button {
  color: var(--primary);
  font-weight: 600;
}

.login-form__notice {
  position: absolute;
  top: calc(100% + 12px);
  width: 100%;
  color: var(--muted-foreground);
  font-size: 10px;
  line-height: 15px;
  text-align: center;
}

@media (min-width: 640px) and (max-width: 1023px) {
  .login-form {
    width: 420px;
  }
}

@media (max-width: 639px) {
  .login-form {
    width: 100%;
    gap: 17px;
  }

  .login-form__header h2 {
    font-size: 24px;
    line-height: 35px;
  }
}
</style>

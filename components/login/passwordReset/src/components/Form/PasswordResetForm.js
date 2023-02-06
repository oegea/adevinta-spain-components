import MoleculeInputField from '@s-ui/react-molecule-input-field'

import {BASE_CLASS} from '../../config.js'
import usePasswordResetFormState from '../../hooks/components/usePasswordResetFormState.js'
import useDomain from '../../hooks/useDomain.js'
import useI18n from '../../hooks/useI18n.js'
import Notification from '../Info/Notification.js'
import ResendText from '../Info/ResendText.js'
import LoginButton from '../Input/LoginButton.js'
import SubmitButton from '../Input/SubmitButton.js'

const PasswordResetForm = () => {
  const {
    state: {email, isLoading, errorText, notification},
    setEmail,
    setNotification,
    setIsLoading,
    setErrorText
  } = usePasswordResetFormState()

  const i18n = useI18n()
  const domain = useDomain()

  const validateErrors = value => {
    domain
      .get('validate_email_password_use_case')
      .execute({email: value})
      .then(([error]) => {
        // TODO: Refactor this to minimize re-renders. Value update and error should be updated at once
        if (error === null) {
          setErrorText('')
          return
        }

        if (error.constructor.name === 'InvalidEmailPasswordError') {
          setErrorText(
            i18n.t('LOGIN_CROSS.PASSWORD_RESET.STEP_1.ERRORS.INVALID_EMAIL')
          )
          return
        }

        if (error.constructor.name === 'EmptyEmailPasswordError') {
          setErrorText(
            i18n.t('LOGIN_CROSS.PASSWORD_RESET.STEP_1.ERRORS.EMPTY_EMAIL')
          )
        }
      })
  }

  const handleChange = e => {
    const {value} = e?.target
    validateErrors(value)
    setEmail(value)
  }

  const executeResetPasswordUseCase = ({onSuccessText}) => {
    domain
      .get('reset_password_use_case')
      .execute({email})
      .then(([error]) => {
        if (error) {
          setNotification({
            text: i18n.t('LOGIN_CROSS.PASSWORD_RESET.ERRORS.GENERIC_ERROR'),
            isError: true
          })
          return
        }

        setNotification({
          text: onSuccessText,
          isError: false
        })
      })
  }

  const handleSubmit = () => {
    setIsLoading(true)

    executeResetPasswordUseCase({
      onSuccessText: i18n.t(
        'LOGIN_CROSS.PASSWORD_RESET.STEP_1.SUCCESS.EMAIL_SENDED',
        {
          email
        }
      )
    })
  }

  const handleResend = () => {
    executeResetPasswordUseCase({
      onSuccessText: i18n.t(
        'LOGIN_CROSS.PASSWORD_RESET.STEP_1.SUCCESS.EMAIL_RESEND',
        {
          email
        }
      )
    })
  }

  return (
    <>
      {notification.text ? (
        <>
          <Notification
            notificationText={notification.text}
            isError={notification.isError}
          />
          <ResendText handleResend={handleResend} />
        </>
      ) : null}
      {!notification.text ? (
        <div className={`${BASE_CLASS}-formInput`}>
          <MoleculeInputField
            errorText={errorText}
            id="email"
            label={i18n.t('LOGIN_CROSS.PASSWORD_RESET.STEP_1.EMAIL_LABEL')}
            name="email"
            onChange={handleChange}
            placeholder={i18n.t(
              'LOGIN_CROSS.PASSWORD_RESET.STEP_1.EMAIL_PLACEHOLDER'
            )}
            size="l"
            type="text"
            value={email}
          />
        </div>
      ) : null}
      <div className={`${BASE_CLASS}-formButtons`}>
        {!notification.text ? (
          <SubmitButton
            isEnabled={errorText.length < 1}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            {i18n.t('LOGIN_CROSS.PASSWORD_RESET.STEP_1.SUBMIT_BUTTON')}
          </SubmitButton>
        ) : null}

        <LoginButton />
      </div>
    </>
  )
}

PasswordResetForm.displayName = 'PasswordResetForm'

export default PasswordResetForm

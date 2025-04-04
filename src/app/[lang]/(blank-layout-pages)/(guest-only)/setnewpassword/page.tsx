import { getServerMode } from '@core/utils/serverHelpers'
import SetNewPasswordComponent from '@/views/setnewpassword/SetNewPasswordComponent'

const SetNewPasswordPage = () => {
  const mode = getServerMode()

  return <SetNewPasswordComponent mode={mode} />
}

export default SetNewPasswordPage

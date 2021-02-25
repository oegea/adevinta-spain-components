/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import ScriptLoader from '@s-ui/react-script-loader'

const getGoogleOneTap = () => window && window.google.accounts
const googleOneTapUrl = 'https://accounts.google.com/gsi/client'

export default function GoogleOneTapLoader({
  render,
  timeoutRender,
  onTimeout,
  detectionDelay = 15000,
  googleApiKey
}) {
  return (
    <ScriptLoader
      src={`${googleOneTapUrl}${googleApiKey}`}
      isAsync
      verifier={getGoogleOneTap}
      render={render}
      timeoutRender={timeoutRender}
      onTimeout={onTimeout}
      detectionDelay={detectionDelay}
    />
  )
}

GoogleOneTapLoader.displayName = 'GoogleOneTapLoader'

GoogleOneTapLoader.propTypes = {
  render: PropTypes.func.isRequired,
  timeoutRender: PropTypes.func.isRequired,
  onTimeout: PropTypes.func,
  detectionDelay: PropTypes.number,
  googleApiKey: PropTypes.string.isRequired
}

class TcfRepository {
  constructor({tcfApi}) {
    this._tcfApi = tcfApi
  }

  getVendorList({language}) {
    return this._tcfApi.getVendorList({language})
  }

  loadUserConsent() {
    return this._tcfApi.loadUserConsent()
  }

  saveUserConsent({purpose, vendor, specialFeatures}) {
    this._tcfApi.saveUserConsent({purpose, vendor, specialFeatures})
  }

  uiVisible({visible}) {
    this._tcfApi.uiVisible({visible})
  }
}

export {TcfRepository}

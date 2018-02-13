import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from '../error.action'

const receivegetHealthCareProvider = (data) => ({
  type: types.HEALTHCARE.GET,
  payload: data
})

export const getHealthCareProvider = (configs, patientId) => async (dispatch) => {
  try {
    if (configs) {
      let response
      let count = 0
      while (response === undefined) {
        try {
          response = await Service.HealthProvider.getHealthProvider(configs, patientId)
        } catch (err) {
          response = undefined
          if (++count === 3) {
            throw err
          }
        }
      }
      if (!response.data.length) {
        dispatch(receivegetHealthCareProvider({ nodata: true }))
      } else {
        dispatch(receivegetHealthCareProvider(response.data))
      }
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const healthCareProviderAction = {
  getHealthCareProvider
}

import Axios from "@/libs/axios/axios"
import { AuditLogOperatorFilterPayload, AuditLogOwnerFilterPayload } from "@/types/auditLog/auditLogTypes"
import { axiosErrorHandler } from "@/utils/axiosErrorHandler"

export const searchAuditLogOwner = async (payload: AuditLogOwnerFilterPayload) => {
  try {

    const response = await Axios.post('/log/owner/search', payload)

    return response.data
  } catch (error) {
    console.error('Error fetching search account owner:', error)
    axiosErrorHandler(error, '/log/owner/search')
    throw error
  }
}

export const searchAuditLogOperator = async (payload: AuditLogOperatorFilterPayload) => {
  try {

    const response = await Axios.post('/log/operator/search', payload)

    return response.data
  } catch (error) {
    console.error('Error fetching search account operator:', error)
    axiosErrorHandler(error, '/log/operator/search')
    throw error
  }
}

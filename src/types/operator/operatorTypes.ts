export type UpdateStatusOperatorPayload = {
  operator_id: string,
  is_enable: boolean
};

export type UpdateGameStatusProviderPayload = {
  game_credential_id: string,
  is_enable: boolean
};

export type CredentialQueryParamsPayload = {
  credential_id: string
  provider_name: string
  category_code?: string
  page: number
  pageSize: number
}



export type UpdateStatusCredentialPayload = {
  credential_id: string,
  is_enable: boolean
};



export type DeleteOperatorPayload = {
  operator_id: string
}

export type DeleteDraftOperatorPayload = {
  operator_prefix: string
}


export type ResetPasswordOperatorPayload = {
  email: string;
};

export type CreateOperatorPayload = {
  operator_prefix: string
  email: string
  password: string
  operator_name: string
  currency_code: string
  country_code: string
  timezone: string
  contract?: string
}

type CredentialProvider = {
  provider_code: string
  credential_percent: number
}



export type UpdateAddCredentialPayload = {
  credential_id: string
  credential_provider: CredentialProvider[]
}

export type OperatorCredentialPayload = {
  email: string
  operator_prefix: string
  credential_prefix: string
  currency_code?: string
  description?: string // optional
  credential_provider: CredentialProvider[]
}

export type ProviderCredentialType = {
  id: string
  provider_id: string
  provider_code: string
  provider_name: string
  categories: string[]
  percent_holder: number
  is_enable: boolean
  image: string
  currencies: string[]
  isSelected?: boolean
  selectShare?: number | string
  is_select?: boolean
}

export type DataModifyProviderType = {
  [category: string]: ProviderCredentialType[]
}

export type CredentialProviderType = {
  provider_credential_id: string;
  provider_name: string;
  image: string;
  credential_percent: number;
  currency_code: string;
  is_enable: boolean;
};

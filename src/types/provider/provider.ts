
export type ProviderUpdatePayload = {
  provider_code: string
  is_enable: boolean
}

export type UploadProviderLogoPayload = {
  provider_code: string,
  image: any
}

export type UpdateGameNameProviderPayload = {
  game_id: string,
  game_name: string
}

export type UpdateThumbnailGameProviderPayload = {
  game_id: string,
  game_code: string,
  image: any
}
export type UpdateGameStatusProviderPayload = {
  game_id: string
  is_enable: boolean

}



export type CreateProviderPayload = {
  image?: any
  provider_name: string
  provider_code: string
  category_code: string
  currencies_code: string[]
  percent_holder: number
  secret_key: string
  encrypt_key: string
  remark?: string
  config: string
};


export type GameProviderUpdatePayload = {
  game_id: string;
  game_code?: string;
  game_name?: string;
  provider?: string;
  is_enable?: boolean;
  image?: any;
  category?: string;
};

export type CreateGameProviderPayload = {
  game_code: string;
  game_name: string;
  provider_code: string;
  image?: string;
};

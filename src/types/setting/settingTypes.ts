export type SmtpConfigPayload = {
  host: string
  port: string
  smtp_username: string
  password: string
  sender_name: string
  sender_email: string
}

export type EditSmtpPayload = {
  smtp_id: string
  host?: string
  port?: string
  smtp_username?: string
  password?: string
  sender_name?: string
  sender_email?: string
}

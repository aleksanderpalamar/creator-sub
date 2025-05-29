export interface OverlayConfig {
  titleText: string

  backgroundColor: string
  textColor?: string
  accentColor?: string

  fontFamily?: string
  titleSize?: string
  messageSize?: string

  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  notificationWidth?: string
  roundedCorners?: boolean

  displayDuration?: number
  soundEnabled?: boolean
  soundUrl?: string

  // Discord Integration Settings
  discordEnabled?: boolean
  discordChannelId?: string
  discordChatHeight?: string
  discordMessageLimit?: number
}

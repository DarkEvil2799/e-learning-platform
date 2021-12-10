export type Attachment = {
  name: string,
  url: string,
  size: number
}

export type Message = {
  id?: string,
  author: string,
  avatar: string,
  content: string,
  timestamp: string,
  attachment?: Attachment
}

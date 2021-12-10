import { Message } from "./Message";
import { User } from "./User";

export type Class = {
  id?: string,
  title: string,
  description: string,
  owner: string,
  students: User[],
  messages: Message[]
}
import { Player } from './player.interface'

export interface SubscribeType {
  'add-player': Player
}

export type NotifyType = keyof SubscribeType

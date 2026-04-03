export interface UserInfo {
  token?: string
  account?: string
  avatar?: string
  [key: string]: unknown
}

export interface CartItem {
  id?: string
  skuId: string
  name?: string
  picture?: string
  price: number
  count: number
  attrsText?: string
  selected: boolean
  [key: string]: unknown
}

export interface CategoryHeadItem {
  id: string
  name: string
  children?: { id: string; name: string; picture?: string }[]
  goods?: { id: string; name: string; picture?: string; desc?: string; price: number }[]
}

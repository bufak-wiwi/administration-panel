export interface User {
  uid: string
  name: string
  surname: string
  birthday: string
  email: string
  councilID: number
  address: string
  sex: Sex
  note: string
  invalid: boolean
  isSuperAdmin: boolean
  publicProfile: boolean
  addFields: string
}

export type Sex = 'm' | 'w' | 'kA'

export interface Council {
  councilID: string
  name: string
  nameShort: string
  city: string
  state: string
  university: string
  universityShort: string
  /**
   * e.g. test;adress;33100
   */
  address: string
  contactEmail: string
  invalid: boolean
}

export interface LocationState {
  from: {
    pathname: string
  }
}

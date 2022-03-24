export interface User {
  uid: string
  name: string
  surname: string
  birthday: string
  email: string
  councilID: number
  address: string
  sex: 'm' | 'w' | 'kA'
  note: string
  invalid: boolean
  isSuperAdmin: boolean
  publicProfile: boolean
  addFields: string
}

export interface LocationState {
  from: {
    pathname: string
  }
}

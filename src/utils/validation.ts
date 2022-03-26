import { User } from './types'

export const isValidEmail = (mail: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(mail?.toLowerCase())
}

/**
 * Check whether the password is between 8 and 64 characters long
 */
export const isValidPassword = (password: string) => {
  return password.length >= 8 && password.length <= 64
}

export const isValidName = (name: string) => {
  return name.length >= 3 && name.length <= 32 && !name.includes(';')
}

export const isValidZipCode = (zip: string) => {
  return /^\d{5}(?:[- ]?\d{4})?$/.test(zip)
}

export const isValidUser = (user?: Partial<User>) => {
  return (
    user &&
    user.name &&
    isValidName(user.name) &&
    user.surname &&
    isValidName(user.surname) &&
    user.email &&
    isValidEmail(user.email)
  )
}

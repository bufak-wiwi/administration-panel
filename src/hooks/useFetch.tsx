import { AxiosRequestConfig } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { api } from '../utils/api'

/**
 * Make fetch request to api
 * @param url endpoint url e.g. /users
 * @param config config for request e.g. method 'POST' and data. `skip` allows to delay the request until the function is executed manually
 */
export function useFetch<T>(
  url: string,
  config?: AxiosRequestConfig & { skip?: boolean },
): [T | null, boolean, boolean, (data?: any) => Promise<T>] {
  const [result, setResult] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  /**
   * Fetch the request asynchronously and update the state
   * @param data optional data that is sent in the body. Overwrites the data field in the actual config
   */
  const fetch = async (data: any = undefined) => {
    setLoading(true)
    setError(false)
    try {
      const response = await api.request({
        url: url,
        ...config,
        data: data || config?.data,
      })

      if (response.status > 400) {
        throw new Error()
      }

      setResult(response.data)
      return response.data
    } catch (error) {
      setError(true)
      return Promise.reject(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!config?.skip && url) {
      fetch()
    }
  }, [url, config?.skip])

  return useMemo(() => [result, loading, error, fetch], [result, loading, error, fetch])
}

const cacheMap = new Map()

/**
 * Check if the data is already cached and if not, make a fetch request to api
 * @param key to identify stored data in cache
 * @param url endpoint url e.g. /users
 * @param config config for request
 * @returns {[data, loading]}
 */
export function useFetchCache<T>(
  key: string,
  url: string,
  config?: AxiosRequestConfig,
): [T | null, boolean, boolean, (data?: any) => Promise<void>, () => void] {
  const [data, loading, error, fetchData] = useFetch<T>(url, { ...(config || {}), skip: true })

  const updateResult = () => cacheMap.set(key, data)
  const clearResult = () => cacheMap.set(key, undefined)

  /**
   * Fetch the request asynchronously and update the cache
   */
  const fetch = async () => {
    try {
      await fetchData()
      updateResult()
    } catch {
      clearResult()
    }
  }

  const result = cacheMap.get(key) || null
  if (!result) fetch()

  return useMemo(
    () => [result as T | null, loading, error, fetch, clearResult],
    [result, loading, error, fetch, clearResult],
  )
}

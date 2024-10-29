export const useRequest = (url,) => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseURL;

  // Fetch (GET) data from the API
  const get = async (params = {}) => {
    loading.value = true
    try {
      const response = await useFetch(apiUrl, {
        params,
      })
      data.value = response.data.value
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Create (POST) new data
  const create = async (payload) => {
    loading.value = true
    try {
      const response = await $fetch(apiUrl, {
        method: 'POST',
        body: payload,
      })
      data.value = response
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Update (PUT or PATCH) existing data
  const update = async (id, payload) => {
    loading.value = true
    try {
      const response = await $fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: payload,
      })
      data.value = response
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Delete (DELETE) data
  const remove = async (id) => {
    loading.value = true
    try {
      const response = await $fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      })
      data.value = response
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    get,
    create,
    update,
    remove,
  }
}
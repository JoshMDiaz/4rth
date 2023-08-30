function useLocalStorage<T>(key: string): T | null {
	let value: T | null = null

	if (typeof window !== 'undefined') {
		const storedValue = localStorage.getItem(key)
		if (storedValue !== null) {
			value = JSON.parse(storedValue)
		}
	}

	return value
}

export default useLocalStorage

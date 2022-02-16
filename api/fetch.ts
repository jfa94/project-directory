export const getUrl: (url: string) => Promise<{ result: {} }> = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    const [result] = data.results

    return result
}
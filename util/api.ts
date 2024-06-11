const API_URL =  `${process.env.EXPO_PUBLIC_PIXA_API_BASE_URL}?key=${process.env.EXPO_PUBLIC_PIXA_AUTH_KEY}`

type GetPostsInterface = {
    page: number
    pageSize: number
    category?: string
    querystring?: string
    appliedFilters?:  { [key: string]: string[] } 
}

const getAllWallpapers = async ({ page, pageSize, category, querystring }: GetPostsInterface) => {
    try {
        const filters = [];
        console.log("api url", `${API_URL}&per_page=${pageSize}&page=${page}${querystring ? `&q=${querystring}` : ""}${category ? `&category=${category}` : ""}`)
        const response = await fetch(`${API_URL}&per_page=${pageSize}&page=${page}${querystring ? `&q=${querystring}` : ""}${category ? `&category=${category}` : ""}`, {
            method: "GET"
        })
        const allPosts = await response.json();
        return allPosts?.hits;
    } catch (error) {
        console.log("error", error)
    }
}

export {
    getAllWallpapers
}
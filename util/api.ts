import { FilterOptionsInterface } from "@/components/filterModal";

const API_URL = `${process.env.EXPO_PUBLIC_PIXA_API_BASE_URL}?key=${process.env.EXPO_PUBLIC_PIXA_AUTH_KEY}`;

type GetPostsInterface = {
    page: number;
    pageSize: number;
    category?: string;
    querystring?: string;
    appliedFilters?: FilterOptionsInterface[]; // Change here
};

const getAllWallpapers = async ({ page, pageSize, category, querystring, appliedFilters }: GetPostsInterface) => {
    try {
        let filters = "";
        if (appliedFilters && appliedFilters.length > 0) {
            appliedFilters.forEach((filter) => {
                filters += `&${filter.mappingKey}=${filter.filterOptions.join(",")}`;
            });
        }
        console.log("api url", `${API_URL}&per_page=${pageSize}&page=${page}${querystring ? `&q=${querystring}` : ""}${category ? `&category=${category}` : ""}${filters ? filters : ""}`);
        const response = await fetch(`${API_URL}&per_page=${pageSize}&page=${page}${querystring ? `&q=${querystring}` : ""}${category ? `&category=${category}` : ""}${filters ? filters : ""}`, {
            method: "GET"
        });
        const allPosts = await response.json();
        return allPosts?.hits;
    } catch (error) {
        console.log("error", error);
    }
};

export {
    getAllWallpapers
};

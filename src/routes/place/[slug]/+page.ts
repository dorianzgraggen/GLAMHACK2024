import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    return {
        post: {
            title: "lalala",
            description: "lorem ipsum",
            latitude: 0,
            longitude: 0,
            images: "",
        },
    };
};

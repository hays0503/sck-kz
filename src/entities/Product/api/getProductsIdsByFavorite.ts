const getProductsIdsByFavorite = async (uuid:string,user_id:string) => {
    
    const url = `/api-mapping/featured-products/get-product/?uuid=${uuid}&user_id=${user_id}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })
    return response.json();
}

export default getProductsIdsByFavorite
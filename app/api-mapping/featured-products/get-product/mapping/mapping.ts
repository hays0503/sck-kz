
type rawTypeWishlistItems = {
    readonly product_id: number,
    readonly client_uuid: string,
    readonly id: string,
    readonly user_id: string | null,
    readonly created_at: string,
    readonly is_active: boolean
}

const mapping = (Items:rawTypeWishlistItems[]) => {
    return Items.map((item:rawTypeWishlistItems) => item.product_id)
};


export default mapping
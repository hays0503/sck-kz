


const  getReviewsByUserId = async (user_id: string|undefined|null) => {
  const host_port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : '';
  const url = `${process.env.HOST_URL}${host_port}/api-mapping/reviews/by_user/?user_id=${user_id}`;

  const response = await fetch(url, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      }
  })
  return response.json();
}

export default getReviewsByUserId;
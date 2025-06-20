export const fetchUsers = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`);
  return await res.text();
};

export const fetchAllPosts = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/all-posts`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('投稿取得失敗');
  return await res.json();
};

export const fetchMyPosts = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/my-posts`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('自分の投稿取得失敗');
  return await res.json();
};

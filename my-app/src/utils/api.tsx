export const fetchUsers = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`);
  return await res.text();
};

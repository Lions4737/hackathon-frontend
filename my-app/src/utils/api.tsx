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

  const allPosts = await res.json();

  // ✅ リプライでない投稿だけを返す（IsReply === false）
  return allPosts.filter((post: any) => post.is_reply === false);
};

export const fetchMyPosts = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/my-posts`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('自分の投稿取得失敗');
  return await res.json();
};

export const fetchMyLikes = async (): Promise<number[]> => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/my-likes`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch likes");
  }

  return res.json(); // post ID の配列が返ってくる
};

export const likePost = async (postId: number): Promise<void> => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/like`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to like post');
};

export const unlikePost = async (postId: number): Promise<void> => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/unlike`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to unlike post');
};

export async function fetchPostById(postId: number) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, {
      credentials: 'include', // 認証が必要なら
    });
    if (!res.ok) {
      throw new Error("投稿取得に失敗しました");
    }
    return await res.json(); // 親ツイート1件のオブジェクト
  } catch (err) {
    console.error("fetchPostById エラー", err);
    throw err;
  }
}

export async function fetchRepliesByPostId(postId: number) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/replies`, {
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error("リプライ取得に失敗しました");
    }
    return await res.json(); // リプライ配列
  } catch (err) {
    console.error("fetchRepliesByPostId エラー", err);
    throw err;
  }
}

// ✅ これがあるか確認
export const fetchFactCheck = async (postId: number) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/factcheck`, {
      credentials: 'include',
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Fetch error:", res.status, text);
      throw new Error("Failed to fetch factcheck");
    }

    const data = await res.json();
    console.log("✅ Factcheck result:", data.factcheck);
    return data.factcheck;

  } catch (err) {
    console.error("❌ Error during factcheck:", err);
    return "ファクトチェックに失敗しました。";
  }
};

export const fetchUserProfile = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/profile`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('プロフィール取得に失敗しました');
  return await res.json();
};

export const updateUserProfile = async (profile: {
  username: string;
  description: string;
  profile_image: string;
}) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error('プロフィール更新に失敗しました');
};


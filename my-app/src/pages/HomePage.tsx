import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StatCardProps } from '../components/templates/dashboard/components/StatCard';
import TweetCard from '../components/templates/dashboard/components/TweetCard';
import FloatingPostButton from '../components/templates/dashboard/components/FloadtingPostButton';
import { useEffect, useState } from 'react';
import { fetchAllPosts, fetchMyLikes, likePost, unlikePost } from '../utils/api';
import { formatDistanceToNow } from 'date-fns';
import CustomizedDataGrid from '../components/templates/dashboard/components/CustomizedDataGrid';

function formatTime(isoString: string): string {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
}

type Post = {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  like_count: number;
  reply_count: number;
  user: {
    username: string;
    profile_image: string;
  };
};

const HomePage = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<number[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const [allPosts, myLikes] = await Promise.all([
        fetchAllPosts(),
        fetchMyLikes(),
      ]);
      setPosts(allPosts);
      setLikedPostIds(myLikes);

      // ✅ 投稿取得後に中身をログ
      console.log("📦 All Posts:", allPosts);
      console.log("💖 My Likes:", myLikes);
    };
    loadAll();
  }, []);

  // ✅ 検索語が変わるたびにログ出力
  React.useEffect(() => {
    console.log("🔍 Current SearchTerm:", searchTerm);
  }, [searchTerm]);

  const handleToggleLike = async (postId: number, isLiked: boolean) => {
    if (isLiked) {
      await unlikePost(postId);
      setLikedPostIds((ids) => ids.filter((id) => id !== postId));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: p.like_count - 1 } : p
        )
      );
    } else {
      await likePost(postId);
      setLikedPostIds((ids) => [...ids, postId]);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, like_count: p.like_count + 1 } : p
        )
      );
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ フィルタ後の件数を表示
  console.log("✅ Filtered Posts Count:", filteredPosts.length);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: 'flex', gap: 4, mt: 4, justifyContent: 'center', pr: 1, height: '100vh', overflow: 'hidden'}}>
        <Box sx={{ width: '65%', height: '100%', overflowY: 'auto' }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Tweet List
          </Typography>
          <Grid container spacing={0}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} key={post.id} sx={{width: '100%'}}>
                <TweetCard
                  id={post.id}
                  userId={post.user_id}
                  username={post.user.username}
                  handle={`@${post.user.username}`}
                  avatarUrl={post.user.profile_image}
                  content={post.content}
                  timestamp={formatTime(post.created_at)}
                  likeCount={post.like_count}
                  replyCount={post.reply_count}
                  isLiked={likedPostIds.includes(post.id)}
                  onToggleLike={handleToggleLike}
                />
              </Grid>
            ))}
          </Grid>
          <FloatingPostButton />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

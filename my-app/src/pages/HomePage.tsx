// pages/HomePage.tsx
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
  content: string;
  created_at: string;
  like_count: number;
  reply_count: number;
  user: {
    username: string;
    profile_image: string;
  };
};

const data: StatCardProps[] = [ /* 略 */ ];

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<number[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const [allPosts, myLikes] = await Promise.all([
        fetchAllPosts(), // GET /api/posts
        fetchMyLikes(),  // GET /api/my-likes
      ]);
      setPosts(allPosts);
      setLikedPostIds(myLikes);
    };
    loadAll();
  }, []);

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

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: 'flex', gap: 4, mt: 4, justifyContent: 'center', pr: 1, height: '100vh', overflow: 'hidden'}}>
        {/* 左カラム */}
        <Box sx={{ width: '65%', height: '100%', overflowY: 'auto' }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Tweet List
          </Typography>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} key={post.id} sx={{width: '100%'}}>
                <TweetCard
                  id={post.id}
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

      {/* 他の統計表示やグラフ等（省略可） */}
    </Box>
  );
};

export default HomePage;

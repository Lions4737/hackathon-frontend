import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Avatar,
  Grid,
} from '@mui/material';
import TweetCard from '../components/templates/dashboard/components/TweetCard';
import {
  fetchMyPosts,
  fetchMyLikes,
  fetchUserProfile,
  likePost,
  unlikePost,
} from '../utils/api';
import { formatDistanceToNow } from 'date-fns';
import FloatingPostButton from '../components/templates/dashboard/components/FloadtingPostButton';

function formatTime(isoString: string): string {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [posts, likes, profile] = await Promise.all([
          fetchMyPosts(),
          fetchMyLikes(),
          fetchUserProfile(),
        ]);
        setPosts(posts);
        setLikes(likes);
        setProfile(profile);
      } catch (err) {
        console.error('読み込みエラー:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleToggleLike = async (postId: number, isLiked: boolean) => {
    try {
      if (isLiked) {
        await unlikePost(postId);
        setLikes((prev) => prev.filter((id) => id !== postId));
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, like_count: p.like_count - 1 } : p
          )
        );
      } else {
        await likePost(postId);
        setLikes((prev) => [...prev, postId]);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, like_count: p.like_count + 1 } : p
          )
        );
      }
    } catch (err) {
      console.error('いいね操作失敗:', err);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: 'flex', gap: 4, mt: 4, justifyContent: 'center', pr: 1, height: '100vh', overflow: 'hidden' }}>
        {/* 左カラム（Tweetリスト） */}
        <Box sx={{ width: '65%', height: '100%', overflowY: 'auto' }}>
          {profile && (
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Avatar
                alt={profile.username}
                src={profile.profile_image || '/default-avatar.png'}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="h6">{profile.username}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.description}
                </Typography>
              </Box>
            </Stack>
          )}

          <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            My Tweets
          </Typography>

          <Grid container spacing={2}>
            {posts
              .filter((post) => post.content?.trim())
              .map((post) => (
                <Grid item xs={12} key={post.id} sx={{ width: '100%' }}>
                  <TweetCard
                    id={post.id}
                    username={post.user?.username || '匿名'}
                    handle={`@${post.user?.username || 'anonymous'}`}
                    avatarUrl={post.user?.profile_image || '/default-avatar.png'}
                    content={post.content}
                    timestamp={formatTime(post.created_at)}
                    likeCount={post.like_count || 0}
                    replyCount={post.reply_count || 0}
                    isLiked={likes.includes(post.id)}
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
}

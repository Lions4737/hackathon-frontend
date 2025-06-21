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
  fetchUserPosts,
  fetchMyLikes,
  fetchUserProfileById,
  likePost,
  unlikePost,
} from '../utils/api';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import FloatingPostButton from '../components/templates/dashboard/components/FloadtingPostButton';

function formatTime(isoString: string): string {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
}

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function UserPostsPage({ searchTerm }: Props) {
  const { userId } = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      try {
        const [posts, likes, profile] = await Promise.all([
          fetchUserPosts(Number(userId)),
          fetchMyLikes(),
          fetchUserProfileById(Number(userId)),
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
  }, [userId]);

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

  const filteredPosts = posts.filter((post) => {
    const content = post.content?.toLowerCase() || '';
    const username = post.user?.username?.toLowerCase() || '';
    return (
      content.includes(searchTerm.toLowerCase()) ||
      username.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: 'flex', gap: 4, mt: 4, justifyContent: 'center', pr: 1, height: '100vh', overflow: 'hidden' }}>
        {/* 左カラム */}
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

          <Box sx={{ position: 'relative', mb: 2 }}>
            <Typography component="h2" variant="h6" sx={{ textAlign: 'center' }}>
              Tweets
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                mr: 2,
              }}
            >
              投稿数: {filteredPosts.length} 件
            </Typography>
          </Box>

          <Grid container spacing={0}>
            {filteredPosts
              .filter((post) => post.content?.trim())
              .map((post) => (
                <Grid item xs={12} key={post.id} sx={{ width: '100%' }}>
                  <TweetCard
                    id={post.id}
                    userId={post.user_id}
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

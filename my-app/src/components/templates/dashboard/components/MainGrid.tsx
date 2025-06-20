import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import TweetCard from './TweetCard';
import FloatingPostButton from './FloadtingPostButton';
import { useEffect, useState } from 'react';
import { fetchAllPosts, fetchMyPosts } from '../../../../utils/api';
import { useAuthContext } from '../../../auth/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { likePost, unlikePost, fetchMyLikes } from '../../../../utils/api';

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

export default function MainGrid() {
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

        {/* 右カラム */}
        <Box sx={{ width: '30%', height: '100%', overflowY: 'auto' }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Tweet Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <CustomizedDataGrid />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* 以下略: StatCard, Chart, TreeView など */}
    </Box>
  );
}

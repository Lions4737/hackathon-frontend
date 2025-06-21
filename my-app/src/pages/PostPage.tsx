import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import TweetCard from '../components/templates/dashboard/components/TweetCard';
import FloatingPostButton from '../components/templates/dashboard/components/FloadtingPostButton';
import {
  fetchPostById,
  fetchRepliesByPostId,
  likePost,
  unlikePost,
  fetchMyLikes,
  fetchFactCheck,
} from '../utils/api';
import { formatDistanceToNow } from 'date-fns';

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

const PostPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const replyOpen = query.get('replyOpen') === 'true';
  const analyze = query.get('analyze') === 'true';

  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Post[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<number[]>([]);
  const [openReplyModal, setOpenReplyModal] = useState(replyOpen);
  const [loading, setLoading] = useState(false);
  const [factcheck, setFactcheck] = useState("");

  const load = useCallback(async () => {
    if (!postId) return;
    const [parent, replyList, myLikes] = await Promise.all([
      fetchPostById(Number(postId)),
      fetchRepliesByPostId(Number(postId)),
      fetchMyLikes(),
    ]);
    setPost(parent);
    setReplies(replyList);
    setLikedPostIds(myLikes);

    if (analyze) {
      setLoading(true);
      const result = await fetchFactCheck(Number(postId));
      setFactcheck(result);
      setLoading(false);
    }
  }, [postId, analyze]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setOpenReplyModal(query.get('replyOpen') === 'true');
  }, [location.search]);

  const handleToggleLike = async (tweetId: number, isLiked: boolean) => {
    if (isLiked) {
      await unlikePost(tweetId);
      setLikedPostIds((ids) => ids.filter((id) => id !== tweetId));
      updateLikeCount(tweetId, -1);
    } else {
      await likePost(tweetId);
      setLikedPostIds((ids) => [...ids, tweetId]);
      updateLikeCount(tweetId, 1);
    }
  };

  const updateLikeCount = (id: number, delta: number) => {
    if (post && post.id === id) {
      setPost({ ...post, like_count: post.like_count + delta });
    } else {
      setReplies((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, like_count: r.like_count + delta } : r
        )
      );
    }
  };

  const handleCloseReplyModal = () => {
    setOpenReplyModal(false);
    navigate(`/posts/${postId}`, { replace: true });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          mt: 4,
          justifyContent: 'center',
          pr: 1,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* 左カラム */}
        <Box sx={{ width: '65%', height: '100%', overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Tweet Detail
          </Typography>

          {/* 親ツイート */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} key={post.id} sx={{ width: '100%' }}>
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
          </Grid>

          {/* リプライ一覧 */}
          <Box sx={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' }}>
            <Grid container spacing={2}>
              {replies.map((reply) => (
                <Grid item xs={12} key={reply.id} sx={{ width: '100%' }}>
                  <TweetCard
                    id={reply.id}
                    username={reply.user.username}
                    handle={`@${reply.user.username}`}
                    avatarUrl={reply.user.profile_image}
                    content={reply.content}
                    timestamp={formatTime(reply.created_at)}
                    likeCount={reply.like_count}
                    replyCount={reply.reply_count}
                    isLiked={likedPostIds.includes(reply.id)}
                    onToggleLike={handleToggleLike}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <FloatingPostButton
            parentPostId={Number(postId)}
            open={openReplyModal}
            onPostSuccess={() => {
              handleCloseReplyModal();
              load();
            }}
            onClose={() => {
              setOpenReplyModal(false);
              navigate(`/posts/${postId}`, { replace: true });
            }}
          />
        </Box>

        {/* 右カラム */}
        <Box sx={{ width: '30%', height: '100%', overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Related Info
          </Typography>

          {analyze && post && (
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                🧐 Geminiによるファクトチェック
              </Typography>
              {loading ? (
                <Typography variant="body2" color="text.secondary">
                  分析中...
                </Typography>
              ) : (
                <Typography variant="body2">{factcheck}</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;

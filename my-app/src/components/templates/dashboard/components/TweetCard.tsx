// src/components/ui/TweetCard.tsx

import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Stack
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatIcon from '@mui/icons-material/Repeat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom'; // ✅ 追加
import GavelIcon from '@mui/icons-material/Gavel'; // ← 分析アイコン

export type TweetCardProps = {
  id: number;
  userId: number; // ユーザーIDを追加
  username: string;
  handle: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  likeCount: number;
  replyCount: number;
  isLiked: boolean;
  onToggleLike: (postId: number, liked: boolean) => void;
};

const TweetCard: React.FC<TweetCardProps> = ({
  id,
  userId,
  username,
  handle,
  avatarUrl,
  content,
  timestamp,
  likeCount,
  replyCount,
  isLiked,
  onToggleLike
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/posts/${id}`);
  };

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // カードクリックとの競合防止
    navigate(`/posts/${id}?replyOpen=true`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ カードクリックと分離
    onToggleLike(id, isLiked);
  };
  return (
    <Card
      variant="outlined"
      sx={{ mb: 2, borderRadius: 2, cursor: 'pointer' }}
      onClick={handleCardClick} // ✅ カードクリック時に詳細へ遷移
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
        <Avatar
          alt={username}
          src={avatarUrl}
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {username}
              </Typography>
              <Typography variant="caption" color="text.secondary" >
                @{userId} · {timestamp}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body1" sx={{ my: 2, whiteSpace: 'pre-line', fontSize: '1.1rem' }}>
            {content}
          </Typography>
            {/* 全アクションを1つのStackで横並びに */}
            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
            {/* リプライ */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small" onClick={handleReplyClick}>
                <ChatBubbleOutlineIcon fontSize="small" color="action" />
                </IconButton>
                <Typography variant="caption" color="text.secondary">{replyCount}</Typography>
            </Stack>

            {/* リツイート */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                <RepeatIcon fontSize="small" color="action" />
                </IconButton>
                <Typography variant="caption" color="text.secondary">0</Typography>
            </Stack>

            {/* いいね */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small" onClick={handleLike}>
                <FavoriteBorderIcon
                    fontSize="small"
                    color={isLiked ? 'error' : 'action'}
                />
                </IconButton>
                <Typography variant="caption" color="text.secondary">{likeCount}</Typography>
            </Stack>

            {/* 分析 */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/posts/${id}?analyze=true`);
                }}
                >
                <GavelIcon fontSize="small" color="action" />
                </IconButton>
            </Stack>
            </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TweetCard;

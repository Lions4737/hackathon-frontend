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

export type TweetCardProps = {
  username: string;
  handle: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
};

const TweetCard: React.FC<TweetCardProps> = ({
  username,
  handle,
  avatarUrl,
  content,
  timestamp
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
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
              <Typography variant="caption" color="text.secondary">
                {handle} · {timestamp}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
            {content}
          </Typography>
         <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
            {/* リプライ */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small">
                <ChatBubbleOutlineIcon fontSize="small" color="action" />
                </IconButton>
                <Typography variant="caption" color="text.secondary">12</Typography>
            </Stack>

            {/* リツイート */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small">
                <RepeatIcon fontSize="small" color="action" />
                </IconButton>
                <Typography variant="caption" color="text.secondary">8</Typography>
            </Stack>

            {/* いいね */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small">
                <FavoriteBorderIcon fontSize="small" color="action" />
                </IconButton>
                <Typography variant="caption" color="text.secondary">32</Typography>
            </Stack>
        </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TweetCard;

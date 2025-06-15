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
                @{handle} · {timestamp}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
            {content}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <IconButton size="small">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <RepeatIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TweetCard;

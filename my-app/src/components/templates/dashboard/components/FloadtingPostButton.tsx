import * as React from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom'; // 追加

const tweetSchema = z.object({
  content: z
    .string()
    .min(1, '内容を入力してください')
    .max(140, '140文字以内で入力してください'),
});

type TweetFormData = z.infer<typeof tweetSchema>;

type FloatingPostButtonProps = {
  parentPostId?: number;
  open?: boolean;
  onPostSuccess?: () => void;
  onClose?: () => void;
};

const FloatingPostButton: React.FC<FloatingPostButtonProps> = ({
  parentPostId,
  open = false,
  onPostSuccess,
  onClose,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(open);
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TweetFormData>({
    resolver: zodResolver(tweetSchema),
  });

  const handleFabClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    reset();
    setDialogOpen(false);
    onClose?.();
  };

  const onSubmit = async (data: TweetFormData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: data.content,
          parent_post_id: parentPostId ?? null,
        }),
      });

      if (!res.ok) throw new Error('投稿に失敗しました');

      const result = await res.json();
      console.log('投稿成功:', result);
      handleClose();
      if (!parentPostId) {
      navigate(`/my-posts`);
      }
      onPostSuccess?.();
    } catch (err) {
      console.error('投稿エラー:', err);
      alert('投稿に失敗しました');
    }
  };

  // 🔁 open prop の変化に応じてダイアログ状態を更新
  React.useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleFabClick}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1500,
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{parentPostId ? '返信を投稿' : '新しいツイートを投稿'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              placeholder="ツイート内容"
              multiline
              fullWidth
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}
              variant="outlined"
              sx={{
                height: 120,
                '& .MuiInputBase-root': {
                  height: '100%',
                  alignItems: 'start',
                  padding: 1,
                },
                '& textarea': {
                  height: '100% !important',
                  overflow: 'hidden',
                  resize: 'none',
                  lineHeight: 1.5,
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit" variant="contained">
              投稿
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FloatingPostButton;

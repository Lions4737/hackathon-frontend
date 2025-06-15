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

// バリデーションスキーマ：140文字以内
const tweetSchema = z.object({
  content: z
    .string()
    .min(1, '内容を入力してください')
    .max(140, '140文字以内で入力してください'),
});

type TweetFormData = z.infer<typeof tweetSchema>;

const FloatingPostButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TweetFormData>({
    resolver: zodResolver(tweetSchema),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: TweetFormData) => {
    console.log('投稿内容:', data.content);
    // TODO: 投稿処理
    handleClose();
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1500,
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>新しいツイートを投稿</DialogTitle>
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

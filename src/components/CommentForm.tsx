import { useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';

interface CommentFormProps {
  photoId: string;
  onSubmit: (photoId: string, comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ photoId, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      onSubmit(photoId, comment);
      setComment('');
    }
  };

  return (
    <Box mt={4} sx={{ width: "100%" }}>
      <Textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={handleCommentChange}
        resize="vertical"
        size="sm"
      />
      <Button mt={2} mb={2} colorScheme="blue" size="sm" sx={{ float: 'right' }} onClick={handleSubmit}>
        Comment
      </Button>
    </Box>
  );
};

export default CommentForm;

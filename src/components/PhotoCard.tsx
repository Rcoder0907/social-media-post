import moment from 'moment';
import { Box, Center, Image, Text, Card, CardBody, CardFooter } from '@chakra-ui/react';
import CommentForm from './CommentForm';

interface Comment {
  _id: string;
  text: string;
  createdAt: string;
}

interface Photo {
  _id: string;
  fileName: string;
  comments: Comment[];
}

interface PhotoCardProps {
  photo: Photo;
  addCommentToPhoto: (photoId: string, comment: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, addCommentToPhoto }) => {

  const handleCommentFormSubmit = async (photoId: string, comment: string) => {

    try {
      await addCommentToPhoto(photoId, comment);
    } catch (error) {
      console.error('Error adding comment photo:', error);
    }
  };

  return (
    <Center>
      <Box borderRadius="md" p={4} maxW="500px">
        <Card maxW='md' mb={2}>
            <Image
              objectFit='cover'
              src={`${process.env.API_URL}/uploads/${photo.fileName}`}
              alt='Post'
            />

          <CardFooter
            justify='space-between'
            flexWrap='wrap'
          >
            <CommentForm photoId={photo._id} onSubmit={handleCommentFormSubmit} />
            {photo.comments.map((comment) => (
              <Card key={comment._id} variant={"filled"} mt={2} mb={2} sx={{ width: "100%" }}>
                <CardBody>
                <Text fontSize='xs'>{moment(comment.createdAt).format("DD-MMM-YYYY hh:mm:ss a")}</Text>
                  <Text>{comment.text}</Text>
                </CardBody>
              </Card>
            ))}
            
          </CardFooter>
        </Card>
      </Box>
    </Center>
  );
};

export default PhotoCard;

'use client'

import { useState, useRef } from 'react';
import { Center, Button, Input, Text, Box, Card, CardBody } from '@chakra-ui/react';

interface PhotoUploadFormProps {
  onUpload: (file: File) => void;
}

const PhotoUploadForm: React.FC<PhotoUploadFormProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);

      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    }
  };

  return (
    <Center>
      <Box borderRadius="md" p={4} maxW="500px">
        <Card maxW='md' mb={2}>
          <CardBody>

            <Text mb={2}>Select a photo to upload:</Text>
            <Input type="file" accept="image/*" ref={inputFileRef} onChange={handleFileChange} />
            <Button mt={2} mb={2} size="sm" colorScheme="blue" onClick={handleUpload} disabled={!selectedFile}>
              Upload Photo
            </Button>
          </CardBody>
        </Card>
      </Box>
    </Center>
  );
};

export default PhotoUploadForm;

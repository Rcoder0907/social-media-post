'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css'

import PhotoUploadForm from '@/components/PhotoUploadForm';
import PhotoCard from '@/components/PhotoCard';

import { uploadPhoto, getPhotos, addComment } from '../services/photo.service';

export default function Home() {

  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await getPhotos();
      setPhotos(response?.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      await uploadPhoto(file);
      fetchPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  
  };

  const handleComment = async (photoId: string, comment: string) => {
    try {
      await addComment(photoId, comment);
      fetchPhotos();
    } catch (error) {
      console.error('Error adding comment photo:', error);
    }
  }

  return (
    <main className={styles.main}>
      <PhotoUploadForm onUpload={handleUpload} />
      {photos.map((photo) => (
          <PhotoCard photo={photo} addCommentToPhoto={handleComment} />
        ))}

    </main>
  )
}

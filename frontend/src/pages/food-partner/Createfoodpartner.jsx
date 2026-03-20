import React from 'react';
import '../../styles/create-food-partner.css';
import axios from 'axios';

const Createfoodpartner = () => {
  const [videoFileName, setVideoFileName] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [previewType, setPreviewType] = React.useState('');

  React.useEffect(() => () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const handleVideoChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setVideoFileName(selectedFile ? selectedFile.name : '');

    if (!selectedFile) {
      setPreviewUrl('');
      setPreviewType('');
      return;
    }

    setPreviewUrl(URL.createObjectURL(selectedFile));
    if (selectedFile.type.startsWith('image/')) {
      setPreviewType('image');
      return;
    }

    if (selectedFile.type.startsWith('video/')) {
      setPreviewType('video');
      return;
    }

    setPreviewType('unsupported');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', event.target.video.files[0]);
    formData.append('name', event.target.name.value);
    formData.append('description', event.target.description.value);

    const response = axios.post('http://localhost:3000/api/food', formData, {
      withCredentials: true,
    })
    console.log(response.data);
    

  };

  return (
    <main className="food-submit-layout">
      <section className="food-submit-card" aria-labelledby="food-submit-title">
        <header className="food-submit-header">
          <p className="food-submit-tag">Food Partner</p>
          <h1 id="food-submit-title" className="food-submit-title">Submit New Food Post</h1>
          <p className="food-submit-subtitle">
            Share your dish with a short video, add a clear food name, and tell customers what makes it special.
          </p>
        </header>

        <form className="food-submit-form" onSubmit={handleSubmit}>
          <div className="food-submit-field">
            <label htmlFor="food-video">Food Media (Image or Video)</label>
            <input
              id="food-video"
              name="video"
              type="file"
              accept="video/*,image/*"
              onChange={handleVideoChange}
              required
            />
            <small className="food-submit-hint">
              {videoFileName || 'Upload an image or a short vertical video.'}
            </small>

            {previewUrl && previewType !== 'unsupported' && (
              <div className="food-submit-preview" aria-live="polite">
                {previewType === 'image' ? (
                  <img src={previewUrl} alt="Food preview" className="food-submit-preview-media" />
                ) : (
                  <video className="food-submit-preview-media" src={previewUrl} controls playsInline />
                )}
              </div>
            )}
          </div>

          <div className="food-submit-field">
            <label htmlFor="food-name">Food Name</label>
            <input
              id="food-name"
              name="name"
              type="text"
              placeholder="Example: Masala Paneer Wrap"
              autoComplete="off"
              required
            />
          </div>

          <div className="food-submit-field">
            <label htmlFor="food-description">Food Description</label>
            <textarea
              id="food-description"
              name="description"
              placeholder="Describe ingredients, taste, and serving style."
              rows={4}
              required
            />
          </div>

          <button className="food-submit-button" type="submit">Publish Food</button>
        </form>
      </section>
    </main>
  );
};

export default Createfoodpartner;
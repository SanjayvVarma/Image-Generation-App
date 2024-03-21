
import React, { useState } from 'react';
import axios from 'axios';

const HuggingFace = () => {
  const [textInput, setTextInput] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);

  const API_TOKEN = "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";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
        {
          inputs: textInput,
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'image/jpeg"',
          },
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setGeneratedImages(imageUrl);
      console.log(response.json())
    } catch (error) {
      console.log('Error generating images. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter text..."
        />
        </div>
        <div>
        <button type="submit">Generate Images</button>
        </div>
      </form>
      {/* <div>
          <img src={generatedImages} alt='Generated Images' />
      </div> */}
       {generatedImages && (
        <div>
          <img src={generatedImages} alt='Generated Images' />
        </div>
      )}
    </div>
  );
};

export default HuggingFace


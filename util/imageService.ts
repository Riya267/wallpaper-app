import { misc } from '@/constants/misc';
const axios = require('axios');

const api_key = process.env.EXPO_PUBLIC_API_KEY!;

const ImageService = async (prompt: string) => {
  const data = JSON.stringify({
    prompt: prompt,
    aspect_ratio: '1:1',
  });
  let errorMsg = 'Image not generated successfully';

  try {
    console.log('prompt', prompt, api_key, misc.IMAGE_GENERATION_API_URL);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: misc.IMAGE_GENERATION_API_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${api_key}`,
        'Content-Type': 'application/json',
        'X-Api-Version': 'v1',
      },
      data: data,
    };

    const imageResponse = await axios.request(config);
    imageResponse.data.data[0].asset_url;

    if (!imageResponse?.data?.data[0]?.asset_url) {
      throw new Error(errorMsg);
    }
    return imageResponse?.data?.data[0]?.asset_url;
  } catch (error) {
    throw new Error(errorMsg);
  }
};

export default ImageService;

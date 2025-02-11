// app/api/upload/route.js
import { NextResponse } from 'next/server';
import cloudinary from '../../../lib/cloudinary';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64
    const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64File, {
      folder: 'ergohub/profiles',
      transformation: [
        { width: 400, height: 400, crop: 'fill' },
        { quality: 'auto:good' }
      ]
    });

    console.log('Cloudinary upload response:', uploadResponse);

    return NextResponse.json({
      url: uploadResponse.secure_url
    });

  } catch (error) {
    console.error('Upload error details:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};
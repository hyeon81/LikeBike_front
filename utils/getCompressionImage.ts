import imageCompression from 'browser-image-compression'

function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, {
    type: blob.type,
    lastModified: Date.now(),
  });
}


export const getCompressionImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  }

  try {
    const compressedBlob = await imageCompression(file, options)
    const compressedFile = blobToFile(compressedBlob, file.name)
    console.log('Compressed file:', compressedFile)
    return compressedFile
  } catch (error) {
    console.error('Error compressing image:', error)
    throw new Error('Image compression failed')
  }
}

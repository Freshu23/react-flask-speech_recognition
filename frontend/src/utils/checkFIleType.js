export const checkFileType = (file) => {
  const fileType = file.type;
  const validFileTypes = ["audio/wav"];
  if (validFileTypes.includes(fileType)) {
    return true;
  }
  return false;
};

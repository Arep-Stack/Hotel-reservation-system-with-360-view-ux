const db = require('../../config/db');

const uplaodImage = async (imageData) => {
  try {
      const query = `
      INSERT INTO "IMAGES" 
      ("FILE_NAME", "PATH", "ID") 
      VALUES ($1, $2, $3) 
      RETURNING *
      `;
      const values = [
          imageData.FILLE_NAME, 
          imageData.PATH,
          imageData.ID
      ];
      const image = await db.one(query, values);
      return image;
  } catch (error) {
      console.error('Error uploading image', error);
      throw error;
  }
};
const retrieveImage = async (imageID) => {
  try {
      const query = `
        SELECT * FROM "IMAGES" 
        WHERE "ID" = $1
      `;
      const values = [imageID];
      console.log(values)
      const result = await db.oneOrNone(query, values);
      return result
  } catch (error) {
      console.error('Error fetching image', error);
      throw error;
  }
};

module.exports = {
  uplaodImage,
  retrieveImage
}
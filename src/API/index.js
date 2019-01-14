const ROOT_URL = 'https://api.flickr.com/services/rest/?';
const METHOD = 'flickr.groups.pools.getPhotos';
const API_KEY = '1fcb9861ab94585b956ae575aa9d3e7d';
const GROUP_ID = 'group_id=16978849@N00';
const FORMAT = 'format=json&nojsoncallback=1';
const photoNumber = 50;

const MAIN_URL = `${ROOT_URL}method=${METHOD}&api_key=${API_KEY}&${GROUP_ID}&per_page=${photoNumber}&${FORMAT}`;

export const api = {
  async fetchPhotos() {
    const response = await fetch(MAIN_URL, {
      method: 'GET',
    });

    const { photos: photo } = await response.json();
    const photoArray = photo.photo;
    return photoArray;
  },
};

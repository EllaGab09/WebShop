export class ImageService {

   loadImage(imageUrl, onComplete) {
      let request = new Request(imageUrl);
      fetch(request)
         .then(function(response) {
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
         })
         .then(function(response) {
            let objectUrl = URL.createObjectURL(response);
            onComplete(objectUrl);
         });
   }
}
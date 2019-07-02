// turn get route method into promise
export default function getRoute(data) {

  return new Promise((resolve, reject) => {

    const { google } = window;

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(data, (result, status) => {

      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result);
      } else {
        reject(status)
      }

    });

  })

}

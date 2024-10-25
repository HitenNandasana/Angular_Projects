import { Component, ElementRef, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GoogleMapsModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  address: any;
  latlng_: any;
  imageSrc: any;
  setMap: any;
  // @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  // center = { lat: 37.7749, lng: -122.4194 }; // Example center coordinates (San Francisco)
  // zoom = 12;
  // directionsService = new google.maps.DirectionsService();
  // directionsRenderer = new google.maps.DirectionsRenderer();

  // ngAfterViewInit(): void {
  //   this.directionsRenderer.setMap(this.map.googleMap!);
  //   this.calculateAndDisplayRoute();
  // }

  // calculateAndDisplayRoute(): void {
  //   this.directionsService.route(
  //     {
  //       origin: { lat: 37.7749, lng: -122.4194 }, // Example start coordinates
  //       destination: { lat: 37.8044, lng: -122.2711 }, // Example end coordinates
  //       travelMode: google.maps.TravelMode.DRIVING
  //     },
  //     (response, status) => {
  //       if (status === 'OK') {
  //         this.directionsRenderer.setDirections(response);
  //       } else {
  //         window.alert('Directions request failed due to ' + status);
  //       }
  //     }
  //   );
  // }
  // @ViewChild(GoogleMap) map!: GoogleMap;

  // directionsService = new google.maps.DirectionsService();
  // directionsRenderer = new google.maps.DirectionsRenderer();
  constructor(private zone: NgZone) { }
  // ngOnInit(): void { 
  //   // this.directionsRenderer.setMap(this.map.googleMap);

  //   // // Optionally, set the directions panel
  //   // this.directionsRenderer.setPanel(document.getElementById('directionsPanel'));

  //   // // Create the request for directions
  //   // const request: google.maps.DirectionsRequest = {
  //   //   origin: 'Chicago, IL',
  //   //   destination: 'Los Angeles, CA',
  //   //   travelMode: google.maps.TravelMode.DRIVING
  //   // };

  //   // // Route the directions
  //   // this.directionsService.route(request, (result, status) => {
  //   //   if (status === google.maps.DirectionsStatus.OK) {
  //   //     this.directionsRenderer.setDirections(result);
  //   //   } else {
  //   //     console.error('Error fetching directions', result);
  //   //   }
  //   // });
  // }
  // ngAfterViewInit(): void {
  //   // if (this.map?.googleMap) {
  //   //   this.directionsRenderer.setMap(this.map.googleMap);
  //   //   this.directionsRenderer.setPanel(document.getElementById('directionsPanel') as HTMLElement);

  //   //   const request: google.maps.DirectionsRequest = {
  //   //     origin: 'Chicago, IL',
  //   //     destination: 'Los Angeles, CA',
  //   //     travelMode: google.maps.TravelMode.DRIVING
  //   //   };

  //   //   this.directionsService.route(request, (result, status) => {
  //   //     if (status === google.maps.DirectionsStatus.OK) {
  //   //       this.directionsRenderer.setDirections(result);
  //   //     } else {
  //   //       console.error('Error fetching directions', result);
  //   //     }
  //   //   });
  //   // } else {
  //   //   console.error('GoogleMap is not available.');
  //   // }
  // }

  //#region Angular Google map
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  zoom = 4;
  // infoWindow = new google.maps.InfoWindow();
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  infoWindowContent = '';
  infoWindowOptions: google.maps.InfoWindowOptions = {};
  infoWindowPosition: google.maps.LatLngLiteral | null = null;

  directionsService: google.maps.DirectionsService | undefined;
  directionsRenderer: google.maps.DirectionsRenderer | undefined;
  // infoWindow = new MapInfoWindow();
  // infoWindowContent = '';
  // infoWindowOptions: google.maps.InfoWindowOptions = {};
  // infoWindowPosition!: google.maps.LatLngLiteral;
  // infoWindowContent = '';
  // infoWindowOptions: google.maps.InfoWindowOptions = {};
  // infoWindowPosition: google.maps.LatLngLiteral;
  // map!: google.maps.Map;
  ngAfterViewInit() {
    this.initMap();

    // this.addMarkerClusterer();
    if (typeof google !== 'undefined') {
      // this.directionsService = new google.maps.DirectionsService();
      // this.directionsRenderer = new google.maps.DirectionsRenderer();
      // this.directionsRenderer.setMap(this.map.googleMap!); // Use non-null assertion operator
      // this.addMarkerClusterer();
    } else {
      console.error('Google Maps API is not loaded.');
    }
  }
  async initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 23.0754634, lng: 72.5260687 },
      zoom: 14,
      mapId: '4504f8b37365c3d0',
    });

    const priceTag = document.createElement('img');
    priceTag.className = 'price-tag';
    priceTag.src = 'https://moon-in-out.s3.ap-south-1.amazonaws.com/beta_employee/466/2024072507473939061532.jpg';

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: 23.0754634, lng: 72.5260687 },
      content: priceTag,
    });
    
  }

  getAddress(latitude: number, longitude: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: latitude, lng: longitude };

      geocoder.geocode({ location: latlng }, (results: any, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.address = results[0].formatted_address;
            // resolve({ address, locationName });
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    // event.latLng ? this.getAddress(event.latLng.lat(), event.latLng.lng()) : '';
    // if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  // markerPositions: any = [];
  // markerPositions: any = [
  //   { position: { lat: 24, lng: 12 }, label: '1', iconUrl: 'assets/in-flag.jpeg', info: '1 info', color: 'blue' },
  //   { position: { lat: 13, lng: 42 }, label: '2', iconUrl: 'assets/us-flag.jpeg', info: '2 info', color: 'red' },
  //   { position: { lat: 32, lng: 13 }, label: '3', iconUrl: 'assets/in-flag.jpeg', info: '3 info', color: 'blue' },
  //   { position: { lat: 21, lng: 14 }, label: '4', iconUrl: 'assets/in-flag.jpeg', info: '4 info', color: 'green' },
  // ]
  addMarkerClusterer() {
    // const markersData = [
    //   { position: { lat: 23.00985766099197, lng: 72.52204561159165 }, label: 'LA', iconUrl: 'assets/in-flag.jpeg', color: 'blue', info: 'Neelkundh elegence Info' }, // Los Angeles
    //   { position: { lat: 23.03273606114023, lng: 72.50600346604831 }, label: 'CHI', color: 'green', iconUrl: 'assets/in-flag.jpeg', info: 'Isocn Info' },  // Chicago
    //   { position: { lat: 23.075935295321457, lng: 72.52652075581494 }, label: 'NY', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'Moon Info' },  // New York
    //   { position: { lat: 23.045141507034018, lng: 72.49328571666082 }, label: 'NY', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

    //   { position: { lat: 23.039233811139685, lng: 72.54668720791038 }, label: '6', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

    //   { position: { lat: 23.064190626007353, lng: 72.58067615680781 }, label: '7', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

    //   { position: { lat: 23.04349891097873, lng: 72.58977420878541 }, label: '8', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

    //   { position: { lat: 23.01648433197717, lng: 72.5925207905145 }, label: '9', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
    //   // Add more marker positions, labels, and info as needed
    // ];
    const markersData = [
      { position: { lat: 23.0754664, lng: 72.5260822 }, label: 'LA', iconUrl: 'assets/in-flag.jpeg', color: 'blue', info: 'Neelkundh elegence Info' }, // Los Angeles
      { position: { lat: 23.073663980062527, lng: 72.52869095653296 }, label: 'CHI', color: 'green', iconUrl: 'assets/in-flag.jpeg', info: 'Isocn Info' },  // Chicago
      { position: { lat: 23.0754634, lng: 72.5260687 }, label: 'NY', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'Moon Info' },  // New York
      { position: { lat: 23.0754634, lng: 72.5260687 }, label: 'NY', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

      { position: { lat: 23.07426577367869, lng: 72.52790808677673 }, label: '6', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

      { position: { lat: 23.0755003, lng: 72.5261102 }, label: '7', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

      { position: { lat: 23.07426577367869, lng: 72.52790808677673 }, label: '8', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

      { position: { lat: 23.0754812, lng: 72.5260903 }, label: '9', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.07426577367869, lng: 72.52790808677673 }, label: '10', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754788, lng: 72.5260933 }, label: '11', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.07426577367869, lng: 72.52790808677673 }, label: '12', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754849, lng: 72.5260969 }, label: '13', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.07426577367869, lng: 72.52790808677673 }, label: '14', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754707, lng: 72.5260886 }, label: '15', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.07481605313185, lng: 72.52703804522753 }, label: '16', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754865, lng: 72.5260916 }, label: '17', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 22.74381580421982, lng: 72.81732682138681 }, label: '18', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754879, lng: 72.5260941 }, label: '19', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 22.79186506891752, lng: 72.63518538326025 }, label: '20', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 22.79186506891752, lng: 72.63518538326025 }, label: '21', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754744, lng: 72.5260788 }, label: '22', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754744, lng: 72.5260788 }, label: '23', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754711, lng: 72.5260732 }, label: '24', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754711, lng: 72.5260732 }, label: '25', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754824, lng: 72.5260943 }, label: '26', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.0754924, lng: 72.5260975 }, label: '27', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      { position: { lat: 23.032700525575525, lng: 72.4814847484231 }, label: '28', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York
      // { position: { lat: 23.0745702166813, lng: 72.56906926631927 }, label: '29', iconUrl: 'assets/in-flag.jpeg', color: 'red', info: 'New York Info' },  // New York

      // Add more marker positions, labels, and info as needed
    ];

    // const markersData = [
    //   { position: { lat: 34.0522, lng: -118.2437 }, label: 'LA', iconUrl: 'assets/in-flag.jpeg', info: 'Los Angeles Info' }, // Los Angeles
    //   { position: { lat: 36.1699, lng: -115.1398 }, label: 'LV', iconUrl: 'assets/us-flag.jpeg', info: 'Las Vegas Info' },  // Las Vegas
    //   { position: { lat: 37.7749, lng: -122.4194 }, label: 'SF', iconUrl: 'assets/in-flag.jpeg', info: 'San Francisco Info' },  // San Francisco
    //   { position: { lat: 40.7128, lng: -74.0060 }, label: 'NY', iconUrl: 'assets/in-flag.jpeg', info: 'New York Info' }  // New York
    // ];

    const markerInstances = markersData.map((data: any) => {
      // Create a custom marker icon
      const icon = {
        url: data.iconUrl, // Use a predefined Google Maps marker icon with a color suffix
        scaledSize: new google.maps.Size(32, 32), // Size of the marker icon
      };

      // Create the marker instance with custom icon and label
      const marker = new google.maps.Marker({
        position: data.position,
        label: data.label,
        icon: icon,
        map: this.map.googleMap
      });

      marker.addListener('click', () => {
        this.getAddress(data.position.lat, data.position.lng);
        this.infoWindowContent = data.info;
        this.infoWindowPosition = data.position;
        this.infoWindowOptions = {
          position: data.position,
        };
        this.infoWindow?.open(); // Open info window on marker click
      });
      // Add click event listener to open info window
      // marker.addListener('click', () => {
      //   this.openInfoWindow(marker, data.info);
      // });
      // marker.addListener('click', () => {
      //   console.log('object');
      //   this.infoWindowContent = data.info;
      //   this.infoWindowOptions = { position: data.position };
      // });
      // marker.addListener('click', () => {
      //   this.infoWindow.setContent(data.info); // Set content of the info window
      //   this.infoWindow.open({
      //     anchor: marker,
      //     map: this.map.googleMap,
      //     shouldFocus: false
      //   });
      // });
      // marker.addListener('click', () => {
      //   console.log('s');
      //   this.infoWindowContent = data.info;
      //   this.infoWindowOptions = { maxWidth: 200 }; // Example of setting options for the info window
      //   // this.infoWindowPosition = data.position;
      //   this.infoWindow.open(marker)
      // });

      return marker;
    });

    // Add directions between the first two markers for example
    // if (markersData.length >= 2) {
    //   this.calculateAndDisplayRoute(markersData[0].position, markersData[1].position);
    // }
    if (markersData.length >= 2) {
      const waypoints = markersData.slice(1, -1).map(data => ({ location: data.position }));
      this.calculateAndDisplayRoute(markersData[0].position, markersData[markersData.length - 1].position, waypoints);
    }

    if (this.map && this.map.googleMap) {
      const markerCluster = new MarkerClusterer({
        markers: markerInstances,
        map: this.map.googleMap,
      });
    }
  }

  CustomMarker(latlng: any, map: any, imageSrc: any) {
    this.latlng_ = latlng;
    this.imageSrc = imageSrc;
    // Once the LatLng and text are set, add the overlay to the map.  This will
    // trigger a call to panes_changed which should in turn call draw.
    this.setMap(map);
  }

  // calculateAndDisplayRoute(start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral) {
  //   if (this.directionsService && this.directionsRenderer) {
  //     this.directionsService.route(
  //       {
  //         origin: start,
  //         destination: end,
  //         travelMode: google.maps.TravelMode.DRIVING
  //       },
  //       (response, status) => {
  //         if (status === google.maps.DirectionsStatus.OK) {
  //           this.directionsRenderer!.setDirections(response);
  //         } else {
  //           window.alert('Directions request failed due to ' + status);
  //         }
  //       }
  //     );
  //   } else {
  //     console.error('Directions service or renderer not initialized.');
  //   }
  // }
  calculateAndDisplayRoute(start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral, waypoints: google.maps.DirectionsWaypoint[]) {
    if (this.directionsService && this.directionsRenderer) {
      this.directionsService.route(
        {
          origin: start,
          destination: end,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            debugger
            this.directionsRenderer!.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }
      );
    } else {
      console.error('Directions service or renderer not initialized.');
    }
  }
  // openInfoWindow(marker: google.maps.Marker, content: string) {
  //   debugger
  //   this.infoWindow.close(); // Close any open info windows
  //   this.infoWindow.setContent(content); // Set content of the info window
  //   this.infoWindow.open(marker.getMap(), marker); // Open the info window at the marker position
  // }

  closeInfoWindow() {
    this.infoWindow.close(); // Close info window
    this.infoWindowPosition = null;
  }
  // closeInfoWindow() {
  //   this.infoWindowOptions = {}; // Clear info window options to close it
  // }
  // closeInfoWindow() {
  //   this.infoWindowOptions = {}; // Clear info window options to close it
  //   this.infoWindowContent = ''; // Clear info window content
  //   this.infoWindowPosition = undefined; // Clear info window position
  // }
  // closeInfoWindow() {
  //   this.infoWindowOptions = {};
  //   this.infoWindowContent = '';
  //   // this.infoWindowPosition = undefined;
  // }
  // markerCluster = new MarkerClusterer({ map: this.map, markers: this.markerPositions });

  addMarker(event: google.maps.MapMouseEvent) {
    // if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
  // @ViewChild(MapInfoWindow) infoWindow: QueryList<MapInfoWindow>;
  // @ViewChildren(MapInfoWindow) infoWindow!: QueryList<MapInfoWindow>;
  // openInfoWindow(marker: MapMarker, index: number) {
  //   let curIdx = 0;
  //   this.infoWindow.forEach((window: MapInfoWindow) => {
  //     if (index === curIdx) {
  //       window.open(marker);
  //       curIdx++;
  //     } else {
  //       curIdx++;
  //     }
  //   });
  // if (this.infoWindow != undefined) this.infoWindow.open(marker);
  // }
  //#endregion Angular GOogle map

  // @ViewChild('map') mapElement: any;
  // map!: google.maps.Map;
  // ngOnInit(): void {
  //   const mapProperties = {
  //     center: new google.maps.LatLng(35.2271, -80.8431),
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   this.map = new google.maps.Map(this.mapElement?.nativeElement, mapProperties);
  // }

  //#region Type gmap
  // @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  // map: google.maps.Map;
  // directionsService: google.maps.DirectionsService;
  // directionsRenderer: google.maps.DirectionsRenderer;


  // ngOnInit() {
  //   this.initializeMap();
  // }

  // initializeMap() {
  //   this.directionsService = new google.maps.DirectionsService();
  //   this.directionsRenderer = new google.maps.DirectionsRenderer();

  //   const mapOptions = {
  //     center: new google.maps.LatLng(40.712776, -74.005974), // Example: New York
  //     zoom: 12,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };

  //   this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
  //   this.directionsRenderer.setMap(this.map);
  // }

  // calculateAndDisplayRoute() {
  //   const start = 'New York, NY';
  //   const end = 'Boston, MA';

  //   const request = {
  //     origin: start,
  //     destination: end,
  //     travelMode: google.maps.TravelMode.DRIVING
  //   };

  //   this.directionsService.route(request, (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.zone.run(() => {
  //         this.directionsRenderer.setDirections(result);
  //       });
  //     } else {
  //       console.error('Directions request failed due to ' + status);
  //     }
  //   });
  // }
}

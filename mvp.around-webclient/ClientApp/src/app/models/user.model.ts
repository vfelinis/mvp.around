export interface User {
    groupId: number;
    userName: string;
    lat: number;
    lng: number;
    isGeolocationAvailable: boolean;
    lastUpdate?: Date;
    userIcon: string;
  }
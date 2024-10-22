import { inject, Injectable } from '@angular/core';
import { HousingLocation } from './housing-location.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  httpClient = inject(HttpClient);

  private readonly BASE_URL = 'http://localhost:3000/locations';

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.httpClient.get<HousingLocation[]>(this.BASE_URL);
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.httpClient.get<HousingLocation>(`${this.BASE_URL}/${id}`);
  }

  submitApplication(formData: Record<string, any>): void {
    console.log('form data', formData);
  }
}

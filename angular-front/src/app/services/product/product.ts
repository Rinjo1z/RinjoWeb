import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private apiUrl = `${environment.apiUrl}/products`;
  private refreshProducts$ = new Subject<void>();
  public refresh$ = this.refreshProducts$.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      tap(() => this.refreshProducts$.next())
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshProducts$.next())
    );
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData).pipe(
      tap(() => this.refreshProducts$.next())
    );
  }

}

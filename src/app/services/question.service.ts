import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import * as stringSimilarity from 'string-similarity';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addQuestion(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateQuestion(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  exportToExcel(data: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'questions.xlsx');
  }

  importFromExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/import/excel`, formData);
  }

  uploadExcel(data: any[]): Observable<any> {
    const requests = data.map(item => {
      const newItem = { ...item, id: this.generateRandomId() };
      return this.http.post<any>(this.apiUrl, newItem);
    });
    return forkJoin(requests);
  }

  private generateRandomId(): string {
    return Math.floor(Math.random() * 1000000).toString();
  }



  getThemes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/themes');
  }

  getSubThemes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/subThemes');
  }

  findDuplicates(questions: any[]): any[] {
    const duplicates = [];
    for (let i = 0; i < questions.length; i++) {
      for (let j = i + 1; j < questions.length; j++) {
        const similarity = stringSimilarity.compareTwoStrings(questions[i].question, questions[j].question);
        if (similarity >= 0.8) {
          duplicates.push({ question1: questions[i], question2: questions[j], similarity });
        }
      }
    }
    return duplicates;
  }
}
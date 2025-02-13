import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ Import this
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-searching',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Add RouterModule here
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss'],
  providers: [QuestionService] 
})
export class SearchingComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  searchQuery: string = '';

  private questionService = inject(QuestionService);

  constructor() {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.filteredQuestions = data;
    });
  }

  filterQuestions(): void {
    this.filteredQuestions = this.questions.filter((question) =>
      question.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

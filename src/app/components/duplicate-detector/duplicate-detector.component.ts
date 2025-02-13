import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-duplicate-detector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './duplicate-detector.component.html',
  styleUrls: ['./duplicate-detector.component.css'],
})
export class DuplicateDetectorComponent implements OnInit {
  duplicates: any[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.fetchDuplicates();
  }

  fetchDuplicates() {
    this.questionService.getQuestions().subscribe((questions) => {
      this.duplicates = this.questionService.findDuplicates(questions);
    });
  }
}

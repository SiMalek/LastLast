import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
  @Input() question: any;

  ngOnInit() {
    console.log('Question details:', this.question);
  }
}

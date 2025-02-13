import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- Add this import
import { FlaggedQuestionService } from '../../services/flagged-question.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // <-- Add HttpClientModule here
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  flaggedQuestion: string = '';
  confirmationMessage: string = '';

  constructor(private flaggedQuestionService: FlaggedQuestionService) { }

  flagQuestion() {
    if (this.flaggedQuestion.trim()) {
      this.flaggedQuestionService.addFlaggedQuestion(this.flaggedQuestion).subscribe(() => {
        this.confirmationMessage = 'Your question has been sent to the admin.';
        this.flaggedQuestion = ''; // Clear the input field
      });
    } else {
      this.confirmationMessage = 'Please enter a question before sending.';
    }
  }
}
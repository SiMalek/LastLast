import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { AddEditModalComponent } from '../../add-edit-modal/add-edit-modal.component';
import { UploadModalComponent } from '../upload/upload.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [AddEditModalComponent, UploadModalComponent, CommonModule],
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  qaList: any[] = [];
  isAddEditModalOpen = false;
  isUploadModalOpen = false;
  selectedQA: any = null;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.fetchQAList();
  }

  fetchQAList(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.qaList = data;
    });
  }

  openAddModal(): void {
    this.selectedQA = null;
    this.isAddEditModalOpen = true;
  }

  editQA(qa: any): void {
    this.selectedQA = qa;
    this.isAddEditModalOpen = true;
  }

  deleteQA(id: number): void {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.fetchQAList();
    });
  }

  exportToExcel(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questionService.exportToExcel(data);
    });
  }

  openUploadModal(): void {
    this.isUploadModalOpen = true;
  }

  handleUploadModalClose(): void {
    this.isUploadModalOpen = false;
    this.fetchQAList();
  }

  closeAddEditModal(event: any): void {
    this.isAddEditModalOpen = false;
    if (event.refresh) {
      this.fetchQAList();
    }
  }

  handleModalClose(event: any): void {
    this.isAddEditModalOpen = false;
    if (event.refresh) {
      this.fetchQAList();
    }
  }
}
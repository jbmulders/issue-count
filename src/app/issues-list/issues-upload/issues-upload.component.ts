import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-issues-upload',
  templateUrl: './issues-upload.component.html',
  styleUrls: ['./issues-upload.component.scss'],
})
export class IssuesUploadComponent {
  @Output() fileChange: EventEmitter<{ file: File }> = new EventEmitter();

  fileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    if (file) {
      this.fileChange.emit({ file });
    }
  }
}

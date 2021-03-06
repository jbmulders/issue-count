import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-issues-upload',
  templateUrl: './issues-upload.component.html',
  styleUrls: ['./issues-upload.component.scss'],
})
export class IssuesUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() fileChange: EventEmitter<{ file: File }> = new EventEmitter();

  fileSelected(event: Event | { target: { files: File[] } }) {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];

    if (file) {
      this.fileChange.emit({ file });
      this.fileInput.nativeElement.value = null;
    }
  }
}

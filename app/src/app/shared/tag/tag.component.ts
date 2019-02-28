import { Component, ElementRef, ViewChild, Output,EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tag',
  template: `
    <nz-tag
      *ngFor="let tag of tags; let i = index;"
      [nzMode]="i === 0 ? 'default' : 'closeable'"
      (nzAfterClose)="handleClose(tag)">
      {{ sliceTagName(tag) }}
    </nz-tag>
    <nz-tag
      *ngIf="!inputVisible"
      class="editable-tag"
      (click)="showInput()">
      <i class="anticon anticon-plus"></i> New Tag
    </nz-tag>
    <input
      #inputElement
      nz-input
      nzSize="small"
      *ngIf="inputVisible" type="text"
      [(ngModel)]="inputValue"
      style="width: 78px;"
      (blur)="handleInputConfirm()"
      (keydown.enter)="handleInputConfirm()">
  `,
  styles  : [
      `.editable-tag ::ng-deep .ant-tag {
      background: rgb(255, 255, 255);
      border-style: dashed;
    }`
  ]
})
export class TagComponent {
  @Output() outTags=new EventEmitter()
  tags=[]
  

  constructor(
    private message: NzMessageService

  ){
    
  }
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement') inputElement: ElementRef;

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    if(this.tags.length>=5){
      this.message.warning('最多只能添加五个标签！')
      console.log(this.tags,111)
      return
    }
    else{
      this.inputVisible = true;
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 10);
      console.log(1)
      this.outTags.emit(this.tags)
    }
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags.push(this.inputValue);
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}
import {Injectable, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
  ) {
  }

  //   start of modal related tasks
  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});

  }

  // open modal with larger size
  OpenLargeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      {class: 'modal-lg'});
  }

  // open modal with medium size
  OpenMediumModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      {class: 'modal-md'});
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}

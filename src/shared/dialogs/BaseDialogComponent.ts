import { ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ISiteApiResponse, SiteApiResponseUtilities } from '../services/SiteApiResponse';
import * as dialogutils from './dialogs-utils';
import { NgxNotificationService } from 'ngx-notification';
export class BaseDialogComponent<TModel>  {
  protected ctor;
  protected el: ElementRef;

  public model: TModel;
  public submitted: boolean = false;
  public dialogVisible: boolean = false;
  public disableSubmit: boolean = true;
  public disableUpdateSubmit: boolean = true;
  public showSaveErrored: boolean = false;
  public profileSysId: string = null;
  public ngForm: NgForm = null;
  public errors: string[] = [];


  @ViewChild("focusable",{static:false}) focusable: ElementRef;

  protected get ErrorMessage() {
    return "Please try again, later.";
  }

  protected get SaveMessage() {
    return "Your changes have been saved.";
  }

  constructor(
    ctor,
    el: ElementRef,
    private notificationSvc: NgxNotificationService
  ) {
    if (!ctor) {
      throw Error("The dialog component expects a model ctor function.");
    }

    if (!el) {
      throw Error("The dialog component expects an ElementRef.");
    }

    this.ctor = ctor;
    this.el = el;
    this.model = this.newModel();
  }

  public onSubmit(form: NgForm) {
    this.ngForm = form;
    this.showSaveErrored = false;
    this.submitted = true;

    if (!form.valid || !this.profileSysId) return;

    this.disableSubmit = true;
    const onSend: any = (this as any).onSend;

    if (onSend) {
      onSend.call(this);
    }
    else {
      throw Error("Dialog not setup; provide an onSend method.")
    }
  }

  public onUpdateSubmit(form: NgForm) {
    this.ngForm = form;
    this.showSaveErrored = false;
    this.submitted = true;

    if (!form.valid) return;

    this.disableUpdateSubmit = true;
    const onUpdate: any = (this as any).onUpdate;

    if (onUpdate) {
      onUpdate.call(this);
    }
    else {
      throw Error("Dialog not setup; provide an onSend method.")
    }
  }

  public hideDialog() {
    this.dialogVisible = false;

    var bgElement=document.getElementsByClassName("upperlayer")[0]
        if(bgElement)
        {
          bgElement.classList.remove("active");
        }
  }

  protected newModel(): TModel {
    return new this.ctor();
  }

  protected showDialog() {
    dialogutils.scrollTop(this.el);

    setTimeout(() => {
      if (this.focusable && this.focusable.nativeElement) {
        this.focusable.nativeElement.focus();
      }
    }, 1);

    this.dialogVisible = true;
  }



  protected onLoadError() {
    this.hideDialog();

    if (this.notificationSvc) {
      this.notificationSvc.sendMessage("Please try again, later.", "warning",'bottom-right');
    }
  }

  protected onSaveSuccess(): Promise<void> {
    this.showSaveErrored = false;
    this.hideDialog();

    if (this.notificationSvc) {
      this.notificationSvc.sendMessage(this.SaveMessage, "Success", 'bottom-right');
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1);
    });
  }

  protected onSaveError(e: ISiteApiResponse) {
    if (e) {
      const utils = new SiteApiResponseUtilities();
      this.errors = utils.getErrors(e);
    }

    this.showSaveErrored = true;
  }

  protected openExternalWindow(url) {
    const win: any = window.open();
    win.opener = null;
    win.location = url;
  }
}

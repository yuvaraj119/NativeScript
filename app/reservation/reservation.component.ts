import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { ReservationModalComponent } from '../reservationmodal/reservationmodal.component';


@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html'
})
export class ReservationComponent extends DrawerPage implements OnInit{

    reservation: FormGroup;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private _modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private formBuilder: FormBuilder){
            super(changeDetectorRef);

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        
    }

    onSmokingChecked(args){
        let smokingSwitch = <Switch>args.object;
        if(smokingSwitch.checked){
            this.reservation.patchValue({ smoking: true});
        }else{
            this.reservation.patchValue({ smoking: false});
        }
    }

    onGuestChange(args){
        let textField = <TextField>args.object;
        this.reservation.patchValue({ guests: textField.text });
    }

    onDateTimeChange(args){
        let textField = <TextField>args.object;
        this.reservation.patchValue({ dateTime: textField.text });
    }

    createModalView(args){
        let options : ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen : false
        };

        this._modalService.showModal(ReservationModalComponent,options)
            .then((result: any) => {
                if(args === "guest") {
                    this.reservation.patchValue({guests: result});
                }else if(args === "date-time"){
                    this.reservation.patchValue({ dateTime: result});
                }
            });
    }

    onSubmit(){
        console.log(JSON.stringify(this.reservation.value));
    }

}
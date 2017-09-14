import { Component,OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Leader } from './../shared/leader';
import { DrawerPage } from '../shared/drawer/drawer.page';

import { LeaderService } from './../services/leader.service';

@Component({
    selector: 'app-aboutus',
    moduleId: module.id,
    templateUrl: './aboutus.component.html',
    styleUrls: ['./aboutus.component.css']
})

export class AboutUsComponent extends DrawerPage implements OnInit{

    leaders: Leader[];
    leaderErrMess: string;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private leaderService: LeaderService,
        @Inject('BaseURL') public BaseURL){
            super(changeDetectorRef);
    }

    ngOnInit(){
        this.leaderService.getLeaders()
        .subscribe(leaders => this.leaders = leaders,
            errmess => this.leaderErrMess = <any>errmess);
    }

}
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Dish } from './../shared/dish';
import { Promotion } from './../shared/promotion';
import { Leader } from './../shared/leader';

import { DishService } from './../services/dish.service';
import { PromotionService } from './../services/promotion.service';
import { LeaderService } from './../services/leader.service';

import { DrawerPage } from '../shared/drawer/drawer.page';

@Component({
    selector: 'app-home',
    moduleId: module.id,
    templateUrl: './home.component.html'
})

export class HomeComponent extends DrawerPage implements OnInit{

    dish : Dish;
    promotion: Promotion;
    leader: Leader;
    dishErrMess: string;
    promoErrMess: string;
    leaderErrMess: string;
    
    constructor(private dishService: DishService,
        private promotionService: PromotionService,
        private leaderService: LeaderService,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('BaseURL') public BaseURL){
            super(changeDetectorRef);
    }

    ngOnInit(){
        this.dishService.getFeaturedDish()
            .subscribe(dish => this.dish = dish,
                errmess => this.dishErrMess = <any>errmess);
        
        this.promotionService.getFeaturedPromotion()
            .subscribe(promotion => this.promotion = promotion,
                errmess => this.promoErrMess = <any>errmess);

        this.leaderService.getFeaturedLeader()
            .subscribe(leader => this.leader = leader,
                errmess => this.leaderErrMess = <any>errmess);
    }

}

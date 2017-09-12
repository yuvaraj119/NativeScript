import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from './../shared/dish';
import { Comment } from './../shared/comment'
import { DishService } from './../services/dish.service';
import { ActivatedRoute, Params} from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-dishdetail',
    moduleId: module.id,
    templateUrl: './dishdetail.component.html',
})
export class DishdetailComponent implements OnInit{

    dish: Dish;
    comment: Comment;
    errMess: string;

    constructor(private dishService : DishService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        @Inject('BaseURL') public BaseURL){

    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.dishService.getDish(+params['id']))
            .subscribe(dish => this.dish = dish,
                errmess => {
                    this.dish==null;
                    this.errMess = <any>errmess;
                });
    }

    goBack(): void{
        this.routerExtensions.back();
    }

}
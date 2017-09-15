import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from './../shared/dish';
import { Comment } from './../shared/comment'
import { DishService } from './../services/dish.service';
import { FavoriteService } from './../services/favorite.service';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { ActivatedRoute, Params} from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Toasty } from 'nativescript-toasty';
import { confirm } from 'ui/dialogs';
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
    avgstars: string;
    numcomments: number;
    favorite: boolean=false;

    constructor(private dishService : DishService,
        private favoriteService: FavoriteService,
        private fonticon: TNSFontIconService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        @Inject('BaseURL') public BaseURL){

    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.dishService.getDish(+params['id']))
            .subscribe(dish => {
                    this.dish = dish;
                    this.favorite = this.favoriteService.isFavorite(this.dish.id);
                    this.numcomments = this.dish.comments.length;

                    let total = 0;
                    this.dish.comments.forEach(comment => total += comment.rating);
                    this.avgstars = (total/this.numcomments).toFixed(2);
                },
                errmess => {
                    this.dish==null;
                    this.errMess = <any>errmess;
                });
    }

    addToFavorites(){
        if(!this.favorite){
            let  options = {
                title: "Confirm Delete",
                message: 'Do you want to add Dish '+this.dish.id,
                okButtonText: 'Yes',
                cancelButtonText: 'No',
                neutralbuttonText: 'Cancel'
            };
    
            confirm(options)
                .then((result: boolean) => {
                    if(result){
                        this.favorite=null;
                        this.favorite = this.favoriteService.addFavorite(this.dish.id);
                        const toast = new Toasty('Added dish '+ this.dish.id,'short','bottom');
                        toast.show();
                    }else{
                        console.log('Delete cancelled');
                    }
                });
        }
    }

    goBack(): void{
        this.routerExtensions.back();
    }

}
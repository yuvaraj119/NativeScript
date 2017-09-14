import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from './dish.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class FavoriteService{
    favorites: Array<any>;

    constructor(private dishService: DishService){
        this.favorites = [];
    }

    isFavorite(id: number): boolean{
        return this.favorites.some(el => el === id);
    }

    addFavorite(id: number): boolean{
        if(!this.isFavorite(id)){
            this.favorites.push(id);
        }
        return true;
    }

    getFavorites(): Observable<Dish[]>{
        return this.dishService.getDishes()
            .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
    }

    deleteFavorite(id: number): Observable<Dish[]>{
        let index = this.favorites.indexOf(id);
        if(index>=0){
            this.favorites.splice(index,1);
            return this.getFavorites();
        }else{
            return Observable.throw('Deleting non-existing favorite');
        }
    }

}

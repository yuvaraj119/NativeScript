import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { ListViewEventData, RadListView } from 'nativescript-telerik-ui/listview';
import { RadListViewComponent } from 'nativescript-telerik-ui/listview/angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { confirm } from 'ui/dialogs';
import { Toasty } from 'nativescript-toasty';

@Component({
    selector: 'app-favorites',
    moduleId: module.id,
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent extends DrawerPage implements OnInit{

    favorites: ObservableArray<Dish>;
    errMess: string;

    @ViewChild('myListView') listViewComponent: RadListViewComponent

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private favoritesService : FavoriteService,
        @Inject('BaseURL') public BaseURL){
            super(changeDetectorRef);
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.favoritesService.getFavorites()
            .subscribe(favorites => this.favorites = new ObservableArray(favorites),
                errmess => this.errMess = errmess);
    }

    deleteFavorite(id: number){
        let  options = {
            title: "Confirm Delete",
            message: 'Do you want to delete Dish '+id,
            okButtonText: 'Yes',
            cancelButtonText: 'No',
            neutralbuttonText: 'Cancel'
        };

        confirm(options)
            .then((result: boolean) => {
                if(result){
                    this.favorites=null;
                    this.favoritesService.deleteFavorite(id)
                    .subscribe(favorites => {
                        const toast = new Toasty('Deleted Dish '+id,'short','bottom');
                        toast.show();
                        this.favorites = new ObservableArray(favorites)
                    },
                    errmess => this.errMess = errmess);
                }else{
                    console.log('Delete cancelled');
                }
            });
    }

    public onCellSwiping(args: ListViewEventData){
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        if(args.data.x > 200){
            console.log("Notify perform left action");
        }else if(args.data.x < -200){
            console.log("Notify perform right action");
        }
    }

    public onSwipeCellStarted(args: ListViewEventData){
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args.object;
        
        var leftItem = swipeView.getViewById('mark-view');
        var rightItem = swipeView.getViewById('delete-view');
        //getMeasuredWidth(); is not supported need to be fixed it will get crash when you come in My Favorites screen
        swipeLimits.left = leftItem.nativeView.getMeasuredWidth();
        swipeLimits.right = rightItem.nativeView.getMeasuredWidth();
        swipeLimits.threshold = leftItem.nativeView.getMeasuredWidth()/2;
    }

    public onSwipeCellFinished(args: ListViewEventData){

    }

    public onLeftSwipeClick(args: ListViewEventData){
        console.log('Left swipe click');
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args: ListViewEventData){
        this.deleteFavorite(args.object.bindingContext.id);
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

}
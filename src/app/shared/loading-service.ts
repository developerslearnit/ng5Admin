
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    private _selector: string = 'page-preloader';
    private _element: HTMLElement;

    constructor() {
        this._element = document.getElementById(this._selector);
        //console.log("this._element", this._element);
       
    }

    public show(): void {        
        this._element.setAttribute("style","display:block");
        //this._element.style.display = 'block';
        
    }

    public hide(delay: number = 0): void {
        setTimeout(() => {
            this._element.setAttribute("style","display:none");
            //this._element.style.visibility = "hidden";
            //this._element.style.display = 'none';
            //console.log("Hide",this._element);
           
        }, delay);
    }
}
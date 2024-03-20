//@ts-nocheck
/** 
 * require root.css
 */
export default class Notifier {

    htmlCode: string;
    toCover:boolean = true;
    expiration?:number;
    imageSrc?: string;
    
    constructor() {
        this.htmlCode = "";
        this.toCover = true;
        this.expiration = 18000;
        this.imageSrc = null;
    }

    // Function to remove the container which hide the complet document
    public setCover() {
        var cover = document.getElementById("empty_cover");
        //check if the element to create don't ready exist
        if (cover == null) {
            cover = document.createElement("div");
            cover.setAttribute("id", "empty_cover");
            document.body.appendChild(cover);
        }
        cover.style.display = "block";
        document.getElementsByTagName('html')[0].style.overflowY = "hidden";
        document.getElementsByTagName('body')[0].style.overflowY = "hidden";
    }

    //show the container which hide the complet document
    public unsetCover() {
        document.getElementsByTagName('html')[0].style.overflowY = "visible";
        document.getElementsByTagName('body')[0].style.overflowY = "visible";
        var cover = document.getElementById("empty_cover");
        //check if the element to delete exist
        if (cover != null) {
            cover.style.display = "none";
            cover.remove();
        }
    }

    //create the container for notification
    public createNotifBox() {
        var notifBox = document.getElementById("notif_box");
        //check if the element to create don't ready exist
        if (notifBox == null) {
            notifBox = document.createElement("div");
            notifBox.setAttribute("id", "notif_box");
            document.body.appendChild(notifBox);
        }
    }

    //erase the container for notification
    public deleteNotifBox() {
        var notifBox = document.getElementById("notif_box");
        //check if the element to delete exist
        if (notifBox != null) {
            notifBox.style.display = "none";
            document.getElementById("empty_cover").remove();
        }
    }

    //show a notification box //TODO:remove big comments and handle errors
    public notif(htmlCode: string, toCover:boolean = true, expiration?:number) {
        var exp : number = expiration === undefined ? 1800000 : expiration;
        if (toCover) this.setCover();
        this.createNotifBox();
        var notifBox : HTMLElement = document.getElementById("notif_box");
        notifBox.innerHTML = htmlCode + "<br><button id='btnClose_notif_box'> &times; </button>";
        this.fadeIn(notifBox, "block");
        document.getElementById("btnClose_notif_box").addEventListener("click", ()=>this.removeNotif(toCover));
        setTimeout(()=>this.removeNotif(toCover), exp);
    }

    //remove the notification box //TODO:remove big comments and handle errors
    public removeNotif(cover:boolean){
        this.fadeOut(document.getElementById("notif_box"));
        this.deleteNotifBox();
        if (cover) this.unsetCover();
    }

    //disable click on element
    public enableClick(element: HTMLElement) {
        element.style.pointerEvents = 'auto';
    }

    //enable click on element
    public disableClick(element: HTMLElement) {
        element.style.pointerEvents = 'none';
    }

    // ** Function Fade Out **
    public fadeOut(el) {
        el.style.opacity = 1;
        (function fade() {
            if ((el.style.opacity -= .1) < 0) 
                el.style.display = "none";
            else
                requestAnimationFrame(fade);
        })();
    };

    // ** Function Fade In **
    public fadeIn(el, display:string) {
        el.style.opacity = 0;
        el.style.display = display || "block";
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

}